import  { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Plus, Minus, Heart, ShoppingBag, Tag, Truck, CreditCard, Shield, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

interface CartPageProps {
  setCurrentPage: (page: string) => void;
}

export default function CartPage({ setCurrentPage }: CartPageProps) {
  const { items, updateQuantity, removeFromCart, getCartTotal, checkout } = useCart();
  const { user } = useAuth();
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<any>(null);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [shippingInfo, setShippingInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zipCode: user?.address?.zipCode || '',
    country: user?.address?.country || 'USA'
  });
  const [paymentInfo, setPaymentInfo] = useState({
    type: 'card' as 'card' | 'paypal' | 'apple_pay',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'save20') {
      setAppliedPromo({ code: 'SAVE20', discount: 20, type: 'percentage' });
      toast.success('Promo code applied! 20% off your order');
    } else if (promoCode.toLowerCase() === 'free10') {
      setAppliedPromo({ code: 'FREE10', discount: 10, type: 'fixed' });
      toast.success('Promo code applied! $10 off your order');
    } else {
      setAppliedPromo(null);
      toast.error('Invalid promo code');
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoCode('');
    toast.info('Promo code removed');
  };

  const subtotal = getCartTotal();
  const shipping = subtotal > 75 ? 0 : 8.99;
  const tax = subtotal * 0.08;
  
  let discount = 0;
  if (appliedPromo) {
    discount = appliedPromo.type === 'percentage' 
      ? subtotal * (appliedPromo.discount / 100)
      : appliedPromo.discount;
  }
  
  const total = subtotal + shipping + tax - discount;

  const handleCheckout = async () => {
    if (!user) {
      toast.error('Please sign in to checkout');
      setCurrentPage('login');
      return;
    }

    if (!shippingInfo.name || !shippingInfo.email || !shippingInfo.street || !shippingInfo.city) {
      toast.error('Please fill in all shipping information');
      return;
    }

    if (paymentInfo.type === 'card' && (!paymentInfo.cardNumber || !paymentInfo.expiryDate || !paymentInfo.cvv)) {
      toast.error('Please fill in all payment information');
      return;
    }

    setIsCheckingOut(true);

    try {
      const orderId = await checkout(shippingInfo, paymentInfo);
      toast.success(`Order placed successfully! Order ID: ${orderId}`);
      setShowCheckout(false);
      setCurrentPage('orders');
    } catch (error) {
      toast.error('Checkout failed. Please try again.');
    } finally {
      setIsCheckingOut(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#1a0f1a] flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center space-y-6"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ShoppingBag className="w-24 h-24 text-[#FFD369] mx-auto" />
          </motion.div>
          <h2 className="text-3xl font-bold text-white">Your cart is empty</h2>
          <p className="text-white/70 max-w-md">
            Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
          </p>
          <Button 
            className="bg-[#FFD369] text-[#1a0f1a] hover:bg-[#FFD369]/90 px-8 py-3"
            onClick={() => setCurrentPage('home')}
          >
            Continue Shopping
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a0f1a] pt-20 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <Button
                variant="outline"
                onClick={() => setCurrentPage('home')}
                className="border-[#FFD369] text-[#FFD369] hover:bg-[#FFD369] hover:text-[#1a0f1a]"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </div>
            <h1 className="text-4xl font-bold text-[#FFD369] mb-4">Shopping Cart</h1>
            <p className="text-white/80">{items.length} item{items.length !== 1 ? 's' : ''} in your cart</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {items.map((item) => (
                  <motion.div
                    key={`${item.id}-${item.color}-${item.size}`}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ x: -300, opacity: 0 }}
                    layout
                  >
                    <Card className="bg-[#2C1E4A] border-[#FFD369]/20 hover:border-[#FFD369] transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                          <div className="flex-shrink-0">
                            <ImageWithFallback
                              src={item.image}
                              alt={item.name}
                              className="w-full sm:w-24 h-32 sm:h-24 object-cover rounded-lg"
                            />
                          </div>

                          <div className="flex-1 space-y-3">
                            <div>
                              {item.brand && <p className="text-sm text-[#FFD369]">{item.brand}</p>}
                              <h3 className="font-semibold text-white text-lg">{item.name}</h3>
                              {item.color && <p className="text-sm text-white/70">Color: {item.color}</p>}
                              {item.size && <p className="text-sm text-white/70">Size: {item.size}</p>}
                              {!item.inStock && (
                                <p className="text-sm text-red-400 font-medium">Currently out of stock</p>
                              )}
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-3 sm:space-y-0">
                              <div className="flex items-center space-x-2">
                                <span className="text-xl font-bold text-[#FFD369]">
                                  ${item.price.toFixed(2)}
                                </span>
                                {item.originalPrice && item.originalPrice > item.price && (
                                  <span className="text-sm text-white/50 line-through">
                                    ${item.originalPrice.toFixed(2)}
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center space-x-4">
                                <div className="flex items-center bg-[#4B1C3F] rounded-lg">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="text-white hover:text-[#FFD369] h-8 w-8"
                                  >
                                    <Minus className="w-4 h-4" />
                                  </Button>
                                  <span className="px-3 py-1 text-white min-w-[2rem] text-center">
                                    {item.quantity}
                                  </span>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="text-white hover:text-[#FFD369] h-8 w-8"
                                    disabled={!item.inStock}
                                  >
                                    <Plus className="w-4 h-4" />
                                  </Button>
                                </div>

                                <span className="font-semibold text-white">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            </div>

                            <div className="flex space-x-3">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-[#FFD369] hover:text-white p-0"
                              >
                                <Heart className="w-4 h-4 mr-1" />
                                Save for Later
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  removeFromCart(item.id);
                                  toast.success('Item removed from cart');
                                }}
                                className="text-red-400 hover:text-red-300 p-0"
                              >
                                <Trash2 className="w-4 h-4 mr-1" />
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <Card className="bg-[#2C1E4A] border-[#FFD369]/20 sticky top-24">
                <CardContent className="p-6 space-y-6">
                  <h2 className="text-2xl font-bold text-[#FFD369]">Order Summary</h2>

                  {/* Promo Code */}
                  <div className="space-y-3">
                    <div className="flex space-x-2">
                      <Input
                        type="text"
                        placeholder="Promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="bg-[#4B1C3F] border-[#FFD369]/30 text-white placeholder:text-white/60"
                      />
                      <Button 
                        onClick={applyPromoCode}
                        className="bg-[#FFD369] text-[#1a0f1a] hover:bg-[#FFD369]/90"
                      >
                        Apply
                      </Button>
                    </div>
                    
                    {appliedPromo && (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center justify-between bg-green-600/20 border border-green-600/30 rounded-lg p-3"
                      >
                        <div className="flex items-center space-x-2">
                          <Tag className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 text-sm">{appliedPromo.code} applied</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={removePromoCode}
                          className="text-green-400 hover:text-green-300 p-0"
                        >
                          Remove
                        </Button>
                      </motion.div>
                    )}
                  </div>

                  <Separator className="bg-white/20" />

                  {/* Price Breakdown */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-white">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between text-white">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    
                    <div className="flex justify-between text-white">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    
                    {appliedPromo && (
                      <div className="flex justify-between text-green-400">
                        <span>Discount</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  <Separator className="bg-white/20" />

                  <div className="flex justify-between text-xl font-bold text-[#FFD369]">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  {/* Shipping Info */}
                  {shipping > 0 && (
                    <div className="bg-[#B85C38]/20 border border-[#B85C38]/30 rounded-lg p-3">
                      <p className="text-sm text-[#B85C38]">
                        Add ${(75 - subtotal).toFixed(2)} more for free shipping!
                      </p>
                    </div>
                  )}

                  {/* Checkout Button */}
                  <Dialog open={showCheckout} onOpenChange={setShowCheckout}>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-[#FFD369] text-[#1a0f1a] hover:bg-[#FFD369]/90 py-3">
                        Proceed to Checkout
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-[#2C1E4A] border-[#FFD369]/20 max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-[#FFD369]">Checkout</DialogTitle>
                        <DialogDescription className="text-white/70">
                          Complete your order
                        </DialogDescription>
                      </DialogHeader>
                      
                      <div className="space-y-6">
                        {/* Shipping Information */}
                        <div className="space-y-4">
                          <h3 className="font-semibold text-white">Shipping Information</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-white">Full Name</Label>
                              <Input
                                value={shippingInfo.name}
                                onChange={(e) => setShippingInfo({...shippingInfo, name: e.target.value})}
                                className="bg-[#1a0f1a] border-[#FFD369]/30 text-white"
                              />
                            </div>
                            <div>
                              <Label className="text-white">Email</Label>
                              <Input
                                type="email"
                                value={shippingInfo.email}
                                onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                                className="bg-[#1a0f1a] border-[#FFD369]/30 text-white"
                              />
                            </div>
                            <div>
                              <Label className="text-white">Phone</Label>
                              <Input
                                value={shippingInfo.phone}
                                onChange={(e) => setShippingInfo({...shippingInfo, phone: e.target.value})}
                                className="bg-[#1a0f1a] border-[#FFD369]/30 text-white"
                              />
                            </div>
                            <div>
                              <Label className="text-white">Street Address</Label>
                              <Input
                                value={shippingInfo.street}
                                onChange={(e) => setShippingInfo({...shippingInfo, street: e.target.value})}
                                className="bg-[#1a0f1a] border-[#FFD369]/30 text-white"
                              />
                            </div>
                            <div>
                              <Label className="text-white">City</Label>
                              <Input
                                value={shippingInfo.city}
                                onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                                className="bg-[#1a0f1a] border-[#FFD369]/30 text-white"
                              />
                            </div>
                            <div>
                              <Label className="text-white">State</Label>
                              <Input
                                value={shippingInfo.state}
                                onChange={(e) => setShippingInfo({...shippingInfo, state: e.target.value})}
                                className="bg-[#1a0f1a] border-[#FFD369]/30 text-white"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Payment Information */}
                        <div className="space-y-4">
                          <h3 className="font-semibold text-white">Payment Method</h3>
                          <Select value={paymentInfo.type} onValueChange={(value: any) => setPaymentInfo({...paymentInfo, type: value})}>
                            <SelectTrigger className="bg-[#1a0f1a] border-[#FFD369]/30 text-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-[#2C1E4A] border-[#FFD369]/20">
                              <SelectItem value="card">Credit/Debit Card</SelectItem>
                              <SelectItem value="paypal">PayPal</SelectItem>
                              <SelectItem value="apple_pay">Apple Pay</SelectItem>
                            </SelectContent>
                          </Select>

                          {paymentInfo.type === 'card' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="md:col-span-2">
                                <Label className="text-white">Card Number</Label>
                                <Input
                                  placeholder="1234 5678 9012 3456"
                                  value={paymentInfo.cardNumber}
                                  onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                                  className="bg-[#1a0f1a] border-[#FFD369]/30 text-white"
                                />
                              </div>
                              <div>
                                <Label className="text-white">Expiry Date</Label>
                                <Input
                                  placeholder="MM/YY"
                                  value={paymentInfo.expiryDate}
                                  onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                                  className="bg-[#1a0f1a] border-[#FFD369]/30 text-white"
                                />
                              </div>
                              <div>
                                <Label className="text-white">CVV</Label>
                                <Input
                                  placeholder="123"
                                  value={paymentInfo.cvv}
                                  onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                                  className="bg-[#1a0f1a] border-[#FFD369]/30 text-white"
                                />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Order Summary */}
                        <div className="bg-[#1a0f1a] p-4 rounded-lg">
                          <h4 className="font-semibold text-white mb-3">Order Summary</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-white/70">Subtotal:</span>
                              <span className="text-white">${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/70">Shipping:</span>
                              <span className="text-white">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-white/70">Tax:</span>
                              <span className="text-white">${tax.toFixed(2)}</span>
                            </div>
                            {appliedPromo && (
                              <div className="flex justify-between">
                                <span className="text-green-400">Discount:</span>
                                <span className="text-green-400">-${discount.toFixed(2)}</span>
                              </div>
                            )}
                            <div className="border-t border-[#FFD369]/20 pt-2">
                              <div className="flex justify-between font-bold">
                                <span className="text-white">Total:</span>
                                <span className="text-[#FFD369]">${total.toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <Button
                          onClick={handleCheckout}
                          disabled={isCheckingOut}
                          className="w-full bg-[#FFD369] text-[#1a0f1a] hover:bg-[#FFD369]/90"
                        >
                          {isCheckingOut ? (
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-[#1a0f1a] border-t-transparent rounded-full mr-2"
                            />
                          ) : (
                            <CheckCircle className="w-5 h-5 mr-2" />
                          )}
                          {isCheckingOut ? 'Processing...' : 'Place Order'}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>

                  {/* Security Features */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-white/80">
                      <Shield className="w-4 h-4 text-[#FFD369]" />
                      <span className="text-sm">Secure 256-bit SSL encryption</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-white/80">
                      <Truck className="w-4 h-4 text-[#FFD369]" />
                      <span className="text-sm">Free shipping on orders over $75</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 text-white/80">
                      <CreditCard className="w-4 h-4 text-[#FFD369]" />
                      <span className="text-sm">Multiple payment options</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}