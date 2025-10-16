import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  X,
  Eye,
  Download,
  ArrowLeft
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "./ui/dialog";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { getUserIdFromToken } from "./services/auth";
import { fetchOrders } from "./services/costumer";
import type { OrderResponse } from "./services/costumer";

export interface OrderItem {
  name: string;
  brand?: string;
  price: number;
  quantity: number;
  image: string;
  imageUrl ?: string;
}

export interface ShippingAddress {
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  orderDate: string;
  status: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  estimatedDelivery?: string;
  shippingAddress: ShippingAddress;
}

interface OrdersPageProps {
  setCurrentPage: (page: string) => void;
}

export default function OrdersPage({ setCurrentPage }: OrdersPageProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch orders safely
useEffect(() => {
  const loadOrders = async () => {
    setLoading(true);
    try {
      const userId = getUserIdFromToken() || "";
      const data: OrderResponse[] = await fetchOrders(userId);
      console.log("Raw orders data:", data);

      const mappedOrders: Order[] = data.map((res, idx) => {
        // Safely map products object to OrderItem[]
        const items: OrderItem[] = res.products
          ? Object.entries(res.products).map(([name, quantity]) => ({
              name,
              price: (res.totalPrice / Object.keys(res.products).length) || 0,
              quantity: quantity as number,
              image: "/placeholder.png",
            }))
          : [];

        // Convert numeric status to readable string
        const statusMap: { [key: number]: string } = {
          0: "pending",
          1: "processing",
          2: "shipped",
          3: "delivered",
          4: "cancelled",
        };
        const status = statusMap[res.status] || "pending";

        return {
          id: `ORD-${idx + 1}`,
          orderDate: res.orderTime || new Date().toISOString(),
          status: res.status !== undefined ? status : "pending",
          items: res.products ? items : [],
          subtotal: res.totalPrice || 0,
          shipping: 0,
          tax: 0,
          total: res.totalPrice || 0,
          estimatedDelivery: undefined,
          shippingAddress: {
            name: "N/A",
            street: res.address || "",
            city: "",
            state: "",
            zipCode: "",
            country: "",
          },
        };
      });

      setOrders(mappedOrders);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  loadOrders();
}, []);


  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="w-4 h-4" />;
      case "processing": return <Package className="w-4 h-4" />;
      case "shipped": return <Truck className="w-4 h-4" />;
      case "delivered": return <CheckCircle className="w-4 h-4" />;
      case "cancelled": return <X className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500";
      case "processing": return "bg-blue-500";
      case "shipped": return "bg-purple-500";
      case "delivered": return "bg-green-500";
      case "cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const filterOrdersByStatus = (status?: string) => {
    if (!status) return orders;
    return orders.filter(order => order.status === status);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
  };

  const OrderCard = ({ order }: { order: Order }) => (
    <motion.div variants={itemVariants} whileHover={{ scale: 1.02 }} className="group">
      <Card className="bg-[#2C1E4A] border-[#FFD369]/20 hover:border-[#FFD369] transition-all duration-300">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="font-semibold text-white mb-1">Order #{order.id}</h3>
              <p className="text-sm text-white/70">
                Placed on {new Date(order.orderDate).toLocaleDateString()}
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
              <span className="text-white">{order.items.length} product{order.items.length !== 1 ? "s" : ""}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70">Total:</span>
              <span className="text-xl font-bold text-[#FFD369]">₹{order.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-[#FFD369] text-[#FFD369]"
                  onClick={() => setSelectedOrder(order)}
                >
                  <Eye className="w-4 h-4 mr-2" /> View Details
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
                  <div className="space-y-4">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-4 p-3 bg-[#1a0f1a] rounded-lg">
                        <ImageWithFallback src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-md"/>
                        <div className="flex-1">
                          <h5 className="text-white font-medium">{item.name}</h5>
                          <span className="text-[#FFD369]">₹{item.price.toFixed(2)}</span>
                          <span className="text-white/70 ml-2">Qty: {item.quantity}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </DialogContent>
            </Dialog>

            <Button size="sm" variant="outline" className="border-[#FFD369]/50 text-[#FFD369]/70 hover:bg-[#FFD369]/10">
              <Download className="w-4 h-4 mr-2" /> Invoice
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#1a0f1a] pt-20 pb-12">
      <div className="container mx-auto px-4">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-4xl mx-auto">
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex items-center space-x-4 mb-4">
              <Button variant="outline" onClick={() => setCurrentPage("profile")} className="border-[#FFD369] text-[#FFD369]">
                <ArrowLeft className="w-4 h-4 mr-2"/> Back to Profile
              </Button>
            </div>
            <h1 className="text-4xl font-bold text-[#FFD369] mb-2">My Orders</h1>
            <p className="text-white/70">Track and manage your order history</p>
          </motion.div>

          {loading ? (
            <p className="text-white text-center">Loading orders...</p>
          ) : orders.length > 0 ? (
            <Tabs defaultValue="all" className="space-y-6">
              <motion.div variants={itemVariants}>
                <TabsList className="grid w-full grid-cols-6 bg-[#2C1E4A] border border-[#FFD369]/20">
                  <TabsTrigger value="all">All ({orders.length})</TabsTrigger>
                  <TabsTrigger value="pending">Pending ({filterOrdersByStatus("pending").length})</TabsTrigger>
                  <TabsTrigger value="processing">Processing ({filterOrdersByStatus("processing").length})</TabsTrigger>
                  <TabsTrigger value="shipped">Shipped ({filterOrdersByStatus("shipped").length})</TabsTrigger>
                  <TabsTrigger value="delivered">Delivered ({filterOrdersByStatus("delivered").length})</TabsTrigger>
                  <TabsTrigger value="cancelled">Cancelled ({filterOrdersByStatus("cancelled").length})</TabsTrigger>
                </TabsList>
              </motion.div>

              <TabsContent value="all" className="space-y-4">
                {orders.map(order => <OrderCard key={order.id} order={order}/>)}
              </TabsContent>
              <TabsContent value="pending" className="space-y-4">
                {filterOrdersByStatus("pending").map(order => <OrderCard key={order.id} order={order}/>)}
              </TabsContent>
              <TabsContent value="processing" className="space-y-4">
                {filterOrdersByStatus("processing").map(order => <OrderCard key={order.id} order={order}/>)}
              </TabsContent>
              <TabsContent value="shipped" className="space-y-4">
                {filterOrdersByStatus("shipped").map(order => <OrderCard key={order.id} order={order}/>)}
              </TabsContent>
              <TabsContent value="delivered" className="space-y-4">
                {filterOrdersByStatus("delivered").map(order => <OrderCard key={order.id} order={order}/>)}
              </TabsContent>
              <TabsContent value="cancelled" className="space-y-4">
                {filterOrdersByStatus("cancelled").map(order => <OrderCard key={order.id} order={order}/>)}
              </TabsContent>
            </Tabs>
          ) : (
            <motion.div variants={itemVariants}>
              <Card className="bg-[#2C1E4A] border-[#FFD369]/20">
                <CardContent className="text-center py-12">
                  <Package className="w-16 h-16 text-white/30 mx-auto mb-4"/>
                  <h3 className="text-xl font-semibold text-white mb-2">No orders yet</h3>
                  <p className="text-white/70 mb-6">Start shopping to see your orders here</p>
                  <Button className="bg-[#FFD369] text-[#1a0f1a]" onClick={() => setCurrentPage("products")}>
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
