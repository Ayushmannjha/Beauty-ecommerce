
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, Youtube } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';

export default function Footer() {
  return (
    <footer className="bg-[#A30B37] text-[#FFD369]">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white">LuxeBeauty</h3>
            <p className="text-sm text-[#FFD369]/80">
              Your destination for premium beauty and cosmetics. Discover luxury products that enhance your natural beauty.
            </p>
            <div className="flex space-x-4">
              <Instagram className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
              <Facebook className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
              <Twitter className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
              <Youtube className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Beauty Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gift Cards</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Store Locator</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Customer Care</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Stay Updated</h4>
            <p className="text-sm text-[#FFD369]/80">
              Subscribe to get special offers and beauty tips
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-[#4B1C3F] border-[#FFD369]/30 text-white placeholder-[#FFD369]/60"
              />
              <Button className="bg-[#FFD369] text-[#A30B37] hover:bg-[#FFD369]/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 pt-8 border-t border-[#FFD369]/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>hello@luxebeauty.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4" />
              <span>123 Beauty Street, NY 10001</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#FFD369]/20 bg-[#4B1C3F]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-[#FFD369]/80">
              © 2025 LuxeBeauty. All rights reserved.
            </div>
            
            {/* Payment Methods */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-[#FFD369]/80">We Accept:</span>
              <div className="flex space-x-2">
                <div className="w-8 h-5 bg-[#FFD369] rounded text-xs flex items-center justify-center text-[#4B1C3F] font-semibold">
                  VISA
                </div>
                <div className="w-8 h-5 bg-[#FFD369] rounded text-xs flex items-center justify-center text-[#4B1C3F] font-semibold">
                  MC
                </div>
                <div className="w-8 h-5 bg-[#FFD369] rounded text-xs flex items-center justify-center text-[#4B1C3F] font-semibold">
                  AMEX
                </div>
              </div>
            </div>

            <div className="flex space-x-4 text-sm">
              <a href="#" className="text-[#FFD369]/80 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-[#FFD369]/80 hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}