import React from "react";
import { motion } from "motion/react";
import { Star, Heart, ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner";

export interface Product {
  productId: string;
  name: string;
  brand?: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;      // REQUIRED
  reviews: number;     // REQUIRED
  badge?: string;
  inStock?: boolean;
  available?: boolean;
}

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
  onClick?: (product: Product) => void;
  buttonText?: string; // ✅ optional dynamic button text
}

export default function ProductCard({
  product,
  onAddToCart,
  onAddToWishlist,
  onClick,
  buttonText
}: ProductCardProps) {
  const cardBackgrounds = [
    "bg-[#4B1C3F]", "bg-[#A30B37]", "bg-[#2C1E4A]", "bg-[#1C3A2E]", "bg-[#B85C38]"
  ];

  // simple stable hash to pick background
  const randomBg = cardBackgrounds[
    parseInt(product.productId.replace(/\D/g, ""), 10) % cardBackgrounds.length
  ];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product) return;
    onAddToCart?.(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product) return;
    onAddToWishlist?.(product);
    toast.success(`${product.name} added to wishlist!`);
  };

  return (
    <motion.div
      className={`${randomBg} rounded-xl shadow-lg hover:shadow-2xl hover:shadow-[#FFD369]/20 transition-all duration-300 cursor-pointer group overflow-hidden max-w-[180px] w-full`}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden" onClick={() => onClick?.(product)}>
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Badge */}
        {product.badge && (
          <Badge className="absolute top-2 left-2 bg-[#FFD369] text-[#1a0f1a] border-none text-xs px-2 py-1">
            {product.badge}
          </Badge>
        )}

        {/* Wishlist Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
          className="absolute top-2 right-2"
        >
          <Button
            variant="ghost"
            size="icon"
            className="bg-black/20 text-white hover:bg-[#FFD369] hover:text-[#1a0f1a] w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-200"
            onClick={handleAddToWishlist}
          >
            <Heart className="w-4 h-4" />
          </Button>
        </motion.div>

        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white text-xs font-semibold">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3 space-y-2">
        {product.brand && <p className="text-[#FFD369] text-xs font-medium truncate">{product.brand}</p>}
        <h3 className="text-white font-bold text-sm leading-tight truncate" onClick={() => onClick?.(product)}>
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center space-x-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-[#FFD369] text-[#FFD369]' : 'text-gray-400'}`}
              />
            ))}
          </div>
          <span className="text-white/70 text-xs">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-1">
          <span className="text-[#FFD369] font-bold text-sm">${product.price.toFixed(2)}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-white/50 line-through text-xs">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        {/* Add to Cart / Go to Cart Button */}
        <Button
          className="w-full bg-[#FFD369] text-[#1a0f1a] hover:bg-[#FFD369]/90 py-2 text-xs font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-[#FFD369]/30"
          disabled={product.inStock === false}
          onClick={handleAddToCart}
        >
          {product.inStock === false
            ? 'Notify Me'
            : <>
                <ShoppingBag className="w-3 h-3 mr-1" />
                {buttonText || 'Add to Cart'}
              </>}
        </Button>
      </div>
    </motion.div>
  );
}
