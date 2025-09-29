import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Search, ShoppingBag, Menu, Sparkles, X, Home } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useCart } from "../contexts/CartContext";

import {jwtDecode} from "jwt-decode";
import { HomePageApi } from "./services/homepage";

interface HeaderProps {
  currentPage: string;
 setCurrentPage: (
    page: string,
    options?: { category?: string; price?: number; brand?: string; name?: string }
  ) => void;
  onSearch?: (query: string) => void;
}

interface TokenPayload {
  User: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
}

export default function Header({  setCurrentPage }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<TokenPayload["User"] | null>(null);
  const { getCartCount } = useCart();
const handleSearch = async (e: React.FormEvent) => {
  e.preventDefault();
  const query = searchQuery.trim();
  if (!query) return;

  try {
    // call searchByName API
    const response = await HomePageApi.searchProductsByName(query);
    const results = response.data;
    console.log("Search results:", results);

    // navigate to SearchPage with the search query
    setCurrentPage("search", { name: query }); // ✅ pass query as 'name' in options

  } catch (err) {
    console.error("Search API error:", err);
  }
};


 const handleSearchInputKeyPress = (e: React.KeyboardEvent) => {
  if (e.key === "Enter") {
    handleSearch(e as any);  // Call handleSearch when Enter is pressed
  }
};


  useEffect(() => {
    const tokenString = localStorage.getItem("token");
    if (!tokenString) return;

    let jwt = "";
    try {
      const parsed = JSON.parse(tokenString);
      jwt = parsed.token || tokenString;
    } catch {
      jwt = tokenString;
    }

    try {
      const decoded: TokenPayload = jwtDecode(jwt);
      setUser(decoded.User);
    } catch (err) {
      console.error("Failed to decode token:", err);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setCurrentPage("home");
  };

  return (
    <motion.header
      className="bg-[#4B1C3F]/95 border-b border-[#FFD369]/20 sticky top-0 z-50 backdrop-blur-xl"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <motion.div
          className="flex items-center justify-between py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Logo / Mobile Search */}
          {!isMobileSearchOpen ? (
            <motion.div
              className="flex items-center cursor-pointer flex-shrink-0"
              onClick={() => setCurrentPage("home")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mr-2"
              >
                <Sparkles className="w-8 h-8 text-[#FFD369]" />
              </motion.div>
              <motion.h1
                className="text-2xl font-bold text-[#FFD369]"
                initial={{ x: -20 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                ShreeAura
              </motion.h1>
            </motion.div>
          ) : (
            <div className="flex-1 mr-4">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchInputKeyPress}
                  className="w-full bg-[#2C1E4A]/80 border-[#FFD369]/30 text-white placeholder:text-gray-300 pr-10 py-2 rounded-lg"
                />
                <Search
                  onClick={handleSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#FFD369] w-5 h-5 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* Desktop Search */}
          <motion.div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search for products, brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearchInputKeyPress}
                className="w-full bg-[#2C1E4A]/80 border-[#FFD369]/30 text-white placeholder:text-gray-300 pr-12 py-3 rounded-lg relative z-10 backdrop-blur-sm"
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={(e) => handleSearch(e as any)}
              >
                <Search className="text-[#FFD369] w-5 h-5" />
              </div>
            </div>
          </motion.div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            {/* Mobile Search Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-[#FFD369] hover:bg-[#2C1E4A]"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            >
              {isMobileSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
            </Button>

            {/* User Avatar / Login */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-12 w-12 rounded-full p-0">
                    <Avatar className="h-10 w-10 relative z-10 m-auto">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-[#FFD369] text-[#1a0f1a]">
                        {user.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 bg-[#2C1E4A]/95 border-[#FFD369]/20 backdrop-blur-xl"
                  align="end"
                  forceMount
                >
                  <DropdownMenuItem onClick={() => setCurrentPage("profile")}>Profile</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCurrentPage("orders")}>Orders</DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>Log out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="default"
                className="bg-[#FFD369] text-[#2C1E4A] font-semibold hover:bg-[#e6c05d]"
                onClick={() => setCurrentPage("login")}
              >
                Login
              </Button>
            )}


            {/* Cart */}
            <Button
              variant="ghost"
              size="icon"
              className="text-[#FFD369] hover:bg-[#2C1E4A] relative"
              onClick={() => setCurrentPage("cart")}
            >
              <ShoppingBag className="w-5 h-5" />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#A30B37] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {getCartCount()}
                </span>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-[#FFD369] hover:bg-[#2C1E4A]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>

        {/* Subnavbar - always visible with Home only */}
       <motion.nav
  style={{
    display: "flex",
    alignItems: "center",
    // dark purple
    borderTop: "1px solid rgba(255, 211, 105, 0.125)", // light border
    padding: "0.5rem",
    width: "100%",
    justifyContent: "flex-start",
  }}
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
>
  <motion.button
    onClick={() => setCurrentPage("home")}
    style={{
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      color: "white",
      fontSize: "1rem",
      cursor: "pointer",
      border: "none",
      background: "transparent",
      padding: "0.25rem 0.5rem",
      borderRadius: "0.25rem",
    }}
    whileHover={{ scale: 1.05, color: "#FFD369" }}
    whileTap={{ scale: 0.95 }}
  >
    <Home style={{ width: "20px", height: "20px", color: "#FFD369" }} />
    <span>Home</span>
  </motion.button>
</motion.nav>

      </div>
    </motion.header>
  );
}
