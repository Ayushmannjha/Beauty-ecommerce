import  { useState } from 'react';
import { Star, Heart, ShoppingBag, Share2, Truck, Shield, RefreshCw, ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { ImageWithFallback } from './figma/ImageWithFallback';


interface ProductDetailPageProps {
  setCurrentPage: (page: string) => void;
}

export default function ProductDetailPage({ setCurrentPage }: ProductDetailPageProps) {
  console.log(setCurrentPage);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState('Rose Pink');

  const product = {
    id: 1,
    name: "Luxury Matte Lipstick Collection",
    brand: "LuxeBeauty",
    price: 45.00,
    originalPrice: 60.00,
    rating: 4.8,
    reviews: 1234,
    badge: "NEW",
    inStock: true,
    stockCount: 23,
    images: [
      "https://images.unsplash.com/photo-1613255348289-1407e4f2f980?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXBzdGljayUyMG1ha2V1cCUyMGJlYXV0eXxlbnwxfHx8fDE3NTc5NDQ0MjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1695972235476-c75a4754dc04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjb3NtZXRpY3MlMjBiZWF1dHklMjBwcm9kdWN0c3xlbnwxfHx8fDE3NTc5NDc1Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1688953228417-8ec4007eb532?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBicmFuZCUyMGNvc21ldGljc3xlbnwxfHx8fDE3NTc5NDc1ODl8MA&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    variants: [
      { name: 'Rose Pink', color: '#E91E63', inStock: true },
      { name: 'Classic Red', color: '#F44336', inStock: true },
      { name: 'Berry Burst', color: '#9C27B0', inStock: true },
      { name: 'Coral Delight', color: '#FF5722', inStock: false }
    ],
    description: "Experience the perfect blend of luxury and performance with our Matte Lipstick Collection. Formulated with nourishing ingredients and intense pigments, this lipstick delivers bold, long-lasting color that won't fade or feather throughout the day.",
    features: [
      "Long-lasting 12-hour wear",
      "Intense color payoff",
      "Comfortable matte finish",
      "Enriched with Vitamin E",
      "Cruelty-free formula"
    ],
    ingredients: "Dimethicone, Cyclopentasiloxane, Trimethylsiloxysilicate, Polyethylene, Isododecane, Ceresin, Kaolin, Disteardimonium Hectorite, Tocopheryl Acetate (Vitamin E)",
    howToUse: "Apply directly to clean, dry lips starting from the center and working outward. For best results, exfoliate lips before application and use a lip liner for precise definition."
  };

  const reviews = [
    {
      id: 1,
      name: "Sarah M.",
      rating: 5,
      date: "2 days ago",
      comment: "Absolutely love this lipstick! The color is gorgeous and it lasts all day without drying out my lips.",
      verified: true
    },
    {
      id: 2,
      name: "Emily R.",
      rating: 5,
      date: "1 week ago",
      comment: "Best matte lipstick I've ever tried. Doesn't crack or flake, and the pigmentation is incredible.",
      verified: true
    },
    {
      id: 3,
      name: "Jessica L.",
      rating: 4,
      date: "2 weeks ago",
      comment: "Great quality and beautiful packaging. The only reason I'm not giving 5 stars is because it's a bit pricey.",
      verified: true
    }
  ];

  const relatedProducts = [
    {
      id: 2,
      name: "Lip Liner Pencil",
      price: 22.00,
      image: "https://images.unsplash.com/photo-1613255348289-1407e4f2f980?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXBzdGljayUyMG1ha2V1cCUyMGJlYXV0eXxlbnwxfHx8fDE3NTc5NDQ0MjB8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 3,
      name: "Lip Exfoliator",
      price: 18.00,
      image: "https://images.unsplash.com/photo-1695972235476-c75a4754dc04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjb3NtZXRpY3MlMjBiZWF1dHklMjBwcm9kdWN0c3xlbnwxfHx8fDE3NTc5NDc1Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      id: 4,
      name: "Lip Gloss",
      price: 28.00,
      image: "https://images.unsplash.com/photo-1688953228417-8ec4007eb532?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBicmFuZCUyMGNvc21ldGljc3xlbnwxfHx8fDE3NTc5NDc1ODl8MA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  const ratingDistribution = [
    { stars: 5, percentage: 78 },
    { stars: 4, percentage: 15 },
    { stars: 3, percentage: 4 },
    { stars: 2, percentage: 2 },
    { stars: 1, percentage: 1 }
  ];

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="min-h-screen bg-[#1a0f1a]">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm mb-8">
          <div className="flex items-center space-x-2 text-white/60">
            <a href="#" className="hover:text-[#FFD369]">Home</a>
            <span>/</span>
            <a href="#" className="hover:text-[#FFD369]">Makeup</a>
            <span>/</span>
            <a href="#" className="hover:text-[#FFD369]">Lipstick</a>
            <span>/</span>
            <span className="text-[#FFD369]">{product.name}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-[#2C1E4A] rounded-lg overflow-hidden">
              <ImageWithFallback
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <Badge className="absolute top-4 left-4 bg-[#FFD369] text-[#1a0f1a] border-none">
                {product.badge}
              </Badge>
              
              {/* Navigation Arrows */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 text-white hover:bg-black/40"
                onClick={prevImage}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 text-white hover:bg-black/40"
                onClick={nextImage}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImageIndex === index ? 'border-[#FFD369]' : 'border-transparent'
                  }`}
                >
                  <ImageWithFallback
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-[#FFD369] text-sm mb-2">{product.brand}</p>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? 'fill-[#FFD369] text-[#FFD369]' : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-white ml-2">{product.rating}</span>
                </div>
                <span className="text-white/60">({product.reviews} reviews)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-[#FFD369]">${product.price.toFixed(2)}</span>
              <span className="text-xl text-white/50 line-through">${product.originalPrice.toFixed(2)}</span>
              <Badge className="bg-[#A30B37] text-white">
                Save ${(product.originalPrice - product.price).toFixed(2)}
              </Badge>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              {product.inStock ? (
                <>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-white">In Stock ({product.stockCount} left)</span>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-white">Out of Stock</span>
                </>
              )}
            </div>

            {/* Color Variants */}
            <div>
              <h3 className="text-white font-semibold mb-3">Color: {selectedVariant}</h3>
              <div className="flex space-x-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant.name}
                    onClick={() => setSelectedVariant(variant.name)}
                    disabled={!variant.inStock}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      selectedVariant === variant.name
                        ? 'border-[#FFD369] scale-110'
                        : 'border-white/30'
                    } ${!variant.inStock ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}`}
                    style={{ backgroundColor: variant.color }}
                    title={variant.name}
                  >
                    {!variant.inStock && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-6 h-0.5 bg-white rotate-45"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <span className="text-white">Quantity:</span>
                  <div className="flex items-center bg-[#2C1E4A] rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-white hover:text-[#FFD369]"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="px-4 py-2 text-white">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                      className="text-white hover:text-[#FFD369]"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Button className="flex-1 bg-[#FFD369] text-[#1a0f1a] hover:bg-[#FFD369]/90 py-3">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="icon" className="border-[#FFD369] text-[#FFD369] hover:bg-[#FFD369] hover:text-[#1a0f1a]">
                  <Heart className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="border-[#FFD369] text-[#FFD369] hover:bg-[#FFD369] hover:text-[#1a0f1a]">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Product Features */}
            <div className="bg-[#2C1E4A] rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-[#FFD369] mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2 text-white">
                    <div className="w-2 h-2 bg-[#FFD369] rounded-full"></div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Shipping Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 text-white">
                <Truck className="w-5 h-5 text-[#FFD369]" />
                <div>
                  <p className="font-semibold">Free Shipping</p>
                  <p className="text-sm text-white/70">On orders over $75</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-white">
                <Shield className="w-5 h-5 text-[#FFD369]" />
                <div>
                  <p className="font-semibold">Secure Payment</p>
                  <p className="text-sm text-white/70">SSL encrypted</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 text-white">
                <RefreshCw className="w-5 h-5 text-[#FFD369]" />
                <div>
                  <p className="font-semibold">Easy Returns</p>
                  <p className="text-sm text-white/70">30-day policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Card className="bg-[#2C1E4A] border-[#FFD369]/20 mb-16">
          <CardContent className="p-6">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-[#4B1C3F]">
                <TabsTrigger value="description" className="data-[state=active]:bg-[#FFD369] data-[state=active]:text-[#1a0f1a]">
                  Description
                </TabsTrigger>
                <TabsTrigger value="ingredients" className="data-[state=active]:bg-[#FFD369] data-[state=active]:text-[#1a0f1a]">
                  Ingredients
                </TabsTrigger>
                <TabsTrigger value="how-to-use" className="data-[state=active]:bg-[#FFD369] data-[state=active]:text-[#1a0f1a]">
                  How to Use
                </TabsTrigger>
                <TabsTrigger value="reviews" className="data-[state=active]:bg-[#FFD369] data-[state=active]:text-[#1a0f1a]">
                  Reviews
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-6">
                <div className="prose prose-invert max-w-none">
                  <p className="text-white/90 leading-relaxed">{product.description}</p>
                </div>
              </TabsContent>
              
              <TabsContent value="ingredients" className="mt-6">
                <div className="prose prose-invert max-w-none">
                  <p className="text-white/90 leading-relaxed">{product.ingredients}</p>
                </div>
              </TabsContent>
              
              <TabsContent value="how-to-use" className="mt-6">
                <div className="prose prose-invert max-w-none">
                  <p className="text-white/90 leading-relaxed">{product.howToUse}</p>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <div className="space-y-8">
                  {/* Rating Summary */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-2xl font-bold text-[#FFD369] mb-4">Customer Reviews</h3>
                      <div className="flex items-center space-x-4 mb-6">
                        <span className="text-4xl font-bold text-white">{product.rating}</span>
                        <div>
                          <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-5 h-5 ${
                                  i < Math.floor(product.rating) ? 'fill-[#FFD369] text-[#FFD369]' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-white/70">Based on {product.reviews} reviews</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-white mb-4">Rating Breakdown</h4>
                      <div className="space-y-2">
                        {ratingDistribution.map((item) => (
                          <div key={item.stars} className="flex items-center space-x-3">
                            <span className="text-sm text-white w-6">{item.stars}★</span>
                            <Progress value={item.percentage} className="flex-1" />
                            <span className="text-sm text-white/70 w-10">{item.percentage}%</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Individual Reviews */}
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-white/10 pb-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="flex items-center space-x-3">
                              <h4 className="font-semibold text-white">{review.name}</h4>
                              {review.verified && (
                                <Badge className="bg-green-600 text-white text-xs">Verified Purchase</Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating ? 'fill-[#FFD369] text-[#FFD369]' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-white/70">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-white/90">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Related Products */}
        <div>
          <h2 className="text-3xl font-bold text-[#FFD369] mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Card key={relatedProduct.id} className="bg-[#4B1C3F] border-[#FFD369]/20 hover:border-[#FFD369] transition-all duration-300 group">
                <CardContent className="p-0">
                  <ImageWithFallback
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-white mb-2">{relatedProduct.name}</h3>
                    <p className="text-xl font-bold text-[#FFD369]">${relatedProduct.price.toFixed(2)}</p>
                    <Button className="w-full mt-3 bg-[#FFD369] text-[#1a0f1a] hover:bg-[#FFD369]/90">
                      Quick Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}