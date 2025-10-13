import  { useState, useEffect, useRef } from 'react';
import { motion,  useInView, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight,    } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';

import { ImageWithFallback } from './figma/ImageWithFallback';
import girlsProduct from "../assets/girlsproducts.png"
import birthday from "../assets/birthday.jpeg"
import electronics from "../assets/electronics.png"
import FeaturedProducts from './Featured';
import PriceProducts from './PriceProducts';
import BrandCarousel from './BrandCarsouel';
import nykaa from "../assets/nykaa.png";
import sugar from "../assets/sugar.png";
import cetaphil from "../assets/cetaphil.jpg";
import SearchPage from './SearchPage';
interface HomePageProps {
  setCurrentPage: (
    page: string,
    options?: { category?: string; price?: number; brand?: string }
  ) => void;
}

export default function HomePage({ setCurrentPage }: HomePageProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  //const heroRef = useRef<HTMLDivElement>(null);
 const [selectedPrice,] = useState<number | null>(null);

const handlePriceClick = (price: number) => {
  setCurrentPage("search", { price }); // pass the price directly
};
  const heroSlides = [
    {
      id: 1,
      
     image: girlsProduct,
      bgColor: "from-[#4B1C3F] via-[#2C1E4A] to-[#1a0f1a]"
    },
    {
      id: 2,
     image: electronics,
       bgColor: "from-[#A30B37] via-[#4B1C3F] to-[#2C1E4A]"
    },
    {
      id: 3,
       image: birthday,
       bgColor: "from-[#1C3A2E] via-[#2C1E4A] to-[#4B1C3F]"
    }
  ];


  

const slides = [
  {
    image: nykaa, // Maybelline product
    title: "Nykaa",
    subtitle: "Shop Latest Makeup",
  },
  {
    image: sugar, // Nykaa product
    title: "Sugar",
    subtitle: "Up to 30% OFF",
  },
  {
    image: cetaphil, // Maybelline product
    title: "Ceptaphil",
    subtitle: "Limited Stock!",
  },
];
const pricePlans = [
    { id: 1, price: 99, subtitle: "STORE", note: "LIVE NOW" },
    { id: 2, price: 199, subtitle: "STORE", note: "LIVE NOW" },
    { id: 3, price: 299, subtitle: "STORE", note: "LIVE NOW" },
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
      <section
  style={{
    position: "relative",
    minHeight: "40vh",
    overflow: "hidden",
  }}
>
  <AnimatePresence mode="wait">
    {heroSlides.map(
      (slide, index) =>
        index === currentSlide && (
          <motion.div
            key={slide.id}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Background image */}
            <ImageWithFallback
              src={slide.image}
              
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />

            {/* Gradient overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0.7,
              }}
            />

            {/* Content */}
            <div
              style={{
                position: "relative",
                zIndex: 10,
                display: "flex",
                alignItems: "center",
                height: "100%",
                maxWidth: "1200px",
                margin: "0 auto",
                padding: "0 20px",
              }}
            >
              <motion.div
                style={{ maxWidth: "600px" }}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div
                  style={{
                    backgroundColor: "#FFD369",
                    color: "#1a0f1a",
                    padding: "10px 20px",
                    display: "inline-flex",
                    alignItems: "center",
                    fontSize: "1rem",
                    fontWeight: 600,
                    borderRadius: "25px",
                    marginBottom: "15px",
                  }}
                >

                </div>

                <h1
                  style={{
                    fontSize: "clamp(2rem, 5vw, 4.5rem)",
                    fontWeight: "bold",
                    color: "#370c82ff",
                    background:"white",
                    lineHeight: 1.1,
                    margin: "20px 0 10px 0",
                    maxWidth: "800px",
                  }}
                >
                  
                </h1>

                <p
                  style={{
                    fontSize: "clamp(1rem, 1.5vw, 1.4rem)",
                    color: "rgba(255, 255, 255, 0.9)",
                    maxWidth: "600px",
                    lineHeight: 1.6,
                    marginBottom: "30px",
                  }}
                >
                 
                </p>
              </motion.div>
            </div>
          </motion.div>
        )
    )}
  </AnimatePresence>

  {/* Navigation buttons */}
  <button
    onClick={prevSlide}
    style={{
      position: "absolute",
      top: "50%",
      left: "20px",
      transform: "translateY(-50%)",
      backgroundColor: "rgba(0,0,0,0.4)",
      backdropFilter: "blur(6px)",
      color: "#fff",
      border: "none",
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "all 0.3s ease",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FFD369")}
    onMouseLeave={(e) =>
      (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.4)")
    }
  >
    <ChevronLeft color="white" />
  </button>

  <button
    onClick={nextSlide}
    style={{
      position: "absolute",
      top: "50%",
      right: "20px",
      transform: "translateY(-50%)",
      backgroundColor: "rgba(0,0,0,0.4)",
      backdropFilter: "blur(6px)",
      color: "#fff",
      border: "none",
      width: "50px",
      height: "50px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      transition: "all 0.3s ease",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FFD369")}
    onMouseLeave={(e) =>
      (e.currentTarget.style.backgroundColor = "rgba(0,0,0,0.4)")
    }
  >
    <ChevronRight color="white" />
  </button>

  {/* Dots */}
  <div
    style={{
      position: "absolute",
      bottom: "30px",
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      gap: "12px",
      zIndex: 20,
    }}
  >
    {heroSlides.map((_, index) => (
      <div
        key={index}
        onClick={() => {
          setCurrentSlide(index);
          setIsAutoSliding(false);
          setTimeout(() => setIsAutoSliding(true), 10000);
        }}
        style={{
          width: index === currentSlide ? "14px" : "10px",
          height: index === currentSlide ? "14px" : "10px",
          borderRadius: "50%",
          backgroundColor:
            index === currentSlide ? "#FFD369" : "rgba(255, 255, 255, 0.4)",
          boxShadow:
            index === currentSlide ? "0 0 10px #FFD369" : "none",
          transition: "all 0.3s ease",
          cursor: "pointer",
        }}
      />
    ))}
  </div>
</section>




  <FeaturedProducts setCurrentPage={setCurrentPage} />


      {/* Priced products */}

      
 <div style={{ padding: "1rem", backgroundColor: "#f9fafb02" }}>
  <PriceProducts
    products={pricePlans}
    onSelectPrice={handlePriceClick} // <-- callback
  />
  {/* Conditionally render SearchPage when selectedPrice is set */}
  {selectedPrice && (
    <SearchPage
      selectedPrice={selectedPrice}
      setCurrentPage={setCurrentPage}
      setSelectedProduct={() => {}}
      onAddToCart={() => {}}
    />
  )}
</div>



<div className="w-full min-h-[350px]">
 <BrandCarousel slides={slides} setCurrentPage={setCurrentPage} />

</div>

     

     
      
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