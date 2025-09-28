import React, { useState, useEffect } from "react";

interface Slide {
  image: string;
  title?: string;      // 👈 Assume brand name is stored here
  subtitle?: string;
}

interface BrandCarouselProps {
  slides: Slide[];
  setCurrentPage: (
    page: string,
    options?: { category?: string; price?: number; brand?: string }
  ) => void;
}


const BrandCarousel: React.FC<BrandCarouselProps> = ({ slides, setCurrentPage }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  // 👇 Handle click on the carousel
  const handleSlideClick = () => {
    const brand = slides[currentIndex].title || ""; // take brand name
    if (brand) {
      setCurrentPage("search", { brand }); // 👈 use your App.tsx navigation
    }
  };

  return (
    <div
  onClick={handleSlideClick}
  style={{
    position: "relative",
    width: "100%",
    maxWidth: "1200px",      // optional, limit max width
    margin: "0 auto",
    overflow: "hidden",
    borderRadius: "0.5rem",
    aspectRatio: "16/9",
    maxHeight: "400px",      // 👈 limit height
    cursor: "pointer",
  }}
>

      {/* Slide */}
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
          borderRadius: "0.5rem",
        }}
      >
        <img
          src={slides[currentIndex].image}
          alt={slides[currentIndex].title || "slide"}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />

        {/* Overlay content */}
        {(slides[currentIndex].title || slides[currentIndex].subtitle) && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "rgba(0,0,0,0.4)",
                color: "white",
                padding: "1rem",
                borderRadius: "0.5rem",
                textAlign: "center",
              }}
            >
              {slides[currentIndex].title && (
                <h2
                  style={{
                    fontSize: "1.8rem",
                    fontWeight: 600,
                    color: "white",
                    lineHeight: "1.75rem",
                    margin: 0,
                  }}
                >
                  {slides[currentIndex].title}
                </h2>
              )}
              {slides[currentIndex].subtitle && (
                <p
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.5rem",
                    fontWeight: 600,
                    color: "white",
                    backgroundColor: "#1e3a8a",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.5rem",
                    boxShadow:
                      "0 0 10px #3b82f6, 0 0 20px #3b82f6, 0 0 30px #3b82f6",
                    margin: "0.5rem 0 0 0",
                  }}
                >
                  {slides[currentIndex].subtitle}
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // prevent triggering brand click
          prevSlide();
        }}
        style={{
          position: "absolute",
          left: "0.5rem",
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0,0,0,0.4)",
          color: "white",
          padding: "0.5rem",
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          fontSize: "1.5rem",
        }}
      >
        &#10094;
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        style={{
          position: "absolute",
          right: "0.5rem",
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0,0,0,0.4)",
          color: "white",
          padding: "0.5rem",
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          fontSize: "1.5rem",
        }}
      >
        &#10095;
      </button>

      {/* Dots */}
      <div
        style={{
          position: "absolute",
          bottom: "0.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "0.5rem",
        }}
      >
        {slides.map((_, i) => (
          <span
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(i);
            }}
            style={{
              width: "0.75rem",
              height: "0.75rem",
              borderRadius: "50%",
              backgroundColor:
                i === currentIndex ? "white" : "rgba(255,255,255,0.5)",
              cursor: "pointer",
              display: "inline-block",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BrandCarousel;
