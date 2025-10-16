import  { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight,    } from 'lucide-react';


import { ImageWithFallback } from './figma/ImageWithFallback';
import girlsProduct from "../assets/girlsproducts.png"
import birthday from "../assets/birthday.jpeg"
import electronics from "../assets/electronics.png"
import FeaturedProducts from './Featured';
import PriceProducts from './PriceProducts';

import SearchPage from './SearchPage';
import ShopByName from './ShopByName';
import BlogPage from './BlogPage';
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

  return (
    <div className="min-h-screen bg-[#1a0f1a]">
      {/* Hero Banner */}
      <section
  style={{
    position: "relative",
    minHeight: "50vh",
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
      
      setCurrentPage={setCurrentPage}
      setSelectedProduct={() => {}}
      onAddToCart={() => {}}
    />
  )}
</div>

<ShopByName setCurrentPage={setCurrentPage as (page: string, options?: { name?: string }) => void} />

<BlogPage></BlogPage>
    </div>
  );
}