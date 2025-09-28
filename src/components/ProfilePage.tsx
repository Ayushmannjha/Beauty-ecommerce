import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {  Edit, Save, X } from "lucide-react";
import {jwtDecode} from "jwt-decode";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsContent } from "./ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { toast } from "sonner";
import { fetchUserProfile, updateUserProfile, type User } from "./services/costumer";


interface ProfilePageProps {
  setCurrentPage: (page: string) => void;
}



interface TokenPayload {
  User: User;
  sub: string;
  iat: number;
}

export default function ProfilePage({ setCurrentPage }: ProfilePageProps) {



  const [user, setUser] = useState<User | null>(null);
  const [editedUser, setEditedUser] = useState<User>({} as User);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch user profile on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded: TokenPayload = jwtDecode(token);
      fetchUserProfile(decoded.User.id)
        .then((profile) => {
          setUser(profile);
          setEditedUser(profile);
        })
        .catch(console.error);
    } catch (err) {
      console.error("Failed to decode token:", err);
    }
  }, []);

  // Handle input changes
  const handleInputChange = (field: keyof User, value: any) => {
    setEditedUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Save updated profile
  const handleSave = async () => {
    if (!user?.id) return;

    try {
      const updated: User & { token?: string } = await updateUserProfile(user.id, editedUser);

      // Update token in localStorage if returned
      if (updated.token) localStorage.setItem("token", updated.token);

      setUser(updated);
      setEditedUser(updated);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile");
    }
  };

  const handleCancel = () => {
    
    setIsEditing(false);
  };

 

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#1a0f1a] pt-20 pb-12">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-[#FFD369] mb-2">My Profile</h1>
              <p className="text-white/70">Manage your account and preferences</p>
            </div>
            <Button
              variant="outline"
              onClick={() => setCurrentPage("home")}
              className="border-[#FFD369] text-[#FFD369] hover:bg-[#FFD369] hover:text-[#1a0f1a]"
            >
              Back to Home
            </Button>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="profile" className="space-y-6">
           

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card className="bg-[#2C1E4A] border-[#FFD369]/20">
                <CardHeader className="flex items-center justify-between">
                  <CardTitle className="text-[#FFD369]">Personal Information</CardTitle>
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
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-6">
                    <Avatar className="w-24 h-24">
                      <AvatarImage  />
                      <AvatarFallback className="bg-[#FFD369] text-[#1a0f1a] text-2xl">
                        {user.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{user.name}</h3>
                      <p className="text-white/70">{user.email}</p>
                      <Badge className="mt-2 bg-[#FFD369] text-[#1a0f1a]">Premium Member</Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {["name", "email", "phone", "address", "city", "state"].map((field) => (
                      <div key={field} className="space-y-2">
                        <Label className="text-white">{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
                        {isEditing ? (
                          <Input
                            value={(editedUser as any)[field] ?? ""}
                            onChange={(e) => handleInputChange(field as keyof User, e.target.value)}
                            className="bg-[#1a0f1a] border-[#FFD369]/30 text-white"
                          />
                        ) : (
                          <div className="p-3 bg-[#1a0f1a] rounded-md text-white border border-[#FFD369]/30">
                            {(user as any)[field] ?? "Not provided"}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

           
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
