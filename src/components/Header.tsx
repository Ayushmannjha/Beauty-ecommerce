import React, { useEffect, useState } from "react";

import {
  Search,
  ShoppingBag,
  Store,
  LogIn,
  Home,
} from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { useCart } from "../contexts/CartContext";
import { HomePageApi } from "./services/homepage";

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (
    page: string,
    options?: { category?: string; price?: number; brand?: string; name?: string }
  ) => void;
}

interface TokenPayload {
  User: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
  };
}

export default function Header({ setCurrentPage }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState<TokenPayload["User"] | null>(null);
  const [isSearchFocsed, setIsSearchFocused] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
console.log(isSearchFocsed);
  const { getCartCount } = useCart();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    try {
      const response = await HomePageApi.searchProductsByName(query);
      console.log("Search results:", response.data);
      setCurrentPage("search", { name: query });
      setIsSearchFocused(false);
      setIsMobileSearchOpen(false);
    } catch (err) {
      console.error("Search API error:", err);
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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMobileSearchOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setCurrentPage("home");
  };

  // styles
  const headerStyle: React.CSSProperties = {
    backgroundColor: "rgba(75, 28, 63, 0.95)",
    position: "sticky",
    top: 0,
    zIndex: 50,
    backdropFilter: "blur(10px)",
    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
    borderBottom: "1px solid rgba(255, 211, 105, 0.2)",
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 16px",
  };

  const logoStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    gap: "8px",
  };

  const logoTextStyle: React.CSSProperties = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#FFD369",
  };

  const searchContainerStyle: React.CSSProperties = {
    flex: 1,
    maxWidth: "650px",
    margin: "0 20px",
    position: "relative",
    display: isMobile ? "none" : "block",
  };

  const searchInputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 48px 14px 20px",
    fontSize: "16px",
    backgroundColor: "rgba(44, 30, 74, 0.8)",
    border: "1px solid rgba(255, 211, 105, 0.4)",
    color: "#fff",
    borderRadius: "30px",
    outline: "none",
  };

  const searchIconStyle: React.CSSProperties = {
    color: "#FFD369",
    cursor: "pointer",
  };

  const mobileSearchContainer: React.CSSProperties = {
    display: isMobile && isMobileSearchOpen ? "block" : "none",
    padding: "10px 16px",
    backgroundColor: "rgba(44, 30, 74, 0.9)",
    borderTop: "1px solid rgba(255, 211, 105, 0.2)",
  };

  const mobileSearchInputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 48px 12px 16px",
    fontSize: "16px",
    backgroundColor: "rgba(44, 30, 74, 0.8)",
    border: "1px solid rgba(255, 211, 105, 0.4)",
    color: "#fff",
    borderRadius: "30px",
    outline: "none",
  };

  const rightSectionStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  };

  const actionButtonStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    background: "transparent",
    border: "none",
    color: "#FFD369",
    fontSize: "16px",
    cursor: "pointer",
    padding: "8px",
  };

  const subNavStyle: React.CSSProperties = {
    borderTop: "1px solid rgba(255, 211, 105, 0.2)",
    padding: "8px 16px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  const subNavBtnStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#FFFFFF",
    cursor: "pointer",
    background: "transparent",
    border: "none",
    fontSize: "16px",
  };

  return (
    <>
      <header style={headerStyle}>
        <div style={containerStyle}>
          {/* Left: Logo */}
          <div
            style={logoStyle}
            onClick={() => setCurrentPage("home")}
          >
            <img
              src="/श्री  Aura.png"
              alt="Logo"
              width={42}
              height={42}
              style={{ borderRadius: "50%" }}
            />
            <span style={logoTextStyle}>ShreeAura</span>
          </div>

          {/* Center: Search (Desktop) */}
          <form style={searchContainerStyle} onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for products, brands and more"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              style={searchInputStyle}
            />
            <div
              style={{
                position: "absolute",
                right: "16px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#FFD369",
                cursor: "pointer",
              }}
              onClick={handleSearch as any}
            >
              <Search size={22} />
            </div>
          </form>

          {/* Right */}
          <div style={rightSectionStyle}>
  {isMobile && (
    <div
      style={searchIconStyle}
      onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
    >
      {isMobileSearchOpen ? (
        <span style={{ display: "flex", alignItems: "center" }}>
          ✖
        </span>
      ) : (
        <Search size={22} />
      )}
    </div>
  )}
  <button
    style={actionButtonStyle}
    onClick={() => setCurrentPage("seller")}
  >
    <Store size={20} />
    <span style={{ display: isMobile ? "none" : "inline" }}>
      Become a Seller
    </span>
  </button>

  {!user ? (
    <button
      style={actionButtonStyle}
      onClick={() => setCurrentPage("login")}
    >
      <LogIn size={20} />
      {!isMobile && <span>Login</span>}
    </button>
  ) : (
    <button style={actionButtonStyle} onClick={logout}>
      <LogIn size={20} />
      {!isMobile && <span>{user.name}</span>}
    </button>
  )}

  <button
    style={{ ...actionButtonStyle, position: "relative" }}
    onClick={() => setCurrentPage("cart")}
  >
    <ShoppingBag size={20} />
    {!isMobile && <span>Cart</span>}
    {getCartCount() > 0 && (
      <span
        style={{
          position: "absolute",
          top: "0px",
          right: "-5px",
          backgroundColor: "#A30B37",
          color: "white",
          fontSize: "12px",
          borderRadius: "50%",
          width: "20px",
          height: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
        }}
      >
        {getCartCount()}
      </span>
    )}
  </button>
</div>
        </div>

        {/* Mobile Search bar below nav */}
{isMobile && isMobileSearchOpen && (
  <form
    style={{
      ...mobileSearchContainer,
      position: "relative", // make sure icon can be positioned absolutely
    }}
    onSubmit={handleSearch}
  >
    <input
      type="text"
      placeholder="Search for products, brands and more"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      style={mobileSearchInputStyle}
    />
    <div
      style={{
        position: "absolute",
        right: "12px",
        top: "50%",
        transform: "translateY(-50%)", // centers the icon vertically
        color: "#FFD369",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%", // ensures it matches the input height
      }}
      onClick={handleSearch as any}
    >
      <Search size={20} />
    </div>
  </form>
)}

        {/* Sub Nav */}
        <div style={subNavStyle}>
          <button
            style={subNavBtnStyle}
            onClick={() => setCurrentPage("home")}
          >
            <Home size={20} color="#FFD369" />
            <span>Home</span>
          </button>
        </div>
      </header>
    </>
  );
}
