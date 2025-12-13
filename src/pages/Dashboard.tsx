import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser } from "@/lib/auth";
import { 
  Sun, LogOut, UtensilsCrossed, Bot, Plane, User, Droplets, Activity, TrendingUp,
  MapPin, Calendar, Apple, Lightbulb, ThumbsUp, ThumbsDown, Settings, ShoppingCart, Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate("/login");
    } else {
      setUser(currentUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-border py-3 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/favicon.png" alt="SeasoServe" className="w-8 h-8" />
            <h1 className="text-xl font-bold text-foreground">SeasoServe</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button onClick={() => navigate("/profile-edit")} variant="ghost" size="sm" className="gap-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </Button>
            <Button onClick={handleLogout} variant="ghost" size="sm" className="gap-2">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-24">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Welcome Banner with Stats */}
          <div className="bg-gradient-to-r from-orange-100 via-yellow-50 to-green-50 rounded-2xl p-6 mb-6 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Hello, {user.name}! 👋
            </h2>
            <p className="text-muted-foreground mb-4">What would you like to eat today?</p>
            
            {/* Profile Stats Inline */}
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/80 backdrop-blur rounded-lg px-4 py-2 shadow-sm">
                <p className="text-xs text-muted-foreground">Diet</p>
                <p className="text-sm font-bold capitalize">{user.dietType}</p>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-lg px-4 py-2 shadow-sm">
                <p className="text-xs text-muted-foreground">Age</p>
                <p className="text-sm font-bold">{user.age} years</p>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-lg px-4 py-2 shadow-sm">
                <p className="text-xs text-muted-foreground">Height</p>
                <p className="text-sm font-bold">{user.height} cm</p>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-lg px-4 py-2 shadow-sm">
                <p className="text-xs text-muted-foreground">Weight</p>
                <p className="text-sm font-bold">{user.weight} kg</p>
              </div>
            </div>
          </div>

          {/* Today's Smart Meal Suggestions */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-foreground mb-4">Meals for Today</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="aspect-video bg-gradient-to-br from-orange-200 to-yellow-100 rounded-lg mb-3 flex items-center justify-center text-4xl">🥣</div>
                  <CardTitle className="text-base">Oatmeal Bowl</CardTitle>
                  <CardDescription className="text-xs">250 kcal • ☀️ Cooling</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button size="sm" variant="outline" className="w-full">View Recipe</Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="aspect-video bg-gradient-to-br from-green-200 to-lime-100 rounded-lg mb-3 flex items-center justify-center text-4xl">🥗</div>
                  <CardTitle className="text-base">Fresh Salad</CardTitle>
                  <CardDescription className="text-xs">180 kcal • ☀️ Cooling</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button size="sm" variant="outline" className="w-full">View Recipe</Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="aspect-video bg-gradient-to-br from-blue-200 to-cyan-100 rounded-lg mb-3 flex items-center justify-center text-4xl">🥤</div>
                  <CardTitle className="text-base">Smoothie</CardTitle>
                  <CardDescription className="text-xs">150 kcal • ☀️ Cooling</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button size="sm" variant="outline" className="w-full">View Recipe</Button>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="aspect-video bg-gradient-to-br from-purple-200 to-pink-100 rounded-lg mb-3 flex items-center justify-center text-4xl">🍲</div>
                  <CardTitle className="text-base">Veggie Soup</CardTitle>
                  <CardDescription className="text-xs">220 kcal • ❄️ Warming</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button size="sm" variant="outline" className="w-full">View Recipe</Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Personal Health Summary & Travel Planner */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Activity className="w-5 h-5 text-green-500" />
                  Personal Health Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Daily Calories</span>
                    <span className="font-semibold">800 / 2000 kcal</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  <span>Hydration: 4/8 glasses</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Protein</span>
                  <span className="font-semibold">25g / 60g</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Fiber</span>
                  <span className="font-semibold">12g / 30g</span>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm font-medium text-green-800">🌱 Seasonal Balance: 78%</p>
                  <p className="text-xs text-green-600 mt-1">You are well-aligned with today's seasonal diet.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Plane className="w-5 h-5 text-blue-500" />
                  Travel Food Planner
                </CardTitle>
                <CardDescription>Avoid stomach issues while travelling</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium flex items-center gap-2 mb-1.5">
                    <MapPin className="w-4 h-4" />
                    Destination
                  </label>
                  <Input placeholder="e.g., Paris, France" />
                </div>
                <div>
                  <label className="text-sm font-medium flex items-center gap-2 mb-1.5">
                    <Calendar className="w-4 h-4" />
                    Travel Date
                  </label>
                  <Input type="date" />
                </div>
                <Button className="w-full gap-2">
                  <Globe className="w-4 h-4" />
                  Plan My Travel Meals
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Seasonal & Local Picks */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-foreground mb-4">Best Foods This Season</h3>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {[
                { name: "Watermelon", emoji: "🍉", tags: ["Local", "Seasonal"] },
                { name: "Cucumber", emoji: "🥒", tags: ["Local", "Budget-friendly"] },
                { name: "Mango", emoji: "🥭", tags: ["Seasonal"] },
                { name: "Coconut Water", emoji: "🥥", tags: ["Local", "Seasonal"] },
                { name: "Mint", emoji: "🌿", tags: ["Local", "Budget-friendly"] },
              ].map((item, i) => (
                <Card key={i} className="min-w-[160px] hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="text-5xl text-center mb-2">{item.emoji}</div>
                    <CardTitle className="text-sm text-center">{item.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-1 justify-center">
                      {item.tags.map((tag, j) => (
                        <span key={j} className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Smart Substitutions & Tips */}
          <Card className="mb-6 shadow-md bg-gradient-to-r from-yellow-50 to-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Lightbulb className="w-5 h-5 text-yellow-600" />
                Smart Substitutions & Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">💡 Replace fried snacks with roasted chana today.</p>
              <p className="text-sm">💧 Coconut water recommended due to high humidity.</p>
              <p className="text-sm">🥗 Add cucumber to meals for extra hydration.</p>
            </CardContent>
          </Card>

          {/* Feedback & Preferences + Weekly Snapshot */}
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Feedback & Preferences</CardTitle>
                <CardDescription>Help us personalize your experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <ThumbsUp className="w-4 h-4" />
                  Meals I liked today
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <ThumbsDown className="w-4 h-4" />
                  Meals I didn't like
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2" onClick={() => navigate("/profile-edit")}>
                  <Settings className="w-4 h-4" />
                  Update preferences
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                  Weekly Snapshot
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Avg. Calorie Intake</span>
                  <span className="font-semibold">1,850 kcal</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Seasonal Consistency</span>
                  <span className="font-semibold">82%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Most Eaten</span>
                  <span className="font-semibold">Vegetables</span>
                </div>
                <Button variant="outline" className="w-full mt-2">View Detailed Report</Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Access Features */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-20">
            <Card onClick={() => navigate("/climate-suggestions")} className="cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Sun className="w-8 h-8 text-orange-500" />
                  <CardTitle className="text-sm">Climate Suggestions</CardTitle>
                </div>
              </CardHeader>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <UtensilsCrossed className="w-8 h-8 text-green-500" />
                  <CardTitle className="text-sm">Meal Plan</CardTitle>
                </div>
              </CardHeader>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Bot className="w-8 h-8 text-blue-500" />
                  <CardTitle className="text-sm">AI Chatbot</CardTitle>
                </div>
              </CardHeader>
            </Card>
            <Card className="cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Apple className="w-8 h-8 text-red-500" />
                  <CardTitle className="text-sm">Food Scanner</CardTitle>
                </div>
              </CardHeader>
            </Card>
          </div>

        </div>
      </main>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-border py-3 shadow-lg z-40">
        <div className="container mx-auto px-4 flex justify-around items-center max-w-2xl">
          <Button variant="ghost" size="sm" className="flex-col h-auto gap-1">
            <UtensilsCrossed className="w-5 h-5" />
            <span className="text-xs">Meal Plan</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-auto gap-1">
            <ShoppingCart className="w-5 h-5" />
            <span className="text-xs">Grocery</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-auto gap-1">
            <Globe className="w-5 h-5" />
            <span className="text-xs">Travel</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-auto gap-1" onClick={() => navigate("/profile-edit")}>
            <User className="w-5 h-5" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
