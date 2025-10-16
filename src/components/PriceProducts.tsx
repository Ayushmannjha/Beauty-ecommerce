import { motion } from "motion/react";

interface PriceProduct {
  id: number;
  price: number;
  currency?: string;
  subtitle?: string;
  note?: string;
}

interface PriceProductsProps {
  products: PriceProduct[];
  onSelectPrice: (price: number) => void;
}

export default function PriceProducts({ products, onSelectPrice }: PriceProductsProps) {
  return (
    <div
      style={{
        position: "relative",
        padding: "3rem 1rem",
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* Background glow circles */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "220px",
          height: "220px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(147,51,234,0.35), transparent 70%)",
          filter: "blur(90px)",
          zIndex: -1,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(79,70,229,0.35), transparent 70%)",
          filter: "blur(120px)",
          zIndex: -1,
        }}
      />

      {/* Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "24px",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            style={{
              position: "relative",
              width: "100%",
              minHeight: "200px",
              borderRadius: "18px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              padding: "20px",
              cursor: "pointer",
              background:
                "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 25%, #cfd9df 50%, #e0c3fc 75%, #fbc2eb 100%)",
              transition: "all 0.3s ease-in-out",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 30px rgba(147, 51, 234, 0.5)",
            }}
            onClick={() => onSelectPrice(product.price)}
          >
            {index === 1 && (
              <div
                style={{
                  position: "absolute",
                  top: "-14px",
                  background: "linear-gradient(90deg,#9333ea,#4f46e5)",
                  color: "white",
                  padding: "4px 12px",
                  borderRadius: "12px",
                  fontSize: "12px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                Popular
              </div>
            )}

            <p
              style={{
                fontSize: "clamp(28px, 4vw, 38px)",
                fontWeight: 800,
                color: "#6d28d9",
                margin: 0,
              }}
            >
              {product.currency || "₹"}
              {product.price}
            </p>

            {product.subtitle && (
              <p
                style={{
                  fontSize: "clamp(13px, 2vw, 15px)",
                  fontWeight: 600,
                  color: "#7c3aed",
                  marginTop: "6px",
                }}
              >
                {product.subtitle}
              </p>
            )}

            {product.note && (
              <p
                style={{
                  fontSize: "clamp(12px, 1.8vw, 14px)",
                  color: "#9333ea",
                  marginTop: "6px",
                }}
              >
                {product.note}
              </p>
            )}

            <button
              style={{
                marginTop: "14px",
                padding: "10px 20px",
                width: "100%",
                maxWidth: "160px",
                borderRadius: "10px",
                background: "linear-gradient(90deg,#9333ea,#4f46e5)",
                color: "white",
                fontWeight: 600,
                fontSize: "clamp(13px, 2vw, 15px)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            >
              Get Started
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
