import { useState } from "react";
import { motion } from "motion/react";
import {
  Camera,
  Edit,
  Save,
  X,
  Settings,
  Package,
  Heart,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Switch } from "./ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { toast } from "sonner";

interface ProfilePageProps {
  setCurrentPage: (page: string) => void;
}

// ✅ Define User type
interface User {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
  };
  preferences?: {
    newsletter?: boolean;
    smsNotifications?: boolean;
  };
}

// ✅ Define Order type
interface Order {
  id: string;
  orderDate: string;
  total: number;
  status: "delivered" | "shipped" | "processing" | "pending";
}

export default function ProfilePage({ setCurrentPage }: ProfilePageProps) {
  const { user, updateProfile, logout } = useAuth() as {
    user: User | null;
    updateProfile: (u: User) => void;
    logout: () => void;
  };

  const { orders } = useCart() as { orders: Order[] };

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState<User>(user || {});

  const handleInputChange = (field: string, value: any) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".") as [keyof User, string];
      setEditedUser((prev) => ({
        ...prev,
        [parent]: {
          ...(prev[parent] as Record<string, any>),
          [child]: value,
        },
      }));
    } else {
      setEditedUser((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSave = () => {
    updateProfile(editedUser);
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    setEditedUser(user || {});
    setIsEditing(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 },
    },
  };

  const recentOrders = orders.slice(0, 3);
  const wishlistItems = 5; // mock data

  return (
    <div className="min-h-screen bg-[#1a0f1a] pt-20 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-[#FFD369] mb-2">
                  My Profile
                </h1>
                <p className="text-white/70">
                  Manage your account and preferences
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setCurrentPage("home")}
                className="border-[#FFD369] text-[#FFD369] hover:bg-[#FFD369] hover:text-[#1a0f1a]"
              >
                Back to Home
              </Button>
            </div>
          </motion.div>

          <Tabs defaultValue="profile" className="space-y-6">
            <motion.div variants={itemVariants}>
              <TabsList className="grid w-full grid-cols-4 bg-[#2C1E4A] border border-[#FFD369]/20">
                <TabsTrigger
                  value="profile"
                  className="data-[state=active]:bg-[#FFD369] data-[state=active]:text-[#1a0f1a]"
                >
                  Profile
                </TabsTrigger>
                <TabsTrigger
                  value="orders"
                  className="data-[state=active]:bg-[#FFD369] data-[state=active]:text-[#1a0f1a]"
                >
                  Orders
                </TabsTrigger>
                <TabsTrigger
                  value="wishlist"
                  className="data-[state=active]:bg-[#FFD369] data-[state=active]:text-[#1a0f1a]"
                >
                  Wishlist
                </TabsTrigger>
                <TabsTrigger
                  value="settings"
                  className="data-[state=active]:bg-[#FFD369] data-[state=active]:text-[#1a0f1a]"
                >
                  Settings
                </TabsTrigger>
              </TabsList>
            </motion.div>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <motion.div variants={itemVariants}>
                <Card className="bg-[#2C1E4A] border-[#FFD369]/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-[#FFD369]">
                        Personal Information
                      </CardTitle>
                      {!isEditing ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsEditing(true)}
                          className="border-[#FFD369] text-[#FFD369] hover:bg-[#FFD369] hover:text-[#1a0f1a]"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      ) : (
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={handleCancel}
                            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            onClick={handleSave}
                            className="bg-[#FFD369] text-[#1a0f1a] hover:bg-[#FFD369]/90"
                          >
                            <Save className="w-4 h-4 mr-2" />
                            Save
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Avatar Section */}
                    <div className="flex items-center space-x-6">
                      <div className="relative">
                        <Avatar className="w-24 h-24">
                          <AvatarImage src={user?.avatar} />
                          <AvatarFallback className="bg-[#FFD369] text-[#1a0f1a] text-2xl">
                            {user?.name?.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        {isEditing && (
                          <Button
                            size="icon"
                            className="absolute -bottom-2 -right-2 rounded-full bg-[#FFD369] text-[#1a0f1a] hover:bg-[#FFD369]/90 w-8 h-8"
                          >
                            <Camera className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {user?.name}
                        </h3>
                        <p className="text-white/70">{user?.email}</p>
                        <Badge className="mt-2 bg-[#FFD369] text-[#1a0f1a]">
                          Premium Member
                        </Badge>
                      </div>
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label className="text-white">Full Name</Label>
                        {isEditing ? (
                          <Input
                            value={editedUser.name || ""}
                            onChange={(e) =>
                              handleInputChange("name", e.target.value)
                            }
                            className="bg-[#1a0f1a] border-[#FFD369]/30 text-white"
                          />
                        ) : (
                          <div className="p-3 bg-[#1a0f1a] rounded-md text-white border border-[#FFD369]/30">
                            {user?.name}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white">Email Address</Label>
                        {isEditing ? (
                          <Input
                            value={editedUser.email || ""}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            className="bg-[#1a0f1a] border-[#FFD369]/30 text-white"
                          />
                        ) : (
                          <div className="p-3 bg-[#1a0f1a] rounded-md text-white border border-[#FFD369]/30">
                            {user?.email}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white">Phone Number</Label>
                        {isEditing ? (
                          <Input
                            value={editedUser.phone || ""}
                            onChange={(e) =>
                              handleInputChange("phone", e.target.value)
                            }
                            className="bg-[#1a0f1a] border-[#FFD369]/30 text-white"
                          />
                        ) : (
                          <div className="p-3 bg-[#1a0f1a] rounded-md text-white border border-[#FFD369]/30">
                            {user?.phone || "Not provided"}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white">Street Address</Label>
                        {isEditing ? (
                          <Input
                            value={editedUser.address?.street || ""}
                            onChange={(e) =>
                              handleInputChange("address.street", e.target.value)
                            }
                            className="bg-[#1a0f1a] border-[#FFD369]/30 text-white"
                          />
                        ) : (
                          <div className="p-3 bg-[#1a0f1a] rounded-md text-white border border-[#FFD369]/30">
                            {user?.address?.street || "Not provided"}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white">City</Label>
                        {isEditing ? (
                          <Input
                            value={editedUser.address?.city || ""}
                            onChange={(e) =>
                              handleInputChange("address.city", e.target.value)
                            }
                            className="bg-[#1a0f1a] border-[#FFD369]/30 text-white"
                          />
                        ) : (
                          <div className="p-3 bg-[#1a0f1a] rounded-md text-white border border-[#FFD369]/30">
                            {user?.address?.city || "Not provided"}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label className="text-white">State</Label>
                        {isEditing ? (
                          <Input
                            value={editedUser.address?.state || ""}
                            onChange={(e) =>
                              handleInputChange("address.state", e.target.value)
                            }
                            className="bg-[#1a0f1a] border-[#FFD369]/30 text-white"
                          />
                        ) : (
                          <div className="p-3 bg-[#1a0f1a] rounded-md text-white border border-[#FFD369]/30">
                            {user?.address?.state || "Not provided"}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders" className="space-y-6">
              <motion.div variants={itemVariants}>
                <Card className="bg-[#2C1E4A] border-[#FFD369]/20">
                  <CardHeader>
                    <CardTitle className="text-[#FFD369] flex items-center">
                      <Package className="w-5 h-5 mr-2" />
                      Recent Orders
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      Track and manage your orders
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {recentOrders.length > 0 ? (
                      <div className="space-y-4">
                        {recentOrders.map((order) => (
                          <motion.div
                            key={order.id}
                            whileHover={{ scale: 1.02 }}
                            className="bg-[#1a0f1a] p-4 rounded-lg border border-[#FFD369]/20"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold text-white">
                                  Order #{order.id}
                                </h4>
                                <p className="text-sm text-white/70">
                                  {new Date(order.orderDate).toLocaleDateString()}
                                </p>
                                <p className="text-lg font-bold text-[#FFD369]">
                                  ${order.total.toFixed(2)}
                                </p>
                              </div>
                              <Badge
                                className={`${
                                  order.status === "delivered"
                                    ? "bg-green-500"
                                    : order.status === "shipped"
                                    ? "bg-blue-500"
                                    : order.status === "processing"
                                    ? "bg-yellow-500"
                                    : "bg-gray-500"
                                } text-white`}
                              >
                                {order.status.charAt(0).toUpperCase() +
                                  order.status.slice(1)}
                              </Badge>
                            </div>
                            <div className="mt-3 flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-[#FFD369] text-[#FFD369] hover:bg-[#FFD369] hover:text-[#1a0f1a]"
                                onClick={() => setCurrentPage("orders")}
                              >
                                View Details
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Package className="w-16 h-16 text-white/30 mx-auto mb-4" />
                        <p className="text-white/70">No orders yet</p>
                        <Button
                          className="mt-4 bg-[#FFD369] text-[#1a0f1a] hover:bg-[#FFD369]/90"
                          onClick={() => setCurrentPage("products")}
                        >
                          Start Shopping
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Wishlist Tab */}
            <TabsContent value="wishlist" className="space-y-6">
              <motion.div variants={itemVariants}>
                <Card className="bg-[#2C1E4A] border-[#FFD369]/20">
                  <CardHeader>
                    <CardTitle className="text-[#FFD369] flex items-center">
                      <Heart className="w-5 h-5 mr-2" />
                      My Wishlist
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      {wishlistItems} items saved for later
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Heart className="w-16 h-16 text-white/30 mx-auto mb-4" />
                      <p className="text-white/70 mb-4">
                        Your wishlist is empty
                      </p>
                      <Button
                        className="bg-[#FFD369] text-[#1a0f1a] hover:bg-[#FFD369]/90"
                        onClick={() => setCurrentPage("products")}
                      >
                        Explore Products
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <motion.div variants={itemVariants}>
                <Card className="bg-[#2C1E4A] border-[#FFD369]/20">
                  <CardHeader>
                    <CardTitle className="text-[#FFD369] flex items-center">
                      <Settings className="w-5 h-5 mr-2" />
                      Account Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-[#1a0f1a] rounded-lg">
                        <div>
                          <h4 className="font-medium text-white">
                            Email Notifications
                          </h4>
                          <p className="text-sm text-white/70">
                            Receive updates about your orders
                          </p>
                        </div>
                        <Switch
                          checked={user?.preferences?.newsletter}
                          onCheckedChange={(checked) =>
                            handleInputChange("preferences.newsletter", checked)
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between p-4 bg-[#1a0f1a] rounded-lg">
                        <div>
                          <h4 className="font-medium text-white">
                            SMS Notifications
                          </h4>
                          <p className="text-sm text-white/70">
                            Get text updates on deliveries
                          </p>
                        </div>
                        <Switch
                          checked={user?.preferences?.smsNotifications}
                          onCheckedChange={(checked) =>
                            handleInputChange(
                              "preferences.smsNotifications",
                              checked
                            )
                          }
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[#FFD369]/20">
                      <Button
                        variant="destructive"
                        className="bg-red-500 hover:bg-red-600 text-white"
                        onClick={() => {
                          logout();
                          setCurrentPage("home");
                          toast.success("Logged out successfully!");
                        }}
                      >
                        Logout
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
