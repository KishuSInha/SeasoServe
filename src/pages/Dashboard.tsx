import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser } from "@/lib/auth";
import { 
  Sun, LogOut, UtensilsCrossed, Bot, Plane, User, Droplets, Activity, TrendingUp,
  MapPin, Calendar, Apple, Lightbulb, ThumbsUp, ThumbsDown, Settings, ShoppingCart, Globe, X, ChefHat
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { useLocation } from "@/hooks/useLocation";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [showMealIntervalPopup, setShowMealIntervalPopup] = useState(false);
  const [showMealTimePopup, setShowMealTimePopup] = useState(false);
  const [mealInterval, setMealIntervalState] = useState<string>('');
  const [currentMealTime, setCurrentMealTime] = useState<string>('');
  const { locationData, loading: locationLoading, detectLocation } = useLocation();
  const [showRecipeAssistant, setShowRecipeAssistant] = useState(false);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate("/login");
    } else {
      setUser(currentUser);
      const savedInterval = localStorage.getItem('mealInterval');
      const mealSetupCompleted = localStorage.getItem('mealSetupCompleted');
      
      if (savedInterval) {
        setMealIntervalState(savedInterval);
      }
      
      // Only show meal setup popups if not completed before
      if (!mealSetupCompleted) {
        setShowMealIntervalPopup(true);
      }
      
      // Auto-detect location if not already requested
      if (!localStorage.getItem('locationPermissionRequested')) {
        detectLocation();
        setShowLocationPopup(true);
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  const requestLocation = () => {
    detectLocation();
    localStorage.setItem('locationPermissionRequested', 'true');
    setShowLocationPopup(false);
  };



  const skipLocation = () => {
    localStorage.setItem('locationPermissionRequested', 'true');
    setShowLocationPopup(false);
  };

  const setMealInterval = (interval: string) => {
    localStorage.setItem('mealInterval', interval);
    setMealIntervalState(interval);
    setShowMealIntervalPopup(false);
    // Show meal time popup after interval is set
    setShowMealTimePopup(true);
  };

  const changeMealSettings = () => {
    setShowMealIntervalPopup(true);
  };

  const setMealTime = (mealTime: string) => {
    setCurrentMealTime(mealTime);
    setShowMealTimePopup(false);
    // Mark meal setup as completed
    localStorage.setItem('mealSetupCompleted', 'true');
    // Show location popup after meal time is set (if needed)
    if (!localStorage.getItem('locationPermissionRequested')) {
      setShowLocationPopup(true);
    }
  };

  const getMealOptions = () => {
    switch (mealInterval) {
      case '2-meals':
        return [
          { id: 'brunch', name: 'Brunch', emoji: '🥐', time: '10:00 AM - 12:00 PM' },
          { id: 'dinner', name: 'Dinner', emoji: '🍽️', time: '6:00 PM - 8:00 PM' }
        ];
      case '5-meals':
        return [
          { id: 'breakfast', name: 'Breakfast', emoji: '🌅', time: '7:00 AM - 9:00 AM' },
          { id: 'snack1', name: 'Morning Snack', emoji: '🍎', time: '10:00 AM - 11:00 AM' },
          { id: 'lunch', name: 'Lunch', emoji: '🥗', time: '12:00 PM - 2:00 PM' },
          { id: 'snack2', name: 'Evening Snack', emoji: '🥜', time: '4:00 PM - 5:00 PM' },
          { id: 'dinner', name: 'Dinner', emoji: '🍽️', time: '7:00 PM - 9:00 PM' }
        ];
      default:
        return [
          { id: 'breakfast', name: 'Breakfast', emoji: '🌅', time: '7:00 AM - 9:00 AM' },
          { id: 'lunch', name: 'Lunch', emoji: '🥗', time: '12:00 PM - 2:00 PM' },
          { id: 'dinner', name: 'Dinner', emoji: '🍽️', time: '7:00 PM - 9:00 PM' }
        ];
    }
  };

  const getCurrentMealSuggestions = () => {
    const isHot = locationData?.weather?.temp > 25;
    const isPoorAir = locationData?.weather?.aqi > 100;
    const isVegan = user?.dietType === 'vegan';
    const isVegetarian = user?.dietType === 'vegetarian';
    const allergies = user?.allergies || [];
    
    const filterByAllergies = (foods: any[]) => {
      return foods.filter(food => {
        if (allergies.includes('nuts') && food.name.toLowerCase().includes('nut')) return false;
        if (allergies.includes('dairy') && food.name.toLowerCase().includes('milk')) return false;
        if (allergies.includes('gluten') && food.name.toLowerCase().includes('bread')) return false;
        return true;
      });
    };

    const mealData = {
      breakfast: filterByAllergies([
        ...(isHot ? [
          { emoji: '🥤', name: 'Coconut Water Smoothie', calories: '150 kcal', temp: '❄️ Cooling' },
          { emoji: '🍉', name: 'Watermelon Bowl', calories: '120 kcal', temp: '❄️ Hydrating' }
        ] : [
          { emoji: '🥣', name: 'Warm Oatmeal', calories: '250 kcal', temp: '☀️ Warming' },
          { emoji: '☕', name: 'Herbal Tea & Toast', calories: '200 kcal', temp: '☀️ Comforting' }
        ]),
        ...(isPoorAir ? [
          { emoji: '🫐', name: 'Antioxidant Berry Bowl', calories: '180 kcal', temp: '☀️ Detoxifying' }
        ] : []),
        ...(isVegan ? [
          { emoji: '🌱', name: 'Plant Protein Bowl', calories: '220 kcal', temp: '☀️ Energizing' }
        ] : !isVegetarian ? [
          { emoji: '🍳', name: 'Veggie Scramble', calories: '280 kcal', temp: '☀️ Energizing' }
        ] : [])
      ]),
      lunch: filterByAllergies([
        ...(isHot ? [
          { emoji: '🥒', name: 'Cucumber Salad', calories: '160 kcal', temp: '❄️ Cooling' },
          { emoji: '🥥', name: 'Coconut Rice Bowl', calories: '280 kcal', temp: '❄️ Refreshing' }
        ] : [
          { emoji: '🍲', name: 'Warm Veggie Soup', calories: '240 kcal', temp: '☀️ Warming' },
          { emoji: '🍛', name: 'Hot Rice Bowl', calories: '320 kcal', temp: '☀️ Comforting' }
        ]),
        ...(isPoorAir ? [
          { emoji: '🥬', name: 'Green Detox Salad', calories: '200 kcal', temp: '☀️ Cleansing' }
        ] : [])
      ]),
      dinner: filterByAllergies([
        ...(isHot ? [
          { emoji: '🥗', name: 'Light Garden Salad', calories: '180 kcal', temp: '❄️ Light' },
          { emoji: '🍇', name: 'Fruit & Yogurt Bowl', calories: '220 kcal', temp: '❄️ Cooling' }
        ] : [
          { emoji: '🍲', name: 'Hearty Vegetable Stew', calories: '300 kcal', temp: '☀️ Warming' },
          { emoji: '🥘', name: 'Spiced Curry', calories: '280 kcal', temp: '☀️ Warming' }
        ])
      ]),
      snack1: filterByAllergies([
        ...(isHot ? [
          { emoji: '🍉', name: 'Watermelon Cubes', calories: '60 kcal', temp: '❄️ Hydrating' }
        ] : [
          { emoji: '🍎', name: 'Apple Slices', calories: '80 kcal', temp: '☀️ Fresh' }
        ])
      ]),
      snack2: filterByAllergies([
        ...(isPoorAir ? [
          { emoji: '🫐', name: 'Blueberry Mix', calories: '90 kcal', temp: '☀️ Antioxidant' }
        ] : [
          { emoji: '🥜', name: 'Trail Mix', calories: '110 kcal', temp: '☀️ Energizing' }
        ])
      ]),
      brunch: filterByAllergies([
        ...(isHot ? [
          { emoji: '🥤', name: 'Iced Smoothie Bowl', calories: '250 kcal', temp: '❄️ Refreshing' }
        ] : [
          { emoji: '🥐', name: 'Warm Avocado Toast', calories: '320 kcal', temp: '☀️ Satisfying' }
        ])
      ])
    };
    
    const suggestions = mealData[currentMealTime as keyof typeof mealData] || mealData.breakfast;
    return suggestions.length > 0 ? suggestions : [{ emoji: '🍽️', name: 'Custom Meal', calories: '200 kcal', temp: '☀️ Balanced' }];
  };

  const openRecipeAssistant = () => {
    setShowRecipeAssistant(true);
  };

  const getMealTimeGreeting = () => {
    const greetings = {
      breakfast: { text: 'Good Morning! Ready for breakfast?', bg: 'from-yellow-100 to-orange-100', icon: '🌅' },
      brunch: { text: 'Perfect time for brunch!', bg: 'from-orange-100 to-yellow-100', icon: '🥐' },
      lunch: { text: 'Lunch time! What sounds good?', bg: 'from-green-100 to-blue-100', icon: '☀️' },
      snack1: { text: 'Morning snack break!', bg: 'from-green-100 to-yellow-100', icon: '🍎' },
      snack2: { text: 'Evening snack time!', bg: 'from-orange-100 to-red-100', icon: '🥜' },
      dinner: { text: 'Dinner time! Let\'s wind down', bg: 'from-purple-100 to-blue-100', icon: '🌙' }
    };
    return greetings[currentMealTime as keyof typeof greetings] || greetings.breakfast;
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Meal Time Selection Popup */}
      {showMealTimePopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md shadow-2xl bg-gradient-to-br from-orange-50 via-yellow-50 to-white border-orange-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                Which meal are you planning?
              </CardTitle>
              <CardDescription className="mt-3 text-muted-foreground">
                Select your current meal time for personalized suggestions 🍽️
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {getMealOptions().map((meal) => (
                <Button 
                  key={meal.id}
                  onClick={() => setMealTime(meal.id)} 
                  variant="outline" 
                  className="w-full border-orange-200 hover:bg-orange-50 justify-start h-auto py-3"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{meal.emoji}</span>
                    <div className="text-left">
                      <div className="font-medium">{meal.name}</div>
                      <div className="text-xs text-muted-foreground">{meal.time}</div>
                    </div>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Meal Interval Popup */}
      {showMealIntervalPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md shadow-2xl bg-gradient-to-br from-orange-50 via-yellow-50 to-white border-orange-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center">
                  <UtensilsCrossed className="w-5 h-5 text-white" />
                </div>
                How often do you eat?
              </CardTitle>
              <CardDescription className="mt-3 text-muted-foreground">
                Help us personalize your meal recommendations 🍽️
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={() => setMealInterval('3-meals')} variant="outline" className="w-full border-orange-200 hover:bg-orange-50 justify-start">
                🌅 3 meals a day (Breakfast, Lunch, Dinner)
              </Button>
              <Button onClick={() => setMealInterval('5-meals')} variant="outline" className="w-full border-orange-200 hover:bg-orange-50 justify-start">
                🍎 5 small meals (Include snacks)
              </Button>
              <Button onClick={() => setMealInterval('2-meals')} variant="outline" className="w-full border-orange-200 hover:bg-orange-50 justify-start">
                ⏰ 2 meals a day (Intermittent fasting)
              </Button>
              <Button onClick={() => setMealInterval('custom')} variant="outline" className="w-full border-orange-200 hover:bg-orange-50 justify-start">
                ⚙️ Custom schedule
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Location Permission Popup */}
      {showLocationPopup && !showMealIntervalPopup && !showMealTimePopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md shadow-2xl bg-gradient-to-br from-orange-50 via-yellow-50 to-white border-orange-200">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    Location Access
                  </CardTitle>
                  <CardDescription className="mt-3 text-muted-foreground">
                    Get personalized seasonal food recommendations based on your local climate and available ingredients. 🌱
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={skipLocation} className="hover:bg-orange-100">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={requestLocation} disabled={locationLoading} className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white shadow-lg">
                {locationLoading ? '📍 Detecting...' : '🌍 Allow Location Access'}
              </Button>
              <Button onClick={skipLocation} variant="outline" className="w-full border-orange-200 hover:bg-orange-50">
                Skip for Now
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
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
          <div className={`bg-gradient-to-r ${currentMealTime ? getMealTimeGreeting().bg : 'from-orange-100 via-yellow-50 to-green-50'} rounded-2xl p-6 mb-6 shadow-sm`}>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              {currentMealTime ? `${getMealTimeGreeting().icon} ${getMealTimeGreeting().text}` : `Hello, ${user?.name}! 👋`}
            </h2>
            <p className="text-muted-foreground mb-4">{currentMealTime ? `Perfect ${currentMealTime} suggestions for you` : 'What would you like to eat today?'}</p>
            
            {/* Profile Stats & Environment Info */}
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/80 backdrop-blur rounded-lg px-4 py-2 shadow-sm">
                <p className="text-xs text-muted-foreground">Diet</p>
                <p className="text-sm font-bold capitalize">{user.dietType}</p>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-lg px-4 py-2 shadow-sm">
                <p className="text-xs text-muted-foreground">Age</p>
                <p className="text-sm font-bold">{user.age} years</p>
              </div>
              {locationData?.weather && (
                <>
                  <div className="bg-white/80 backdrop-blur rounded-lg px-4 py-2 shadow-sm">
                    <p className="text-xs text-muted-foreground">Weather</p>
                    <p className="text-sm font-bold flex items-center gap-1">
                      {locationData.weather.condition === 'Sunny' ? '☀️' : locationData.weather.condition === 'Cloudy' ? '☁️' : locationData.weather.condition === 'Rainy' ? '🌧️' : '🌤️'} {locationData.weather.temp}°C
                    </p>
                  </div>
                  <div className="bg-white/80 backdrop-blur rounded-lg px-4 py-2 shadow-sm">
                    <p className="text-xs text-muted-foreground">Air Quality</p>
                    <p className="text-sm font-bold">
                      AQI {locationData.weather.aqi} 
                      <span className={`text-xs ml-1 ${locationData.weather.aqi > 100 ? 'text-red-600' : locationData.weather.aqi > 50 ? 'text-yellow-600' : 'text-green-600'}`}>
                        {locationData.weather.aqi > 100 ? 'Poor' : locationData.weather.aqi > 50 ? 'Moderate' : 'Good'}
                      </span>
                    </p>
                  </div>
                </>
              )}
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

          {/* Quick Access Features - Top Priority */}
          <div className="grid sm:grid-cols-3 gap-3 mb-6">
            <Card onClick={() => navigate("/climate-suggestions")} className="cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Sun className="w-8 h-8 text-orange-500" />
                  <div>
                    <CardTitle className="text-sm">Climate Suggestions</CardTitle>
                    {locationData && <p className="text-xs text-muted-foreground">📍 Live location active</p>}
                  </div>
                </div>
              </CardHeader>
            </Card>
            <Card onClick={() => navigate("/meal-plan")} className="cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02]">
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
                  <Apple className="w-8 h-8 text-red-500" />
                  <CardTitle className="text-sm">Food Scanner</CardTitle>
                </div>
              </CardHeader>
            </Card>
          </div>

          {/* Current Meal Suggestions */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-foreground">
                {currentMealTime ? `${currentMealTime.charAt(0).toUpperCase() + currentMealTime.slice(1)} Options` : 'Meal Suggestions'}
              </h3>
              {currentMealTime && (
                <Button onClick={() => setShowMealTimePopup(true)} variant="outline" size="sm" className="gap-2">
                  <Calendar className="w-4 h-4" />
                  Change Meal
                </Button>
              )}
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {getCurrentMealSuggestions().map((meal, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="aspect-video bg-gradient-to-br from-orange-200 to-yellow-100 rounded-lg mb-3 flex items-center justify-center text-4xl">
                      {meal.emoji}
                    </div>
                    <CardTitle className="text-base">{meal.name}</CardTitle>
                    <CardDescription className="text-xs">{meal.calories} • {meal.temp}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">View Recipe</Button>
                      <Button size="sm" onClick={openRecipeAssistant} className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white">
                        <ChefHat className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
              {locationData?.weather ? (
                <>
                  <p className="text-sm">🌡️ {locationData.weather.temp}°C - {locationData.weather.temp > 25 ? 'Cooling foods like watermelon, cucumber recommended' : 'Warming soups and hot meals suggested'}.</p>
                  <p className="text-sm">🌬️ AQI {locationData.weather.aqi} - {locationData.weather.aqi > 100 ? 'Antioxidant foods like berries, green leafy vegetables' : 'Good air quality for fresh outdoor meals'}.</p>
                  <p className="text-sm">🌍 Live location detected for real-time meal recommendations.</p>
                  <p className="text-sm">🥗 Diet: {user?.dietType} meals personalized{user?.allergies?.length > 0 ? `, avoiding ${user.allergies.join(', ')}` : ''}.</p>
                </>
              ) : (
                <>
                  <p className="text-sm">🥗 Personalized for {user?.dietType} diet{user?.allergies?.length > 0 ? `, avoiding ${user.allergies.join(', ')}` : ''}.</p>
                  <p className="text-sm">💧 Stay hydrated with seasonal fruits and vegetables.</p>
                  <p className="text-sm">🌱 Fresh, local ingredients recommended for better nutrition.</p>
                </>
              )}
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
                <Button variant="outline" className="w-full justify-start gap-2" onClick={changeMealSettings}>
                  <UtensilsCrossed className="w-4 h-4" />
                  Change meal settings
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

          {/* Recipe Assistant - Secondary Access */}
          <div className="mb-20">
            <Card onClick={openRecipeAssistant} className="cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02] bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <ChefHat className="w-8 h-8 text-orange-500" />
                  <CardTitle className="text-sm">Recipe Assistant</CardTitle>
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
          <Button variant="ghost" size="sm" className="flex-col h-auto gap-1" onClick={openRecipeAssistant}>
            <ChefHat className="w-5 h-5" />
            <span className="text-xs">Recipes</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-auto gap-1" onClick={() => navigate("/profile-edit")}>
            <User className="w-5 h-5" />
            <span className="text-xs">Profile</span>
          </Button>
        </div>
      </div>

      {/* Recipe Assistant Modal */}
      {showRecipeAssistant && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl bg-gradient-to-br from-orange-50 via-yellow-50 to-white border-orange-200">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center">
                      <ChefHat className="w-5 h-5 text-white" />
                    </div>
                    Recipe Assistant
                  </CardTitle>
                  <CardDescription className="mt-2 text-muted-foreground">
                    Get personalized recipes based on your preferences and current meal suggestions 👨‍🍳
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowRecipeAssistant(false)} className="hover:bg-orange-100">
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 overflow-y-auto">
              <div className="grid gap-3">
                <Button 
                  onClick={() => {
                    setShowRecipeAssistant(false);
                    navigate("/chatbot");
                  }} 
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white justify-start h-auto py-4"
                >
                  <div className="flex items-center gap-3">
                    <Bot className="w-6 h-6" />
                    <div className="text-left">
                      <div className="font-medium">AI Recipe Chat</div>
                      <div className="text-xs opacity-90">Ask for custom recipes and cooking tips</div>
                    </div>
                  </div>
                </Button>
                
                {currentMealTime && getCurrentMealSuggestions().length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-muted-foreground">Get recipes for your current {currentMealTime} suggestions:</h4>
                    {getCurrentMealSuggestions().slice(0, 3).map((meal, index) => (
                      <Button 
                        key={index}
                        onClick={() => {
                          setShowRecipeAssistant(false);
                          navigate(`/chatbot?recipe=${encodeURIComponent(meal.name)}`);
                        }}
                        variant="outline" 
                        className="w-full border-orange-200 hover:bg-orange-50 justify-start h-auto py-3"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{meal.emoji}</span>
                          <div className="text-left">
                            <div className="font-medium text-sm">{meal.name}</div>
                            <div className="text-xs text-muted-foreground">{meal.calories} • {meal.temp}</div>
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
