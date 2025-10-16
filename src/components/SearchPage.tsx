import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import ProductCard, { type Product } from "./ProductCard";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import { Star } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { HomePageApi } from "../components/services/homepage";

interface SearchPageProps {
  setCurrentPage: (page: string, options?: any) => void;
  setSelectedProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
}

interface FilterState {
  categories: string[];
  brands: string[];
  priceRange: [number, number];
  rating: number;
  inStock: boolean;
}

export default function SearchPage({
  setCurrentPage,
  setSelectedProduct,
  onAddToCart,
}: SearchPageProps) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  // query params (these trigger the initial fetch)
  const qName = params.get("name") || "";
  const qCategory = params.get("category") || "";
  const qBrand = params.get("brand") || "";
  const qPrice = params.get("price") ? Number(params.get("price")) : undefined;

  // allProducts: results returned from API (based on name/category/brand/price)
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  // products: result after applying client-side filters (rating, inStock, price range, categories/brands)
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { addToCart, items: cartItems } = useCart();

  const categoryOptions = [
    "Lipsticks",
    "Eye Palettes",
    "Serums",
    "Fragrances",
    "Foundations",
    "Glosses",
  ];
  const brandOptions = [
    "LuxeBeauty",
    "ColorPro",
    "SkinLux",
    "Elegance",
    "FlawlessBase",
    "GlossyBeauty",
  ];

  const [filters, setFilters] = useState<FilterState>({
    categories: qCategory ? [qCategory] : [],
    brands: qBrand ? [qBrand] : [],
    priceRange: [0, qPrice ?? 200],
    rating: 0,
    inStock: false,
  });

  // keep filters in sync when qCategory/qBrand/qPrice change (URL driven)
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      categories: qCategory ? [qCategory] : prev.categories,
      brands: qBrand ? [qBrand] : prev.brands,
      priceRange: [0, qPrice ?? prev.priceRange[1]],
    }));
  }, [qCategory, qBrand, qPrice]);

  // Active filters count (used for Clear All)
  const activeFiltersCount =
    filters.categories.length +
    filters.brands.length +
    (filters.rating > 0 ? 1 : 0) +
    (filters.inStock ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 200 ? 1 : 0);

  // INITIAL FETCH:
  // Only fetch when at least one initial criteria is present:
  // (name OR category OR brand OR price)
  useEffect(() => {
    const fetchProducts = async () => {
      // If no search/filter criteria from URL, don't fetch all products — show no products.
      if (!qName && !qCategory && !qBrand && qPrice === undefined) {
        setAllProducts([]);
        setProducts([]);
        return;
      }

      setLoading(true);
      try {
        let results: Product[] = [];

        if (qName.trim()) {
          const res = await HomePageApi.searchProductsByName(qName.trim());
          results = res.data;
        } else if (qCategory) {
          const res = await HomePageApi.getProductsByCategory(qCategory);
          results = res.data;
        } else if (qBrand) {
          const res = await HomePageApi.searchByBrand(qBrand);
          results = res.data;
        } else if (qPrice !== undefined) {
          const res = await HomePageApi.searchByPrice(qPrice);
          results = res.data;
        }

        // Save the raw results and initialize filtered view to the same set
        setAllProducts(results || []);
        setProducts(results || []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setAllProducts([]);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qName, qCategory, qBrand, qPrice]);

  // CLIENT-SIDE FILTERING:
  // Whenever the user toggles filters (rating, inStock, priceRange, categories, brands),
  // we filter the previously fetched allProducts locally.
  useEffect(() => {
    // Start from allProducts and apply local filters
    let filtered = [...allProducts];

    // categories (if any selected)
    if (filters.categories.length > 0) {
      filtered = filtered.filter((p) => filters.categories.includes(p.category || "" ));
    }

    // brands (if any selected)
    if (filters.brands.length > 0) {
      filtered = filtered.filter((p) => filters.brands.includes(p.brand || "" ));
    }

    // price range
    const [minPrice, maxPrice] = filters.priceRange;
    if (minPrice > 0 || maxPrice < 200) {
      filtered = filtered.filter((p) => p.price >= minPrice && p.price <= maxPrice);
    }

    // rating
    if (filters.rating > 0) {
      filtered = filtered.filter((p) => p.rating >= filters.rating);
    }

    // inStock
    if (filters.inStock) {
      filtered = filtered.filter((p) => !!p.stock);
    }

    setProducts(filtered);
  }, [filters, allProducts]);

  // Helpers to update filters
  const handleFilterChange = (filterType: keyof FilterState, value: any) =>
    setFilters((prev) => ({ ...prev, [filterType]: value }));

  const toggleCategoryFilter = (category: string) =>
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));

  const toggleBrandFilter = (brand: string) =>
    setFilters((prev) => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter((b) => b !== brand)
        : [...prev.brands, brand],
    }));

  const clearAllFilters = () =>
    setFilters({ categories: [], brands: [], priceRange: [0, 200], rating: 0, inStock: false });

  // Add to cart (prevent adding if out of stock)
  const handleAddToCart = (product: Product) => {
    const isOutOfStock = !product.stock;
    if (isOutOfStock) return; // lock out
    const inCart = cartItems.some((i) => i.productId === product.productId);

    if (inCart) {
      // navigate to cart via provided API
      setCurrentPage("cart");
    } else {
      // add both to context and parent callback
      addToCart(product);
      if (onAddToCart) onAddToCart(product, 1);
    }
  };

  // Click product -> set selected product (parent), then navigate to detail
  const handleSelectProduct = (product: Product) => {
    if (setSelectedProduct) setSelectedProduct(product);
    setCurrentPage("product-detail");
  };

  // UI: filter sidebar
  const FilterSidebar = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Filters</h3>
        {activeFiltersCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            Clear All ({activeFiltersCount})
          </Button>
        )}
      </div>

      {/* Categories */}
      <div className="space-y-2">
        <h4 className="font-medium">Categories</h4>
        {categoryOptions.map((cat) => (
          <div key={cat} className="flex items-center space-x-2">
            <Checkbox
              id={`category-${cat}`}
              checked={filters.categories.includes(cat)}
              onCheckedChange={() => toggleCategoryFilter(cat)}
            />
            <label htmlFor={`category-${cat}`} className="text-sm cursor-pointer">
              {cat}
            </label>
          </div>
        ))}
      </div>

      <Separator />

      {/* Brands */}
      <div className="space-y-2">
        <h4 className="font-medium">Brands</h4>
        {brandOptions.map((b) => (
          <div key={b} className="flex items-center space-x-2">
            <Checkbox
              id={`brand-${b}`}
              checked={filters.brands.includes(b)}
              onCheckedChange={() => toggleBrandFilter(b)}
            />
            <label htmlFor={`brand-${b}`} className="text-sm cursor-pointer">
              {b}
            </label>
          </div>
        ))}
      </div>

      <Separator />

      {/* Price */}
      <div className="space-y-2">
        <h4 className="font-medium">Price Range</h4>
        <Slider
          value={filters.priceRange}
          onValueChange={(v) => handleFilterChange("priceRange", v as [number, number])}
          min={0}
          max={200}
          step={5}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>₹{filters.priceRange[0]}</span>
          <span>₹{filters.priceRange[1]}</span>
        </div>
      </div>

      <Separator />

      {/* Rating */}
      <div className="space-y-2">
        <h4 className="font-medium">Minimum Rating</h4>
        {[4, 3, 2, 1].map((r) => (
          <div key={r} className="flex items-center space-x-2">
            <Checkbox
              id={`rating-${r}`}
              checked={filters.rating === r}
              onCheckedChange={() => handleFilterChange("rating", filters.rating === r ? 0 : r)}
            />
            <label htmlFor={`rating-${r}`} className="flex items-center text-sm cursor-pointer">
              {Array.from({ length: r }, (_, i) => (
                <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-1">& Up</span>
            </label>
          </div>
        ))}
      </div>

      <Separator />

      {/* In Stock */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="in-stock"
          checked={filters.inStock}
          onCheckedChange={(c) => handleFilterChange("inStock", c)}
        />
        <label htmlFor="in-stock" className="text-sm cursor-pointer">
          In Stock Only
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Mobile filter dropdown */}
        <div className="lg:hidden mb-4">
          <Button onClick={() => setDropdownOpen(!dropdownOpen)} className="w-full justify-between">
            Filters {dropdownOpen ? "▲" : "▼"}
          </Button>
          {dropdownOpen && (
            <div className="mt-2 p-4 border rounded-lg bg-[#1a0f1a] shadow-md">
              <FilterSidebar />
            </div>
          )}
        </div>

        {/* Desktop sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0 sticky top-24">
          <FilterSidebar />
        </div>

        {/* Products */}
        <div className="flex-1">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-lg">Loading...</div>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-6 justify-items-center">
              {products.map((product) => {
                const inCart = cartItems.some((i) => i.productId === product.productId);
                const isOutOfStock = !product.stock;

                // button text logic
                const buttonText = isOutOfStock ? "Out of Stock" : inCart ? "Go to Cart" : "Add to Cart";

                return (
                  <div key={product.productId} className="w-full">
                    <div
                      onClick={() => handleSelectProduct(product)}
                      className="cursor-pointer"
                      role="button"
                      tabIndex={0}
                    >
                      <ProductCard
                        product={product}
                        onAddToCart={() => {
                          // prevent adding out of stock
                          if (isOutOfStock) return;
                          handleAddToCart(product);
                        }}
                        buttonText={buttonText}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-center text-lg">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
