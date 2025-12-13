import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { loginUser } from "@/lib/auth";

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = loginUser(email, password);
    
    if (result.success) {
      toast({
        title: "Login Successful!",
        description: `Welcome back, ${result.user?.name}!`,
      });
      navigate("/home");
    } else {
      toast({
        title: "Login Failed",
        description: result.message,
        variant: "destructive",
      });
    }
  };

  const seasonalIcons = ['🍓', '🥑', '🍅', '🥕', '🌽', '🍎', '🥦', '🍊', '🥒', '🫐', '🍑', '🥭', '🍇', '🥝', '🍌', '🥬'];

  return (
    <div className="min-h-screen flex items-center justify-center login-bg relative overflow-hidden">
      {/* Floating Seasonal Icons */}
      {seasonalIcons.map((icon, index) => (
        <div key={index} className="floating-food">
          {icon}
        </div>
      ))}
      
      {/* Main Login Card */}
      <Card className="w-full max-w-md login-card animate-fade-up relative z-10">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-orange-400 via-red-400 to-pink-400 rounded-full flex items-center justify-center text-4xl mb-4 shadow-xl">
            <img src="./favicon.png" alt="SeasoServe Logo" className="w-20 h-20 object-cover object-center rounded-full" />
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-red-500 to-pink-500 bg-clip-text text-transparent">
            SeasoServe
          </CardTitle>
          <CardDescription className="text-gray-700 text-lg font-medium">
            Fresh • Delicious • Seasonal • Perfectly Matched to You
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium flex items-center gap-2">
                🍓 Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="user@seasoserve.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 login-input rounded-xl"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700 font-medium flex items-center gap-2">
                🥑 Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 login-input rounded-xl"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full h-14 login-btn font-bold text-lg rounded-xl transition-all duration-300 shadow-lg"
            >
              Discover Your Perfect Seasonal Menu
            </Button>
          </form>
          
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 text-sm text-gray-600 font-medium">
              <span className="flex items-center gap-1">🍓 Fresh</span>
              <span className="flex items-center gap-1">🥭 Flavorful</span>
              <span className="flex items-center gap-1">Personalized</span>
            </div>
            <Button 
              variant="outline" 
              className="w-full border-2 border-orange-300 text-orange-700 hover:bg-orange-50 rounded-xl font-semibold"
              onClick={() => navigate("/register")}
            >
              Create New Account
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-amber-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 bg-orange-200 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-5 w-12 h-12 bg-yellow-200 rounded-full opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
    </div>
  );
};

export default Login;