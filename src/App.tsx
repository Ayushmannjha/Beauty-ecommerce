import  { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Toaster } from "./components/ui/sonner";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import ProductListingPage from "./components/ProductListingPage";
import ProductDetailPage from "./components/ProductDetailPage";
import CartPage from "./components/CartPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ProfilePage from "./components/ProfilePage";
import OrdersPage from "./components/OrdersPage";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

export default function App() {
  // keep currentPage as plain string to match existing child props
  const [currentPage, setCurrentPage] = useState<string>("home");

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.98,
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
    out: {
      opacity: 0,
      y: -20,
      scale: 1.02,
    },
  };

  // cast to any to avoid strict framer/motion typing complaints
  const pageTransition: any = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4,
  };

  // make pages indexable with string keys so pages[currentPage] is valid
  const pages: Record<string, ReactNode> = {
    home: <HomePage setCurrentPage={setCurrentPage} />,
    products: <ProductListingPage setCurrentPage={setCurrentPage} />,
    "product-detail": <ProductDetailPage setCurrentPage={setCurrentPage} />,
    cart: <CartPage setCurrentPage={setCurrentPage} />,
    login: <LoginPage setCurrentPage={setCurrentPage} />,
    register: <RegisterPage setCurrentPage={setCurrentPage} />,
    profile: <ProfilePage setCurrentPage={setCurrentPage} />,
    orders: <OrdersPage setCurrentPage={setCurrentPage} />,
  };

  const renderPage = () => {
    // return current page if found, otherwise fallback to home
    return pages[currentPage] ?? pages["home"];
  };

  const isSpecialPage = ["login", "register"].includes(currentPage);

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-[#1a0f1a]">
          {!isSpecialPage && (
            <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
          )}

          <AnimatePresence mode="wait">
            <motion.main
              key={currentPage}
              className={!isSpecialPage ? "" : "min-h-screen"}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              {renderPage()}
            </motion.main>
          </AnimatePresence>

          {!isSpecialPage && <Footer />}

          {/* Special page navigation */}
          {isSpecialPage && (
            <div className="fixed top-4 left-4 z-50">
              <button
                onClick={() => setCurrentPage("home")}
                className="bg-[#FFD369] text-[#1a0f1a] px-6 py-3 rounded-lg hover:bg-[#FFD369]/90 transition-all duration-300 font-semibold shadow-lg"
              >
                ← Back to Home
              </button>
            </div>
          )}

          <Toaster
            richColors
            position="top-right"
            toastOptions={{
              style: {
                background: "#2C1E4A",
                border: "1px solid #FFD369",
                color: "#f5f1f5",
                borderRadius: "12px",
              },
            }}
          />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}
