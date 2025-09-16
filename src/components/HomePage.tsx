import  { useState, useEffect, useRef } from 'react';
import { motion,  useInView, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Star, ArrowRight, Heart, Sparkles, Zap, Crown, Gift, TrendingUp, Palette, Truck } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import ProductCard from './ProductCard';

interface HomePageProps {
  setCurrentPage: (page: string) => void;
}

export default function HomePage({ setCurrentPage }: HomePageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  //const heroRef = useRef<HTMLDivElement>(null);

  const heroSlides = [
    {
      id: 1,
      title: "New Luxury Collection",
      subtitle: "Discover Premium Beauty",
      description: "Elevate your beauty routine with our curated selection of luxury cosmetics",
      image: "https://images.unsplash.com/photo-1695972235476-c75a4754dc04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjb3NtZXRpY3MlMjBiZWF1dHklMjBwcm9kdWN0c3xlbnwxfHx8fDE3NTc5NDc1Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      bgColor: "from-[#4B1C3F] via-[#2C1E4A] to-[#1a0f1a]"
    },
    {
      id: 2,
      title: "Exclusive Fragrance Line",
      subtitle: "Signature Scents",
      description: "Indulge in our exclusive collection of luxury perfumes and fragrances",
      image: "https://images.unsplash.com/photo-1757313202626-8b763ce254a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwZnJhZ3JhbmNlJTIwbHV4dXJ5fGVufDF8fHx8MTc1Nzk0NzU4Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      bgColor: "from-[#A30B37] via-[#4B1C3F] to-[#2C1E4A]"
    },
    {
      id: 3,
      title: "Professional Skincare",
      subtitle: "Science Meets Beauty",
      description: "Transform your skin with our advanced skincare formulations",
      image: "https://images.unsplash.com/photo-1665763630810-e6251bdd392d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHNlcnVtJTIwYm90dGxlc3xlbnwxfHx8fDE3NTc5NDc1ODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      bgColor: "from-[#1C3A2E] via-[#2C1E4A] to-[#4B1C3F]"
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: "Luxury Lipstick Collection",
      brand: "LuxeBeauty",
      price: 45.00,
      originalPrice: 60.00,
      image: "https://images.unsplash.com/photo-1613255348289-1407e4f2f980?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXBzdGljayUyMG1ha2V1cCUyMGJlYXV0eXxlbnwxfHx8fDE3NTc5NDQ0MjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.8,
      reviews: 1234,
      badge: "NEW"
    },
    {
      id: 2,
      name: "Premium Eye Palette",
      brand: "ColorPro",
      price: 89.00,
      originalPrice: 120.00,
      image: "https://images.unsplash.com/photo-1594903696739-2551e8c2d0f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleWVzaGFkb3clMjBwYWxldHRlJTIwbWFrZXVwfGVufDF8fHx8MTc1Nzg5NjU4NXww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.9,
      reviews: 892,
      badge: "BESTSELLER"
    },
    {
      id: 3,
      name: "Hydrating Serum",
      brand: "SkinLux",
      price: 125.00,
      originalPrice: 150.00,
      image: "https://images.unsplash.com/photo-1665763630810-e6251bdd392d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHNlcnVtJTIwYm90dGxlc3xlbnwxfHx8fDE3NTc5NDc1ODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.7,
      reviews: 567,
      badge: "LIMITED"
    },
    {
      id: 4,
      name: "Signature Fragrance",
      brand: "Elegance",
      price: 95.00,
      originalPrice: 130.00,
      image: "https://images.unsplash.com/photo-1757313202626-8b763ce254a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwZnJhZ3JhbmNlJTIwbHV4dXJ5fGVufDF8fHx8MTc1Nzk0NzU4Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.6,
      reviews: 789,
      badge: "TRENDING"
    },
    {
      id: 5,
      name: "Foundation Stick",
      brand: "FlawlessBase",
      price: 52.00,
      originalPrice: 65.00,
      image: "https://images.unsplash.com/photo-1695972235476-c75a4754dc04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjb3NtZXRpY3MlMjBiZWF1dHklMjBwcm9kdWN0c3xlbnwxfHx8fDE3NTc5NDc1Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.5,
      reviews: 445,
      badge: "SALE"
    },
    {
      id: 6,
      name: "Lip Gloss Set",
      brand: "GlossyBeauty",
      price: 35.00,
      originalPrice: 45.00,
      image: "https://images.unsplash.com/photo-1613255348289-1407e4f2f980?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXBzdGljayUyMG1ha2V1cCUyMGJlYXV0eXxlbnwxfHx8fDE3NTc5NDQ0MjB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 4.4,
      reviews: 320,
      badge: "NEW"
    }
  ];

  const brands = [
    { name: "CHANEL", icon: Crown },
    { name: "DIOR", icon: Sparkles },
    { name: "YSL", icon: Heart },
    { name: "FENTY", icon: Zap },
    { name: "RARE", icon: Star },
    { name: "GLOSSIER", icon: Palette },
    { name: "CHARLOTTE", icon: Gift },
    { name: "NARS", icon: TrendingUp }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      comment: "Amazing quality products! The lipstick collection is absolutely stunning and long-lasting.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Emily Chen",
      rating: 5,
      comment: "Best beauty shopping experience ever. Fast delivery and premium packaging.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Maya Patel",
      rating: 5,
      comment: "Love the skincare collection! My skin has never looked better.",
      image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=150&h=150&fit=crop&crop=face"
    }
  ];

  // Auto-slide effect
  useEffect(() => {
    if (!isAutoSliding) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoSliding, heroSlides.length]);

  const nextSlide = () => {
    setIsAutoSliding(false);
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setTimeout(() => setIsAutoSliding(true), 10000);
  };

  const prevSlide = () => {
    setIsAutoSliding(false);
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setTimeout(() => setIsAutoSliding(true), 10000);
  };

  // Section component with intersection observer
  const AnimatedSection = ({ children, className = "", delay = 0 }: any) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
      <motion.section
        ref={ref}
        className={className}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.6, delay }}
      >
        {children}
      </motion.section>
    );
  };

  return (
    <div className="min-h-screen bg-[#1a0f1a]">
      {/* Hero Banner */}
      <section className="relative min-h-screen lg:h-screen overflow-hidden">
  <AnimatePresence mode="wait">
    {heroSlides.map(
      (slide, index) =>
        index === currentSlide && (
          <motion.div
            key={slide.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Background image */}
            <ImageWithFallback
              src={slide.image}
              alt={slide.title}
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Overlay gradient */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${slide.bgColor} opacity-70`}
            />

            {/* Content over image */}
            <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
              <motion.div
                className="text-left space-y-6 max-w-2xl"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Badge className="bg-[#FFD369] text-[#1a0f1a] border-none text-base lg:text-lg px-4 py-2 flex items-center w-fit">
                  <Sparkles className="w-4 h-4 mr-2" />
                  {slide.subtitle}
                </Badge>

                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-[#FFD369] leading-tight">
                  {slide.title}
                </h1>

                <p className="text-lg lg:text-xl text-white/90 max-w-lg leading-relaxed">
                  {slide.description}
                </p>

                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <Button
                    className="bg-[#FFD369] text-[#1a0f1a] hover:bg-[#FFD369]/90 px-8 py-3 text-lg font-semibold"
                    onClick={() => setCurrentPage("products")}
                  >
                    Shop Now <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>

                  <Button
                    variant="outline"
                    className="border-2 border-[#FFD369] text-[#FFD369] hover:bg-[#FFD369] hover:text-[#1a0f1a] px-8 py-3 text-lg"
                    onClick={() => setCurrentPage("products")}
                  >
                    Explore Collection
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )
    )}
  </AnimatePresence>

  {/* Navigation buttons */}
  <Button
    variant="ghost"
    size="icon"
    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 backdrop-blur-sm text-white hover:bg-[#FFD369] hover:text-[#1a0f1a] w-10 h-10 lg:w-12 lg:h-12 rounded-full"
    onClick={prevSlide}
  >
    <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
  </Button>

  <Button
    variant="ghost"
    size="icon"
    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 backdrop-blur-sm text-white hover:bg-[#FFD369] hover:text-[#1a0f1a] w-10 h-10 lg:w-12 lg:h-12 rounded-full"
    onClick={nextSlide}
  >
    <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
  </Button>

  {/* Dots */}
  <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
    {heroSlides.map((_, index) => (
      <button
        key={index}
        className={`w-3 h-3 rounded-full transition-all duration-300 ${
          index === currentSlide ? "bg-[#FFD369] scale-125" : "bg-white/40"
        }`}
        onClick={() => {
          setCurrentSlide(index);
          setIsAutoSliding(false);
          setTimeout(() => setIsAutoSliding(true), 10000);
        }}
      />
    ))}
  </div>
</section>


      {/* Featured Products */}
      <AnimatedSection className="py-16 lg:py-20 bg-[#1a0f1a]" delay={0.2}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-[#FFD369] mb-4">Featured & New Arrivals</h2>
            <p className="text-lg lg:text-xl text-white/80">Discover our latest luxury beauty essentials</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-6 justify-items-center">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard
                  product={{
                    ...product,
                    inStock: true
                  }}
                  onClick={() => setCurrentPage('product-detail')}
                  onAddToCart={(id) => {
                    console.log('Add to cart:', id);
                  }}
                  onAddToWishlist={(id) => {
                    console.log('Add to wishlist:', id);
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Trending Offers */}
      <AnimatedSection className="py-16 lg:py-20 bg-gradient-to-r from-[#B85C38] to-[#A30B37]" delay={0.4}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold text-[#FFD369] mb-4 lg:mb-6">Trending Offers</h2>
          <p className="text-lg lg:text-xl text-white/90 mb-8 lg:mb-12">Limited time deals you don't want to miss</p>
          
          <div className="bg-white/15 backdrop-blur-lg rounded-3xl p-8 lg:p-12 max-w-6xl mx-auto border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {[
                { icon: Zap, title: "Flash Sale", desc: "Up to 50% off on selected items", time: "Ends in 2 days" },
                { icon: Truck, title: "Free Shipping", desc: "On orders over $75", time: "No code required" },
                { icon: Gift, title: "Gift Sets", desc: "Buy 2 get 1 free", time: "Perfect for gifting" }
              ].map((offer, index) => (
                <motion.div
                  key={index}
                  className="space-y-4"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <offer.icon className="w-10 h-10 lg:w-12 lg:h-12 text-[#FFD369] mx-auto" />
                  <h3 className="text-xl lg:text-2xl font-bold text-[#FFD369]">{offer.title}</h3>
                  <p className="text-white/90">{offer.desc}</p>
                  <p className="text-sm text-white/70">{offer.time}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-8 lg:mt-12">
              <Button 
                className="bg-[#FFD369] text-[#1a0f1a] hover:bg-[#FFD369]/90 px-8 lg:px-12 py-3 lg:py-4 text-lg lg:text-xl font-bold"
                onClick={() => setCurrentPage('products')}
              >
                Shop All Deals
              </Button>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Brand Carousel */}
      <AnimatedSection className="py-16 lg:py-20 bg-[#2C1E4A]" delay={0.6}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-5xl font-bold text-[#FFD369] text-center mb-12 lg:mb-16">Featured Brands</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 lg:gap-6">
            {brands.map((brand, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="bg-[#1C3A2E] border-[#FFD369]/20 hover:border-[#FFD369] transition-all duration-300">
                  <CardContent className="p-4 lg:p-6 text-center">
                    <brand.icon className="w-6 h-6 lg:w-8 lg:h-8 text-[#FFD369] mx-auto mb-2 lg:mb-3" />
                    <p className="font-bold text-[#FFD369] text-sm lg:text-base">{brand.name}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Testimonials */}
      <AnimatedSection className="py-16 lg:py-20 bg-[#1C3A2E]" delay={0.8}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-5xl font-bold text-[#FFD369] text-center mb-12 lg:mb-16">What Our Customers Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="bg-[#2C1E4A] border-[#FFD369]/20 hover:border-[#FFD369] transition-all duration-300">
                  <CardContent className="p-6 lg:p-8 text-center space-y-4 lg:space-y-6">
                    <ImageWithFallback
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 lg:w-20 lg:h-20 rounded-full mx-auto object-cover border-2 border-[#FFD369]"
                    />
                    
                    <div className="flex justify-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 lg:w-5 lg:h-5 fill-[#FFD369] text-[#FFD369]" />
                      ))}
                    </div>
                    
                    <p className="text-white/90 italic text-sm lg:text-base">"{testimonial.comment}"</p>
                    <p className="font-semibold text-[#FFD369] text-base lg:text-lg">{testimonial.name}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Blog Section */}
      <AnimatedSection className="py-16 lg:py-20 bg-[#1C3A2E]" delay={1}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-[#FFD369] mb-4 lg:mb-6">Beauty Blog</h2>
            <p className="text-lg lg:text-xl text-white/80">Latest trends, tips, and tutorials</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                title: "Summer Makeup Trends 2025",
                excerpt: "Discover the hottest makeup looks for the summer season",
                image: "https://images.unsplash.com/photo-1688953228417-8ec4007eb532?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBicmFuZCUyMGNvc21ldGljc3xlbnwxfHx8fDE3NTc5NDc1ODl8MA&ixlib=rb-4.1.0&q=80&w=1080",
                date: "Dec 15, 2024"
              },
              {
                title: "Skincare Routine Guide",
                excerpt: "Build the perfect skincare routine for your skin type",
                image: "https://images.unsplash.com/photo-1665763630810-e6251bdd392d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza2luY2FyZSUyMHNlcnVtJTIwYm90dGxlc3xlbnwxfHx8fDE3NTc5NDc1ODR8MA&ixlib=rb-4.1.0&q=80&w=1080",
                date: "Dec 12, 2024"
              },
              {
                title: "Fragrance Layering Tips",
                excerpt: "Learn how to layer fragrances like a professional",
                image: "https://images.unsplash.com/photo-1757313202626-8b763ce254a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmdW1lJTIwZnJhZ3JhbmNlJTIwbHV4dXJ5fGVufDF8fHx8MTc1Nzk0NzU4Mnww&ixlib=rb-4.1.0&q=80&w=1080",
                date: "Dec 10, 2024"
              }
            ].map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="bg-[#4B1C3F] border-[#FFD369]/20 overflow-hidden hover:border-[#FFD369] transition-all duration-300">
                  <div className="overflow-hidden">
                    <ImageWithFallback
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4 lg:p-6">
                    <p className="text-sm text-[#FFD369] mb-2">{post.date}</p>
                    <h3 className="font-bold text-white text-lg mb-3">{post.title}</h3>
                    <p className="text-white/80 mb-4 text-sm lg:text-base">{post.excerpt}</p>
                    <Button variant="ghost" className="text-[#FFD369] hover:text-white p-0">
                      Read More <ArrowRight className="ml-1 w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}