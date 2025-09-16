import  { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, User, Heart, ShoppingBag, Menu, ChevronDown, LogOut, Settings, Package, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export default function Header({ currentPage, setCurrentPage }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();

  const categories = [
    { name: 'Makeup', items: ['Lipstick', 'Foundation', 'Eyeshadow', 'Mascara'], icon: '💄' },
    { name: 'Skincare', items: ['Cleansers', 'Serums', 'Moisturizers', 'Sunscreen'], icon: '🧴' },
    { name: 'Fragrance', items: ['Perfume', 'Body Spray', 'Deodorant'], icon: '🌸' },
    { name: 'Hair Care', items: ['Shampoo', 'Conditioner', 'Hair Oil', 'Hair Mask'], icon: '💆‍♀️' },
    { name: 'Bath & Body', items: ['Body Wash', 'Body Lotion', 'Bath Bombs'], icon: '🛁' }
  ];

  const navItems = [
    { name: 'Home', page: 'home' },
    { name: 'All Products', page: 'products' },
    { name: 'Product Detail', page: 'product-detail' },
  ];

  return (
    <motion.header 
      className="bg-[#4B1C3F]/95 border-b border-[#FFD369]/20 sticky top-0 z-50 backdrop-blur-xl"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4">
        {/* Enhanced Top bar */}
        <motion.div 
          className="flex items-center justify-between py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Animated Logo */}
          <motion.div 
            className="flex items-center cursor-pointer"
            onClick={() => setCurrentPage('home')}
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
              className="text-3xl font-bold text-[#FFD369]"
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              LuxeBeauty
            </motion.h1>
          </motion.div>

          {/* Enhanced Search Bar */}
          <motion.div 
            className="hidden md:flex flex-1 max-w-lg mx-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative w-full group">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#FFD369]/20 to-[#A30B37]/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <Input
                type="text"
                placeholder="Search for products, brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#2C1E4A]/80 border-[#FFD369]/30 text-white placeholder:text-gray-300 pr-12 py-3 rounded-lg relative z-10 backdrop-blur-sm"
              />
              <motion.div
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
              >
                <Search className="text-[#FFD369] w-5 h-5 cursor-pointer" />
              </motion.div>
            </div>
          </motion.div>

          {/* Enhanced Right Icons */}
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {/* Mobile Search Icon */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button variant="ghost" size="icon" className="md:hidden text-[#FFD369] hover:bg-[#2C1E4A]">
                <Search className="w-5 h-5" />
              </Button>
            </motion.div>
            
            {/* Enhanced User Avatar/Login */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button variant="ghost" className="relative h-12 w-12 rounded-full">
                      <motion.div
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FFD369]/20 to-[#A30B37]/20"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      />
                      <Avatar className="h-10 w-10 relative z-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback className="bg-[#FFD369] text-[#1a0f1a]">
                          {user.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </motion.div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-[#2C1E4A]/95 border-[#FFD369]/20 backdrop-blur-xl" align="end" forceMount>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-start gap-2 p-2"
                  >
                    <div className="flex flex-col space-y-1 leading-none">
                      <p className="font-medium text-[#FFD369]">{user.name}</p>
                      <p className="w-[200px] truncate text-sm text-white/70">
                        {user.email}
                      </p>
                    </div>
                  </motion.div>
                  <DropdownMenuSeparator className="bg-[#FFD369]/20" />
                  <DropdownMenuItem 
                    className="text-white hover:bg-[#FFD369]/20 focus:bg-[#FFD369]/20 cursor-pointer"
                    onClick={() => setCurrentPage('profile')}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-white hover:bg-[#FFD369]/20 focus:bg-[#FFD369]/20 cursor-pointer"
                    onClick={() => setCurrentPage('orders')}
                  >
                    <Package className="mr-2 h-4 w-4" />
                    Orders
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-[#FFD369]/20 focus:bg-[#FFD369]/20 cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-[#FFD369]/20" />
                  <DropdownMenuItem 
                    className="text-red-400 hover:bg-red-500/20 focus:bg-red-500/20 cursor-pointer"
                    onClick={logout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-[#FFD369] hover:bg-[#2C1E4A] relative"
                  onClick={() => setCurrentPage('login')}
                >
                  <motion.div
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <User className="w-5 h-5" />
                  </motion.div>
                </Button>
              </motion.div>
            )}
            
            {/* Enhanced Wishlist */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button variant="ghost" size="icon" className="text-[#FFD369] hover:bg-[#2C1E4A] relative">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Heart className="w-5 h-5" />
                </motion.div>
                <motion.span 
                  className="absolute -top-1 -right-1 bg-[#A30B37] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  whileHover={{ scale: 1.2 }}
                >
                  3
                </motion.span>
              </Button>
            </motion.div>
            
            {/* Enhanced Cart */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-[#FFD369] hover:bg-[#2C1E4A] relative"
                onClick={() => setCurrentPage('cart')}
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  <ShoppingBag className="w-5 h-5" />
                  <AnimatePresence>
                    {getCartCount() > 0 && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        key={getCartCount()}
                        className="absolute -top-1 -right-1 bg-[#A30B37] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                        whileHover={{ scale: 1.2 }}
                      >
                        {getCartCount()}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Button>
            </motion.div>

            {/* Enhanced Mobile Menu Button */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden text-[#FFD369] hover:bg-[#2C1E4A]"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <motion.div
                  animate={{ rotate: isMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced Navigation */}
        <AnimatePresence>
          <motion.nav 
            className={`${isMenuOpen ? 'block' : 'hidden'} md:block pb-4`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col md:flex-row md:items-center md:space-x-8 space-y-2 md:space-y-0">
              {/* Enhanced Categories */}
              {categories.map((category, index) => (
                <motion.div 
                  key={category.name} 
                  className="relative group"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <motion.button 
                    className="flex items-center space-x-2 text-white hover:text-[#FFD369] transition-colors py-2 px-3 rounded-lg hover:bg-[#2C1E4A]/50"
                    whileHover={{ scale: 1.05 }}
                  >
                    <span className="text-lg">{category.icon}</span>
                    <span>{category.name}</span>
                    <motion.div
                      animate={{ rotate: 0 }}
                      whileHover={{ rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </motion.button>
                  
                  {/* Enhanced Dropdown */}
                  <motion.div 
                    className="absolute top-full left-0 mt-2 w-56 bg-[#2C1E4A]/95 border border-[#FFD369]/20 rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 backdrop-blur-xl"
                    initial={{ y: -10, scale: 0.95 }}
                    whileHover={{ y: 0, scale: 1 }}
                  >
                    <div className="py-3">
                      {category.items.map((item, itemIndex) => (
                        <motion.a
                          key={item}
                          href="#"
                          className="block px-4 py-3 text-sm text-white hover:bg-[#4B1C3F] hover:text-[#FFD369] transition-all duration-200 rounded-lg mx-2"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: itemIndex * 0.05 }}
                          whileHover={{ x: 5, backgroundColor: 'rgba(75, 28, 63, 0.8)' }}
                        >
                          {item}
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
              
              {/* Enhanced Nav Items */}
              {navItems.map((item, index) => (
                <motion.button
                  key={item.page}
                  onClick={() => setCurrentPage(item.page)}
                  className={`transition-all duration-300 py-2 px-4 rounded-lg ${
                    currentPage === item.page 
                      ? 'text-[#FFD369] bg-[#FFD369]/10' 
                      : 'text-white hover:text-[#FFD369] hover:bg-[#2C1E4A]/50'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: (categories.length + index) * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.button>
              ))}

              <motion.a 
                href="#" 
                className="text-[#A30B37] hover:text-[#FFD369] transition-colors font-medium py-2 px-4 rounded-lg hover:bg-[#A30B37]/10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                whileHover={{ scale: 1.1 }}
              >
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🔥 Sale
                </motion.span>
              </motion.a>
            </div>
          </motion.nav>
        </AnimatePresence>

        {/* Enhanced Mobile Search Bar */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              className="md:hidden pb-4"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for products, brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#2C1E4A]/80 border-[#FFD369]/30 text-white placeholder:text-gray-300 pr-12 py-3 rounded-lg backdrop-blur-sm"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#FFD369] w-5 h-5" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}