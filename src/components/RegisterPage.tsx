import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff, User, Mail, Phone, Lock, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

interface RegisterPageProps {
  setCurrentPage: (page: string) => void;
}

export default function RegisterPage({ setCurrentPage }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptNewsletter, setAcceptNewsletter] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, isLoading } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!acceptTerms) {
      toast.error('Please accept the terms and conditions');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      const success = await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });

      if (success) {
        setIsSuccess(true);
        toast.success('Account created successfully!');
        setTimeout(() => {
          setCurrentPage('home');
        }, 2000);
      } else {
        toast.error('Registration failed. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    }
  };

 const successVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring" as const, // 👈 force TS to treat it as literal
      stiffness: 200,
      damping: 15,
    },
  },
};


  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1a0f1a] via-[#2C1E4A] to-[#4B1C3F] flex items-center justify-center p-4">
        <motion.div
          variants={successVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-6"
          >
            <CheckCircle className="w-24 h-24 text-[#FFD369]" />
          </motion.div>
          <h2 className="text-3xl font-bold text-[#FFD369] mb-4">Welcome to LuxeBeauty!</h2>
          <p className="text-white/80 text-lg">Your account has been created successfully.</p>
          <p className="text-white/60 mt-2">Redirecting to homepage...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0f1a] via-[#2C1E4A] to-[#4B1C3F] flex items-center justify-center p-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md"
      >
        <Card className="bg-white/10 backdrop-blur-lg border-[#FFD369]/20 shadow-2xl">
          <CardHeader className="text-center pb-6">
            <motion.div variants={itemVariants}>
              <CardTitle className="text-3xl font-bold text-[#FFD369] mb-2">
                Create Account
              </CardTitle>
              <CardDescription className="text-white/70">
                Join LuxeBeauty and discover premium cosmetics
              </CardDescription>
            </motion.div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="name" className="text-white">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FFD369] w-4 h-4" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="pl-10 bg-[#2C1E4A]/50 border-[#FFD369]/30 text-white placeholder:text-white/50 focus:border-[#FFD369]"
                    placeholder="Enter your full name"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="email" className="text-white">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FFD369] w-4 h-4" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="pl-10 bg-[#2C1E4A]/50 border-[#FFD369]/30 text-white placeholder:text-white/50 focus:border-[#FFD369]"
                    placeholder="Enter your email"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="phone" className="text-white">Phone Number (Optional)</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FFD369] w-4 h-4" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="pl-10 bg-[#2C1E4A]/50 border-[#FFD369]/30 text-white placeholder:text-white/50 focus:border-[#FFD369]"
                    placeholder="Enter your phone number"
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FFD369] w-4 h-4" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 bg-[#2C1E4A]/50 border-[#FFD369]/30 text-white placeholder:text-white/50 focus:border-[#FFD369]"
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#FFD369] hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-white">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#FFD369] w-4 h-4" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 bg-[#2C1E4A]/50 border-[#FFD369]/30 text-white placeholder:text-white/50 focus:border-[#FFD369]"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#FFD369] hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="terms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                    className="border-[#FFD369] data-[state=checked]:bg-[#FFD369] data-[state=checked]:text-[#1a0f1a]"
                  />
                  <Label htmlFor="terms" className="text-sm text-white/80 leading-relaxed">
                    I agree to the{' '}
                    <a href="#" className="text-[#FFD369] hover:underline">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="text-[#FFD369] hover:underline">Privacy Policy</a>
                  </Label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="newsletter"
                    checked={acceptNewsletter}
                     onCheckedChange={(checked) => setAcceptNewsletter(checked === true)}
                    className="border-[#FFD369] data-[state=checked]:bg-[#FFD369] data-[state=checked]:text-[#1a0f1a]"
                  />
                  <Label htmlFor="newsletter" className="text-sm text-white/80">
                    Subscribe to our newsletter for exclusive offers and beauty tips
                  </Label>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#FFD369] text-[#1a0f1a] hover:bg-[#FFD369]/90 py-3 font-semibold transition-all duration-200 hover:scale-105"
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-[#1a0f1a] border-t-transparent rounded-full"
                    />
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </motion.div>
            </form>

            <motion.div variants={itemVariants} className="text-center pt-4 border-t border-[#FFD369]/20">
              <p className="text-white/70">
                Already have an account?{' '}
                <button
                  onClick={() => setCurrentPage('login')}
                  className="text-[#FFD369] hover:underline font-medium"
                >
                  Sign In
                </button>
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}