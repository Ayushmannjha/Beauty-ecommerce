import { motion, useInView } from "motion/react";
import { useRef } from "react";

import rings from "../assets/rings.jpeg";
import skincare from "../assets/skinCare.jpeg";
import bangles from "../assets/bangles.jpeg";
import kitchen from "../assets/Kitchenessentials.jpeg";
import home from "../assets/homedecor.jpeg";
import electronics from "../assets/electronics.png";
import earing from "../assets/Earing.jpeg";
import birthday from "../assets/birthday.jpeg";
import hair from "../assets/Hair_accesories.jpg";
import stationary from "../assets/Stationary.jpeg";
import makeup from "../assets/Makeupessentials.jpeg";

interface FeaturedProductsProps {
  setCurrentPage: (page: string, options?: { category?: string }) => void;
}

const AnimatedSection = ({ children, delay = 0 }: any) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.section
      ref={ref}
      style={{
        padding: "2rem 1rem",
        backgroundColor: "#1a0f1a",
        borderTop: "4px solid #FFD369",
      }}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.section>
  );
};

const CategoryCard = ({ category, onClick }: any) => (
  <motion.div
    whileHover={{ scale: 1.06 }}
    whileTap={{ scale: 0.96 }}
    style={{
      cursor: "pointer",
      position: "relative",
      borderRadius: "1rem",
      overflow: "hidden",
      boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
      width: "100%",
      aspectRatio: "3 / 4",
      maxWidth: "220px",
      transition: "transform 0.3s ease",
    }}
    onClick={() => onClick(category.name)}
  >
    <motion.img
      src={category.image}
      alt={category.name}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
      }}
      whileHover={{ scale: 1.1 }}
    />
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2))",
        padding: "0.8rem",
        textAlign: "center",
      }}
    >
      <p
        style={{
          color: "#FFD369",
          fontWeight: "bold",
          fontSize: "1rem",
          margin: 0,
          letterSpacing: "0.5px",
          textTransform: "uppercase",
        }}
      >
        {category.name}
      </p>
    </div>
  </motion.div>
);

export default function ShopByCategory({ setCurrentPage }: FeaturedProductsProps) {
  const categories = [
    { id: 1, name: "Earrings", image: earing },
    { id: 2, name: "Skincare", image: skincare },
    { id: 3, name: "Bangles", image: bangles },
    { id: 4, name: "Makeup Essentials", image: makeup },
    { id: 5, name: "Home decorative items", image: home },
    { id: 6, name: "Hair accessories", image: hair },
    { id: 7, name: "Birthday Party items", image: birthday },
    { id: 8, name: "Electronics", image: electronics },
    { id: 9, name: "Kitchen essentials", image: kitchen },
    { id: 10, name: "Stationary", image: stationary },
    { id: 11, name: "Rings", image: rings },
  ];

  return (
    <AnimatedSection delay={0.2}>
      <div style={{ maxWidth: "1300px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          
          <div
            style={{
              width: "80px",
              height: "4px",
              backgroundColor: "#FFD369",
              margin: "0 auto",
              borderRadius: "2px",
            }}
          ></div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(140px, 1fr))",
            gap: "1.5rem",
            justifyItems: "center",
            padding: "0 0.5rem",
          }}
        >
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={(name: string) => setCurrentPage("search", { category: name })}
            />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
