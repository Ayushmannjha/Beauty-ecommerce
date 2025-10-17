import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import scrunchies from "../assets/srunchies.jpeg";
import nosepin from "../assets/nosepins.jpeg";
import clutcher from "../assets/Clutcher.jpg";
import napkins from "../assets/Synatry napkins.jpg"
interface FeaturedProductsProps {
  setCurrentPage: (
    page: string,
    options?: { category?: string; price?: number; brand?: string; name?: string }
  ) => void;
}

const AnimatedSection = ({ children, delay = 0 }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.section
      ref={ref}
      style={{
        paddingTop: "2rem",
        paddingBottom: "2rem",
        backgroundColor: "#1a0f1a",
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.section>
  );
};

interface NameCard {
  name: string;
  image: string;
}

export default function ShopByName({ setCurrentPage }: FeaturedProductsProps) {
  const [searchQuery] = useState("");

  const predefinedNames: NameCard[] = [
    { name: "Scrunchies", image: scrunchies },
    { name: "Nosepin", image: nosepin },
    { name: "Clutcher", image: clutcher },
    { name: "sanitary napkins", image: napkins },

  ];

  const handleSearch = (query?: string) => {
    const finalQuery = (query || searchQuery).trim();
    if (!finalQuery) return;
    setCurrentPage("search", { name: finalQuery });
  };

  return (
    <AnimatedSection delay={0.2}>
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1rem",
          textAlign: "center",
        }}
      >
        

        {/* Predefined name cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "2rem",
            justifyItems: "center",
          }}
        >
          {predefinedNames.map((item) => (
            <motion.div
              key={item.name}
              whileHover={{ scale: 1.08, y: -5 }}
              whileTap={{ scale: 0.96 }}
              style={{
                cursor: "pointer",
                borderRadius: "1rem",
                overflow: "hidden",
                width: "100%",
                maxWidth: "200px",
                aspectRatio: "3/4",
                position: "relative",
                boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
                transition: "box-shadow 0.3s ease",
              }}
              onClick={() => handleSearch(item.name)}
            >
              <motion.img
                src={item.image}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.4s ease",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "center",
                  padding: "1rem",
                }}
              >
                <p
                  style={{
                    color: "#FFD369",
                    fontWeight: "bold",
                    margin: 0,
                    fontSize: "1rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  {item.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
