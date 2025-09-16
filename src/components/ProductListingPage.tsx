import { useState } from "react";
import { Filter, Grid, List, Star, Heart, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Checkbox } from "./ui/checkbox";
import { Slider } from "./ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviews: number;
  badge?: string;
  category: string;
  inStock: boolean;
}

interface ProductListingPageProps {
  setCurrentPage: (page: string) => void;
}

interface ProductCardListViewProps {
  product: Product;
  onClick?: (id: number) => void;
  onAddToCart?: (id: number) => void;
  onAddToWishlist?: (id: number) => void;
}

const ProductCardListView: React.FC<ProductCardListViewProps> = ({
  product,
  onClick,
  onAddToCart,
  onAddToWishlist,
}) => (
  <Card className="bg-[#4B1C3F] border-[#FFD369]/20 hover:border-[#FFD369] transition-all duration-300 group flex">
    <CardContent className="p-0 flex w-full">
      <div
        className="relative overflow-hidden w-48 flex-shrink-0"
        onClick={() => onClick?.(product.id)}
      >
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300 cursor-pointer"
        />
        <Badge className="absolute top-3 left-3 bg-[#FFD369] text-[#1a0f1a] border-none">
          {product.badge}
        </Badge>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-black/20 text-white hover:bg-[#FFD369] hover:text-[#1a0f1a]"
          onClick={(e) => {
            e.stopPropagation();
            onAddToWishlist?.(product.id);
          }}
        >
          <Heart className="w-4 h-4" />
        </Button>
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-4 space-y-3 flex-1">
        <div>
          <p className="text-sm text-[#FFD369] mb-1">{product.brand}</p>
          <h3
            className="font-semibold text-white text-base cursor-pointer"
            onClick={() => onClick?.(product.id)}
          >
            {product.name}
          </h3>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? "fill-[#FFD369] text-[#FFD369]"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-white/70">({product.reviews})</span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-[#FFD369]">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-white/50 line-through">
            ${product.originalPrice.toFixed(2)}
          </span>
        </div>

        <Button
          className="bg-[#FFD369] text-[#1a0f1a] hover:bg-[#FFD369]/90 w-auto"
          disabled={!product.inStock}
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart?.(product.id);
          }}
        >
          <ShoppingBag className="w-4 h-4 mr-2" />
          {product.inStock ? "Add to Cart" : "Notify Me"}
        </Button>
      </div>
    </CardContent>
  </Card>
);

export default function ProductListingPage({
  setCurrentPage,
}: ProductListingPageProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  const products: Product[] = [
    {
      id: 1,
      name: "Luxury Matte Lipstick",
      brand: "LuxeBeauty",
      price: 45.0,
      originalPrice: 60.0,
      image:
        "https://images.unsplash.com/photo-1613255348289-1407e4f2f980?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      rating: 4.8,
      reviews: 1234,
      badge: "NEW",
      category: "Makeup",
      inStock: true,
    },
    {
      id: 2,
      name: "Professional Eye Palette",
      brand: "ColorPro",
      price: 89.0,
      originalPrice: 120.0,
      image:
        "https://images.unsplash.com/photo-1594903696739-2551e8c2d0f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      rating: 4.9,
      reviews: 892,
      badge: "BESTSELLER",
      category: "Makeup",
      inStock: true,
    },
    {
      id: 3,
      name: "Hydrating Face Serum",
      brand: "SkinLux",
      price: 125.0,
      originalPrice: 150.0,
      image:
        "https://images.unsplash.com/photo-1665763630810-e6251bdd392d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      rating: 4.7,
      reviews: 567,
      badge: "LIMITED",
      category: "Skincare",
      inStock: true,
    },
    {
      id: 4,
      name: "Signature Perfume",
      brand: "Elegance",
      price: 95.0,
      originalPrice: 130.0,
      image:
        "https://images.unsplash.com/photo-1757313202626-8b763ce254a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      rating: 4.6,
      reviews: 789,
      badge: "TRENDING",
      category: "Fragrance",
      inStock: false,
    },
    {
      id: 5,
      name: "Premium Foundation",
      brand: "FlawlessBase",
      price: 65.0,
      originalPrice: 85.0,
      image:
        "https://images.unsplash.com/photo-1695972235476-c75a4754dc04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      rating: 4.5,
      reviews: 1045,
      badge: "SALE",
      category: "Makeup",
      inStock: true,
    },
    {
      id: 6,
      name: "Anti-Aging Cream",
      brand: "YouthRevive",
      price: 180.0,
      originalPrice: 220.0,
      image:
        "https://images.unsplash.com/photo-1688953228417-8ec4007eb532?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      rating: 4.9,
      reviews: 456,
      badge: "PREMIUM",
      category: "Skincare",
      inStock: true,
    },
  ];

  const categories = [
    { name: "Makeup", count: 245 },
    { name: "Skincare", count: 189 },
    { name: "Fragrance", count: 87 },
    { name: "Hair Care", count: 134 },
    { name: "Bath & Body", count: 92 },
  ];

  const brands = [
    { name: "LuxeBeauty", count: 45 },
    { name: "ColorPro", count: 32 },
    { name: "SkinLux", count: 28 },
    { name: "Elegance", count: 41 },
    { name: "FlawlessBase", count: 19 },
  ];

  return (
    <div className="min-h-screen bg-[#1a0f1a]">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#FFD369] mb-4">
            Beauty Products
          </h1>
          <p className="text-white/80">
            Discover our complete collection of luxury beauty products
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-1/4 ${showFilters ? "block" : "hidden lg:block"}`}>
            <div className="bg-[#2C1E4A] rounded-lg p-6 space-y-8">
              <h3 className="text-xl font-semibold text-[#FFD369] mb-4">
                Filters
              </h3>

              {/* Categories */}
              <div>
                <h4 className="font-semibold text-white mb-3">Categories</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div
                      key={category.name}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <Checkbox id={category.name} />
                        <label
                          htmlFor={category.name}
                          className="text-white/80 cursor-pointer"
                        >
                          {category.name}
                        </label>
                      </div>
                      <span className="text-xs text-white/60">
                        ({category.count})
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-semibold text-white mb-3">Price Range</h4>
                <div className="px-2">
                  <Slider
                    value={priceRange}
                    onValueChange={(value: number[]) => setPriceRange([value[0], value[1]] as [number, number])}
                    max={500}
                    step={5}
                    className="mb-4"
                  />
                  <div className="flex justify-between text-sm text-white/80">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Brands */}
              <div>
                <h4 className="font-semibold text-white mb-3">Brands</h4>
                <div className="space-y-2">
                  {brands.map((brand) => (
                    <div
                      key={brand.name}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <Checkbox id={brand.name} />
                        <label
                          htmlFor={brand.name}
                          className="text-white/80 cursor-pointer"
                        >
                          {brand.name}
                        </label>
                      </div>
                      <span className="text-xs text-white/60">
                        ({brand.count})
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <h4 className="font-semibold text-white mb-3">Rating</h4>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center space-x-2">
                      <Checkbox id={`rating-${rating}`} />
                      <label
                        htmlFor={`rating-${rating}`}
                        className="flex items-center space-x-1 text-white/80 cursor-pointer"
                      >
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < rating
                                  ? "fill-[#FFD369] text-[#FFD369]"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span>& up</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <h4 className="font-semibold text-white mb-3">Availability</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="in-stock" />
                    <label
                      htmlFor="in-stock"
                      className="text-white/80 cursor-pointer"
                    >
                      In Stock
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="out-of-stock" />
                    <label
                      htmlFor="out-of-stock"
                      className="text-white/80 cursor-pointer"
                    >
                      Out of Stock
                    </label>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-[#FFD369] text-[#1a0f1a] hover:bg-[#FFD369]/90">
                Apply Filters
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  className="lg:hidden border-[#FFD369] text-[#FFD369] hover:bg-[#FFD369] hover:text-[#1a0f1a]"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <p className="text-white/80">
                  Showing {products.length} products
                </p>
              </div>

              <div className="flex items-center space-x-4">
                {/* Sort By */}
                <Select>
                  <SelectTrigger className="w-40 bg-[#2C1E4A] border-[#FFD369]/30 text-white">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Toggle */}
                <div className="flex items-center space-x-1 bg-[#2C1E4A] rounded-lg p-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={
                      viewMode === "grid"
                        ? "bg-[#FFD369] text-[#1a0f1a]"
                        : "text-white hover:text-[#FFD369]"
                    }
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={
                      viewMode === "list"
                        ? "bg-[#FFD369] text-[#1a0f1a]"
                        : "text-white hover:text-[#FFD369]"
                    }
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            <div
              className={`${
                viewMode === "grid"
                  ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-items-center"
                  : "space-y-6"
              }`}
            >
              {products.map((product) =>
                viewMode === "grid" ? (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => setCurrentPage("product-detail")}
                    onAddToCart={(id: number) => {
                      console.log("Add to cart:", id);
                    }}
                    onAddToWishlist={(id: number) => {
                      console.log("Add to wishlist:", id);
                    }}
                  />
                ) : (
                  <ProductCardListView
                    key={product.id}
                    product={product}
                    onClick={() => setCurrentPage("product-detail")}
                    onAddToCart={(id: number) => {
                      console.log("Add to cart:", id);
                    }}
                    onAddToWishlist={(id: number) => {
                      console.log("Add to wishlist:", id);
                    }}
                  />
                )
              )}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  className="border-[#FFD369] text-[#FFD369] hover:bg-[#FFD369] hover:text-[#1a0f1a]"
                >
                  Previous
                </Button>
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((page) => (
                    <Button
                      key={page}
                      variant="outline"
                      className={`${
                        page === 1
                          ? "bg-[#FFD369] text-[#1a0f1a]"
                          : "border-[#FFD369] text-[#FFD369] hover:bg-[#FFD369] hover:text-[#1a0f1a]"
                      }`}
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="border-[#FFD369] text-[#FFD369] hover:bg-[#FFD369] hover:text-[#1a0f1a]"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
