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
  onSelectPrice: (price: number) => void; // new prop
}


export default function PriceProducts({ products, onSelectPrice }: PriceProductsProps) {
  return (
    <div
      style={{
        position: "relative",
        padding: "2px 2px",
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
          width: "250px",
          height: "250px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(147,51,234,0.4), transparent 70%)",
          filter: "blur(100px)",
          zIndex: -1,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "2%",
          right: "10%",
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(79,70,229,0.4), transparent 70%)",
          filter: "blur(120px)",
          zIndex: -1,
        }}
      />

    

      {/* Cards */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "24px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            style={{
              position: "relative",
              width: "200px",
              height: "180px",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              padding: "16px",
              cursor: "pointer",
              background:
                "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 25%, #cfd9df 50%, #e0c3fc 75%, #fbc2eb 100%)",
              transition: "all 0.3s ease-in-out",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: product.id * 0.15 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(147, 51, 234, 0.6)",
            }}
            onClick={() => onSelectPrice(product.price)} // NEW: call parent
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
                }}
              >
                
              </div>
            )}

            <p style={{ fontSize: "36px", fontWeight: 800, color: "#6d28d9", margin: 0 }}>
              {product.currency || "₹"}
              {product.price}
            </p>

            {product.subtitle && (
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#7c3aed", marginTop: "4px" }}>
                {product.subtitle}
              </p>
            )}
            {product.note && (
              <p style={{ fontSize: "12px", color: "#9333ea", marginTop: "4px" }}>
                {product.note}
              </p>
            )}

            <button
              style={{
                marginTop: "12px",
                padding: "8px 16px",
                borderRadius: "8px",
                background: "linear-gradient(90deg,#9333ea,#4f46e5)",
                color: "white",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
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
