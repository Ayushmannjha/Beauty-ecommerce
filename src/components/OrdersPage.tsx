import  { useState } from 'react';
import { motion } from 'motion/react';
import { Package, Truck, CheckCircle, Clock, X, Eye, Download, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { useCart } from '../contexts/CartContext';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type{ Order } from '../contexts/CartContext';
interface OrdersPageProps {
  setCurrentPage: (page: string) => void;
}

export default function OrdersPage({ setCurrentPage }: OrdersPageProps) {
  const { orders } = useCart();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'processing':
        return <Package className="w-4 h-4" />;
      case 'shipped':
        return <Truck className="w-4 h-4" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <X className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500';
      case 'processing':
        return 'bg-blue-500';
      case 'shipped':
        return 'bg-purple-500';
      case 'delivered':
        return 'bg-green-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const filterOrdersByStatus = (status?: string) => {
    if (!status) return orders;
    return orders.filter(order => order.status === status);
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

  const OrderCard = ({ order }: { order: Order }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      className="group"
    >
      <Card className="bg-[#2C1E4A] border-[#FFD369]/20 hover:border-[#FFD369] transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold text-white mb-1">Order #{order.id}</h3>
              <p className="text-sm text-white/70">
                Placed on {new Date(order.orderDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <Badge className={`${getStatusColor(order.status)} text-white flex items-center gap-1`}>
              {getStatusIcon(order.status)}
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </div>

          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-white/70">Items:</span>
              <span className="text-white">{order.items.length} product{order.items.length !== 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70">Total:</span>
              <span className="text-xl font-bold text-[#FFD369]">${order.total.toFixed(2)}</span>
            </div>
            {order.estimatedDelivery && (
              <div className="flex items-center justify-between">
                <span className="text-white/70">Estimated Delivery:</span>
                <span className="text-white">
                  {new Date(order.estimatedDelivery).toLocaleDateString()}
                </span>
              </div>
            )}
          </div>

          <div className="flex space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-[#FFD369] text-[#FFD369] hover:bg-[#FFD369] hover:text-[#1a0f1a]"
                  onClick={() => setSelectedOrder(order)}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View Details
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#2C1E4A] border-[#FFD369]/20 max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-[#FFD369]">Order Details - #{order.id}</DialogTitle>
                  <DialogDescription className="text-white/70">
                    Complete information about your order
                  </DialogDescription>
                </DialogHeader>
                
                {selectedOrder && (
                  <div className="space-y-6">
                    {/* Order Status */}
                    <div className="flex items-center space-x-4">
                      <Badge className={`${getStatusColor(selectedOrder.status)} text-white flex items-center gap-2 px-4 py-2`}>
                        {getStatusIcon(selectedOrder.status)}
                        {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                      </Badge>
                      <div>
                        <p className="text-white">Order placed on {new Date(selectedOrder.orderDate).toLocaleDateString()}</p>
                        {selectedOrder.estimatedDelivery && (
                          <p className="text-white/70 text-sm">
                            Estimated delivery: {new Date(selectedOrder.estimatedDelivery).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Items */}
                    <div>
                      <h4 className="font-semibold text-white mb-3">Items ({selectedOrder.items.length})</h4>
                      <div className="space-y-3">
                        {selectedOrder.items.map((item, index) => (
                          <div key={index} className="flex items-center space-x-4 p-3 bg-[#1a0f1a] rounded-lg">
                            <ImageWithFallback
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-md"
                            />
                            <div className="flex-1">
                              <h5 className="font-medium text-white">{item.name}</h5>
                              {item.brand && <p className="text-sm text-white/70">{item.brand}</p>}
                              <div className="flex items-center space-x-4 mt-1">
                                <span className="text-[#FFD369]">${item.price.toFixed(2)}</span>
                                <span className="text-white/70">Qty: {item.quantity}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-[#1a0f1a] p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-3">Order Summary</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-white/70">Subtotal:</span>
                          <span className="text-white">${selectedOrder.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Shipping:</span>
                          <span className="text-white">
                            {selectedOrder.shipping === 0 ? 'Free' : `$${selectedOrder.shipping.toFixed(2)}`}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-white/70">Tax:</span>
                          <span className="text-white">${selectedOrder.tax.toFixed(2)}</span>
                        </div>
                        <div className="border-t border-[#FFD369]/20 pt-2">
                          <div className="flex justify-between">
                            <span className="font-semibold text-white">Total:</span>
                            <span className="font-bold text-[#FFD369] text-lg">
                              ${selectedOrder.total.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="bg-[#1a0f1a] p-4 rounded-lg">
                      <h4 className="font-semibold text-white mb-3">Shipping Address</h4>
                      <div className="text-white/80">
                        <p>{selectedOrder.shippingAddress.name}</p>
                        <p>{selectedOrder.shippingAddress.street}</p>
                        <p>
                          {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}
                        </p>
                        <p>{selectedOrder.shippingAddress.country}</p>
                      </div>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>

            <Button
              size="sm"
              variant="outline"
              className="border-[#FFD369]/50 text-[#FFD369]/70 hover:bg-[#FFD369]/10"
            >
              <Download className="w-4 h-4 mr-2" />
              Invoice
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#1a0f1a] pt-20 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <Button
                variant="outline"
                onClick={() => setCurrentPage('profile')}
                className="border-[#FFD369] text-[#FFD369] hover:bg-[#FFD369] hover:text-[#1a0f1a]"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Profile
              </Button>
            </div>
            <h1 className="text-4xl font-bold text-[#FFD369] mb-2">My Orders</h1>
            <p className="text-white/70">Track and manage your order history</p>
          </motion.div>

          {orders.length > 0 ? (
            <Tabs defaultValue="all" className="space-y-6">
              <motion.div variants={itemVariants}>
                <TabsList className="grid w-full grid-cols-6 bg-[#2C1E4A] border border-[#FFD369]/20">
                  <TabsTrigger value="all" className="data-[state=active]:bg-[#FFD369] data-[state=active]:text-[#1a0f1a]">
                    All ({orders.length})
                  </TabsTrigger>
                  <TabsTrigger value="pending" className="data-[state=active]:bg-[#FFD369] data-[state=active]:text-[#1a0f1a]">
                    Pending ({filterOrdersByStatus('pending').length})
                  </TabsTrigger>
                  <TabsTrigger value="processing" className="data-[state=active]:bg-[#FFD369] data-[state=active]:text-[#1a0f1a]">
                    Processing ({filterOrdersByStatus('processing').length})
                  </TabsTrigger>
                  <TabsTrigger value="shipped" className="data-[state=active]:bg-[#FFD369] data-[state=active]:text-[#1a0f1a]">
                    Shipped ({filterOrdersByStatus('shipped').length})
                  </TabsTrigger>
                  <TabsTrigger value="delivered" className="data-[state=active]:bg-[#FFD369] data-[state=active]:text-[#1a0f1a]">
                    Delivered ({filterOrdersByStatus('delivered').length})
                  </TabsTrigger>
                  <TabsTrigger value="cancelled" className="data-[state=active]:bg-[#FFD369] data-[state=active]:text-[#1a0f1a]">
                    Cancelled ({filterOrdersByStatus('cancelled').length})
                  </TabsTrigger>
                </TabsList>
              </motion.div>

              <TabsContent value="all" className="space-y-4">
                {orders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </TabsContent>

              <TabsContent value="pending" className="space-y-4">
                {filterOrdersByStatus('pending').map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </TabsContent>

              <TabsContent value="processing" className="space-y-4">
                {filterOrdersByStatus('processing').map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </TabsContent>

              <TabsContent value="shipped" className="space-y-4">
                {filterOrdersByStatus('shipped').map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </TabsContent>

              <TabsContent value="delivered" className="space-y-4">
                {filterOrdersByStatus('delivered').map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </TabsContent>

              <TabsContent value="cancelled" className="space-y-4">
                {filterOrdersByStatus('cancelled').map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </TabsContent>
            </Tabs>
          ) : (
            <motion.div variants={itemVariants}>
              <Card className="bg-[#2C1E4A] border-[#FFD369]/20">
                <CardContent className="text-center py-12">
                  <Package className="w-16 h-16 text-white/30 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">No orders yet</h3>
                  <p className="text-white/70 mb-6">Start shopping to see your orders here</p>
                  <Button
                    className="bg-[#FFD369] text-[#1a0f1a] hover:bg-[#FFD369]/90"
                    onClick={() => setCurrentPage('products')}
                  >
                    Start Shopping
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}