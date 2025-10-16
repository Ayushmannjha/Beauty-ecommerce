import React, { useEffect, useState, useRef } from "react";
import { Search, ShoppingBag, Store, LogIn, User } from "lucide-react";
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { getCartCount } = useCart();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;
    try {
      const response = await HomePageApi.searchProductsByName(query);
      console.log("Search results:", response.data);
      setCurrentPage("search", { name: query });
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
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setCurrentPage("home");
  };

  // ================= STYLES =================
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
    borderRadius: "15px",
    outline: "none",
    transition: "0.3s",
  };

  const mobileSearchContainer: React.CSSProperties = {
    display: isMobile ? "block" : "none",
    padding: "10px 16px",
    backgroundColor: "rgba(75, 28, 63, 0.95)",
  };

  const mobileSearchInputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 48px 12px 20px",
    fontSize: "16px",
    backgroundColor: "rgba(33, 21, 57, 0.95)",
    border: "1px solid rgba(255, 211, 105, 0.3)",
    color: "#FFD369",
    borderRadius: "15px",
    outline: "none",
    boxShadow: "0 0 10px rgba(255, 211, 105, 0.05) inset",
    transition: "all 0.2s ease",
  };

  const mobileSearchIconStyle: React.CSSProperties = {
    position: "absolute",
    right: "20px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#FFD369",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.8,
  };

  const rightSectionStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    position: "relative",
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

  const dropdownStyle: React.CSSProperties = {
  position: "absolute",
  top: "50px",
  right: 0,
  background: "rgba(33, 21, 57, 0.98)",
  border: "1px solid rgba(255, 211, 105, 0.3)",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
  display: showDropdown ? "block" : "none",
  minWidth: "180px",
  zIndex: 2000,   // 👈 this line is key
};


  const dropdownItemStyle: React.CSSProperties = {
    padding: "12px 16px",
    color: "#FFD369",
    cursor: "pointer",
    fontSize: "15px",
    background: "transparent",
    border: "none",
    textAlign: "left",
    width: "100%",
  };

  const dropdownItemHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    (e.target as HTMLElement).style.background = "rgba(255, 211, 105, 0.15)";
  };
  const dropdownItemLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    (e.target as HTMLElement).style.background = "transparent";
  };

  // ================== RENDER ==================
  return (
    <>
      <header style={headerStyle}>
        <div style={containerStyle}>
          {/* Logo */}
          <div style={logoStyle} onClick={() => setCurrentPage("home")}>
            <img
              src="/श्री  Aura.png"
              alt="Logo"
              width={42}
              height={42}
              style={{ borderRadius: "50%" }}
            />
            <span style={logoTextStyle}>ShreeAura</span>
          </div>

          {/* Search */}
          <form style={searchContainerStyle} onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search for products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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

          {/* Right section */}
          <div style={rightSectionStyle}>
            <button
              style={actionButtonStyle}
              onClick={() => setCurrentPage("seller")}
            >
              <Store size={20} />
              {!isMobile && <span>Become a Seller</span>}
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
              <div style={{ position: "relative" }} ref={dropdownRef}>
                <button
                  style={actionButtonStyle}
                  onClick={() => setShowDropdown((prev) => !prev)}
                >
                  <User size={20} />
                  {!isMobile && <span>{user.name}</span>}
                </button>
                <div style={dropdownStyle}>
                  <button
                    style={dropdownItemStyle}
                    onMouseEnter={dropdownItemHover}
                    onMouseLeave={dropdownItemLeave}
                    onClick={() => setCurrentPage("profile")}
                  >
                    Profile
                  </button>
                  <button
                    style={dropdownItemStyle}
                    onMouseEnter={dropdownItemHover}
                    onMouseLeave={dropdownItemLeave}
                    onClick={() => setCurrentPage("orders")}
                  >
                    My Orders
                  </button>
                  <button
                    style={dropdownItemStyle}
                    onMouseEnter={dropdownItemHover}
                    onMouseLeave={dropdownItemLeave}
                    onClick={logout}
                  >
                    Logout
                  </button>
                </div>
              </div>
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

        {/* Mobile search bar */}
        {isMobile && (
          <form
            style={{ ...mobileSearchContainer, position: "relative" }}
            onSubmit={handleSearch}
          >
            <input
              type="text"
              placeholder="Search for products"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={mobileSearchInputStyle}
            />
            <div style={mobileSearchIconStyle} onClick={handleSearch as any}>
              <Search size={20} />
            </div>
          </form>
        )}
      </header>
    </>
  );
}
