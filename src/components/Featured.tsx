import { motion, useInView } from "motion/react";
import { useRef } from "react";

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
        paddingTop: "4rem",
        paddingBottom: "5rem",
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

// 👉 Category Card
const CategoryCard = ({ category, onClick }: any) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    style={{ cursor: "pointer", position: "relative" }}
    onClick={() => onClick(category.name)}
  >
    <div
      style={{
        width: "180px",
        height: "200px",
        borderRadius: "1rem",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        position: "relative",
      }}
    >
      <img
        src={category.image}
        alt={category.name}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          background: "rgba(0,0,0,0.6)",
          padding: "0.5rem",
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: "1rem",
            margin: 0,
          }}
        >
          {category.name}
        </p>
      </div>
    </div>
  </motion.div>
);

export default function ShopByCategory({ setCurrentPage }: FeaturedProductsProps) {
  // categories can later be fetched from backend instead of hardcoding
  const categories = [
    { id: 1, name: "Lipsticks", image: "https://..." },
    { id: 2, name: "Eye Palettes", image: "https://..." },
    { id: 3, name: "Serums", image: "https://..." },
    { id: 4, name: "Fragrances", image: "https://..." },
    { id: 5, name: "Foundations", image: "https://..." },
    { id: 6, name: "Glosses", image: "https://..." },
  ];

  return (
    <AnimatedSection delay={0.2}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <h2
            style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              color: "#FFD369",
              marginBottom: "1rem",
            }}
          >
            Shop by Category
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "1.5rem",
            justifyItems: "center",
          }}
        >
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={(name: string) => {
                // 👉 Navigate to SearchPage and pass category
                setCurrentPage("search", { category: name });
              }}
            />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
