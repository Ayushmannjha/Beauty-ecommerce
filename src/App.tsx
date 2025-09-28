import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Toaster } from "./components/ui/sonner";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";

import ProductDetailPage from "./components/ProductDetailPage";
import CartPage from "./components/CartPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ProfilePage from "./components/ProfilePage";
import OrdersPage from "./components/OrdersPage";
import SearchPage from "./components/SearchPage";

import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

export default function App() {
  // ✅ Page state includes optional fields: category, price, brand, name (search)
  const [currentPage, setCurrentPageState] = useState<{
    page: string;
    category?: string;
    price?: number;
    brand?: string;
    name?: string; // for search query
  }>({ page: "home" });

  // Unified navigation function
  const setCurrentPage = (
    page: string,
    options?: { category?: string; price?: number; brand?: string; name?: string }
  ) => {
    console.log("➡️ Navigating:", page, "with options:", options);
    setCurrentPageState({ page, ...options });
  };

  // Optional: store the latest search query locally
  const [searchQuery, setSearchQuery] = useState("");

  // Called by Header search input
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // ✅ Pass search query as 'name' in currentPage state
    setCurrentPage("search", { name: query });
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20, scale: 0.98 },
    in: { opacity: 1, y: 0, scale: 1 },
    out: { opacity: 0, y: -20, scale: 1.02 },
  };

  const pageTransition: any = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4,
  };

  const renderPage = (): ReactNode => {
    switch (currentPage.page) {
      case "home":
        return <HomePage setCurrentPage={setCurrentPage} />;
      
      case "product-detail":
        return <ProductDetailPage setCurrentPage={setCurrentPage} />;
      case "cart":
        return <CartPage setCurrentPage={setCurrentPage} />;
      case "login":
        return <LoginPage setCurrentPage={setCurrentPage} />;
      case "register":
        return <RegisterPage setCurrentPage={setCurrentPage} />;
      case "profile":
        return <ProfilePage setCurrentPage={setCurrentPage} />;
      case "orders":
        return <OrdersPage setCurrentPage={setCurrentPage} />;
      case "search":
        return (
          <SearchPage
            setCurrentPage={setCurrentPage}
            category={currentPage.category}
            selectedPrice={currentPage.price}
            brand={currentPage.brand}
            name={currentPage.name || searchQuery} // ✅ Pass the search name
            setSelectedProduct={(product) => {
              console.log("Selected product:", product);
              setCurrentPage("product-detail");
            }}
            onAddToCart={(product, quantity = 1) => {
              console.log("Added to cart:", product, "Quantity:", quantity);
            }}
          />
        );
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  const isSpecialPage = ["login", "register"].includes(currentPage.page);

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-[#1a0f1a]">
          {!isSpecialPage && (
            <Header
              currentPage={currentPage.page}
              setCurrentPage={setCurrentPage}
              onSearch={handleSearch} // ✅ Pass search handler
            />
          )}

          <AnimatePresence mode="wait">
            <motion.main
              key={currentPage.page}
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
