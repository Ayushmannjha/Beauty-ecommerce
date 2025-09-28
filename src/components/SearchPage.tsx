import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import ProductCard, { type Product } from "./ProductCard";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import { Star } from "lucide-react";
import { useCart } from '../contexts/CartContext';


import { HomePageApi } from "../components/services/homepage";

interface SearchPageProps {
  selectedPrice?: number;
  searchQuery?: string;
  category?: string;
  brand?: string;
  name?: string;
  setCurrentPage: (
    page: string,
    options?: { category?: string; price?: number; brand?: string }
  ) => void;
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
  searchQuery = "",
  category,
  selectedPrice,
  brand,
  name,
  setCurrentPage,

}: SearchPageProps) {
  const [currentSearchQuery] = useState(searchQuery);
  const [products, setProducts] = useState<Product[]>([]);
  const [sortBy] = useState("relevance");
  const [filters, setFilters] = useState<FilterState>({
    categories: category ? [category] : [],
    brands: brand ? [brand] : [],
    priceRange: [0, 200],
    rating: 0,
    inStock: false,
  });
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { addToCart } = useCart();

  // Sync category prop
  useEffect(() => {
    if (category) setFilters((prev) => ({ ...prev, categories: [category] }));
  }, [category]);

  // Sync brand prop
  useEffect(() => {
    if (brand) setFilters((prev) => ({ ...prev, brands: [brand] }));
  }, [brand]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let results: Product[] = [];

        if (name?.trim()) {
          const res = await HomePageApi.searchProductsByName(name);
          results = res.data;
        } else if (currentSearchQuery?.trim()) {
          const res = await HomePageApi.searchProductsByName(currentSearchQuery);
          results = res.data;
        } else if (selectedPrice) {
          const res = await HomePageApi.searchByPrice(selectedPrice);
          results = res.data;
        } else if (filters.categories.length > 0) {
          const res = await HomePageApi.getProductsByCategory(filters.categories[0]);
          results = res.data;
        } else if (filters.brands.length > 0) {
          const res = await HomePageApi.searchByBrand(filters.brands[0]);
          results = res.data;
        } else if (filters.priceRange[1] < 200) {
          const res = await HomePageApi.searchByPrice(filters.priceRange[1]);
          results = res.data;
        } else {
          const res = await HomePageApi.getAllProducts();
          results = res.data;
        }

        // Apply sorting
        switch (sortBy) {
          case "price-low":
            results.sort((a, b) => a.price - b.price);
            break;
          case "price-high":
            results.sort((a, b) => b.price - a.price);
            break;
          case "rating":
            results.sort((a, b) => b.rating - a.rating);
            break;
          case "name":
            results.sort((a, b) => a.name.localeCompare(b.name));
            break;
          
          
        }
        console.log(results)
        setProducts(results);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [name, currentSearchQuery, filters, sortBy, selectedPrice]);

  // Safe add to cart function to prevent duplicates
const { items: cartItems } = useCart();


const handleAddToCart = (product: Product) => {
  const inCart = cartItems.some(item => item.productId === product.productId);

  if (inCart) {
    // Navigate to cart page
    setCurrentPage("cart"); // or use navigate("/cart") if using react-router
  } else {
    addToCart(product); // add to context
    console.log("Added to cart:", product);
  }
};

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

  const activeFiltersCount =
    filters.categories.length +
    filters.brands.length +
    (filters.rating > 0 ? 1 : 0) +
    (filters.inStock ? 1 : 0) +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 200 ? 1 : 0);

  const categoryOptions = ["Lipsticks", "Eye Palettes", "Serums", "Fragrances", "Foundations", "Glosses"];
  const brandOptions = ["LuxeBeauty", "ColorPro", "SkinLux", "Elegance", "FlawlessBase", "GlossyBeauty"];

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
            <label htmlFor={`category-${cat}`} className="text-sm cursor-pointer">{cat}</label>
          </div>
        ))}
      </div>

      <Separator />

      {/* Brands */}
      <div className="space-y-2">
        <h4 className="font-medium">Brands</h4>
        {brandOptions.map((brand) => (
          <div key={brand} className="flex items-center space-x-2">
            <Checkbox
              id={`brand-${brand}`}
              checked={filters.brands.includes(brand)}
              onCheckedChange={() => toggleBrandFilter(brand)}
            />
            <label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer">{brand}</label>
          </div>
        ))}
      </div>

      <Separator />

      {/* Price */}
      <div className="space-y-2">
        <h4 className="font-medium">Price Range</h4>
        <Slider
          value={filters.priceRange}
          onValueChange={(value) => handleFilterChange("priceRange", value as [number, number])}
          max={200}
          min={0}
          step={5}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>₹{filters.priceRange[0]}</span>
          <span>₹{filters.priceRange[1]}+</span>
        </div>
      </div>

      <Separator />

      {/* Rating */}
      <div className="space-y-2">
        <h4 className="font-medium">Minimum Rating</h4>
        {[4, 3, 2, 1].map((rating) => (
          <div key={rating} className="flex items-center space-x-2">
            <Checkbox
              id={`rating-${rating}`}
              checked={filters.rating === rating}
              onCheckedChange={() =>
                handleFilterChange("rating", filters.rating === rating ? 0 : rating)
              }
            />
            <label htmlFor={`rating-${rating}`} className="flex items-center text-sm cursor-pointer">
              {Array.from({ length: rating }, (_, i) => (
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
          onCheckedChange={(checked) => handleFilterChange("inStock", checked)}
        />
        <label htmlFor="in-stock" className="text-sm cursor-pointer">In Stock Only</label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-8">
        {/* Small screen dropdown */}
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
          {products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-6 justify-items-center">
              {products.map(product => {
  const inCart = cartItems.some(item => item.productId === product.productId);

  return (
    <ProductCard
      key={product.productId}
      product={product}
      onAddToCart={() => handleAddToCart(product)}
      buttonText={inCart ? "Go to Cart" : "Add to Cart"} // dynamic text
    />
  );
})}

            </div>
          ) : (
            <p className="text-center text-muted-foreground">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
