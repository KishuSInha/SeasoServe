import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser } from "@/lib/auth";
import { 
  Sun, LogOut, UtensilsCrossed, Bot, Plane, User, Droplets, Activity, TrendingUp,
  MapPin, Calendar, Apple, Lightbulb, ThumbsUp, ThumbsDown, Settings, ShoppingCart, Globe, X, ChefHat,
  Clock, Zap, RefreshCw, Trophy, Heart, Flame, CloudRain, Thermometer, CheckCircle, AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { useLocation } from "@/hooks/useLocation";
import ClimateBasedSuggestions from "@/components/ClimateBasedSuggestions";

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
  const [mealAlternatives, setMealAlternatives] = useState<any[]>([]);
  const [currentMealIndex, setCurrentMealIndex] = useState(0);
  const [dailyCalories, setDailyCalories] = useState(0);
  const [calorieGoal] = useState(2000);
  const [waterIntake, setWaterIntake] = useState(0);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [showWeatherAlert, setShowWeatherAlert] = useState(false);
  const [weatherAlertMessage, setWeatherAlertMessage] = useState('');
  const [likedMeals, setLikedMeals] = useState<string[]>([]);
  const [dislikedMeals, setDislikedMeals] = useState<string[]>([]);

  // Check for weather alerts when location data changes
  useEffect(() => {
    if (locationData?.weather) {
      checkWeatherAlerts();
    }
  }, [locationData]);
  
  // Reset daily tracking at midnight
  useEffect(() => {
    const now = new Date();
    const lastReset = localStorage.getItem('lastDailyReset');
    const today = now.toDateString();
    
    if (lastReset !== today) {
      setDailyCalories(0);
      setWaterIntake(0);
      localStorage.setItem('dailyCalories', '0');
      localStorage.setItem('waterIntake', '0');
      localStorage.setItem('lastDailyReset', today);
    }
  }, []);
  
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
      
      // Auto-detect meal time based on current time
      autoDetectMealTime();
      
      // Load saved preferences
      const savedLikedMeals = JSON.parse(localStorage.getItem('likedMeals') || '[]');
      const savedDislikedMeals = JSON.parse(localStorage.getItem('dislikedMeals') || '[]');
      const savedDailyCalories = parseInt(localStorage.getItem('dailyCalories') || '0');
      const savedWaterIntake = parseInt(localStorage.getItem('waterIntake') || '0');
      const savedAchievements = JSON.parse(localStorage.getItem('achievements') || '[]');
      
      setLikedMeals(savedLikedMeals);
      setDislikedMeals(savedDislikedMeals);
      setDailyCalories(savedDailyCalories);
      setWaterIntake(savedWaterIntake);
      setAchievements(savedAchievements);
      
      // Check for weather alerts
      checkWeatherAlerts();
    }
  }, [navigate]);
  
  const autoDetectMealTime = () => {
    const now = new Date();
    const hour = now.getHours();
    
    let detectedMealTime = '';
    if (hour >= 6 && hour <= 10) {
      detectedMealTime = 'breakfast';
    } else if (hour >= 11 && hour <= 15) {
      detectedMealTime = 'lunch';
    } else if (hour >= 17 && hour <= 21) {
      detectedMealTime = 'dinner';
    }
    
    if (detectedMealTime && !currentMealTime) {
      setCurrentMealTime(detectedMealTime);
    }
  };
  
  const checkWeatherAlerts = () => {
    if (locationData?.weather) {
      const temp = locationData.weather.temp;
      const condition = locationData.weather.condition;
      
      if (temp > 30) {
        setWeatherAlertMessage('🔥 Heat wave: Stay cool with these refreshing meals');
        setShowWeatherAlert(true);
      } else if (condition === 'Rainy') {
        setWeatherAlertMessage('🌧️ Rainy day comfort food suggestions');
        setShowWeatherAlert(true);
      } else if (temp < 10) {
        setWeatherAlertMessage('❄️ Cold weather: Warm up with these cozy meals');
        setShowWeatherAlert(true);
      }
    }
  };

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
    setShowMealTimePopup(true);
  };

  const changeMealSettings = () => {
    setShowMealIntervalPopup(true);
  };

  const setMealTime = (mealTime: string) => {
    setCurrentMealTime(mealTime);
    setShowMealTimePopup(false);
    localStorage.setItem('mealSetupCompleted', 'true');
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

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning! ☀️';
    if (hour < 17) return 'Good Afternoon! 🌤️';
    return 'Good Evening! 🌙';
  };
  
  const getCurrentMealSuggestion = () => {
    if (!currentMealTime) return null;
    
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

    const getPreparationTime = (mealName: string) => {
      const quickMeals = ['smoothie', 'salad', 'bowl', 'toast', 'fruit'];
      const isQuick = quickMeals.some(quick => mealName.toLowerCase().includes(quick));
      return isQuick ? { time: '5-10 min', badge: '⚡ Quick meal' } : { time: '15-25 min', badge: '🕐 15 min prep' };
    };
    
    const mealData = {
      breakfast: filterByAllergies([
        ...(isHot ? [
          { emoji: '🥤', name: 'Coconut Water Smoothie', calories: '150 kcal', temp: '❄️ Cooling' },
          { emoji: '🍉', name: 'Watermelon Bowl', calories: '120 kcal', temp: '❄️ Hydrating' }
        ] : [
          { emoji: '🥣', name: 'Warm Oatmeal', calories: '250 kcal', temp: '☀️ Warming' },
          { emoji: '☕', name: 'Herbal Tea & Toast', calories: '200 kcal', temp: '☀️ Comforting' }
        ]).map(meal => ({ ...meal, ...getPreparationTime(meal.name) })),
        ...(isPoorAir ? [
          { emoji: '🫐', name: 'Antioxidant Berry Bowl', calories: '180 kcal', temp: '☀️ Detoxifying' }
        ] : []).map(meal => ({ ...meal, ...getPreparationTime(meal.name) })),
        ...(isVegan ? [
          { emoji: '🌱', name: 'Plant Protein Bowl', calories: '220 kcal', temp: '☀️ Energizing' }
        ] : !isVegetarian ? [
          { emoji: '🍳', name: 'Veggie Scramble', calories: '280 kcal', temp: '☀️ Energizing' }
        ] : []).map(meal => ({ ...meal, ...getPreparationTime(meal.name) }))
      ]).flat(),
      lunch: filterByAllergies([
        ...(isHot ? [
          { emoji: '🥒', name: 'Cucumber Salad', calories: '160 kcal', temp: '❄️ Cooling' },
          { emoji: '🥥', name: 'Coconut Rice Bowl', calories: '280 kcal', temp: '❄️ Refreshing' }
        ] : [
          { emoji: '🍲', name: 'Warm Veggie Soup', calories: '240 kcal', temp: '☀️ Warming' },
          { emoji: '🍛', name: 'Hot Rice Bowl', calories: '320 kcal', temp: '☀️ Comforting' }
        ]).map(meal => ({ ...meal, ...getPreparationTime(meal.name) })),
        ...(isPoorAir ? [
          { emoji: '🥬', name: 'Green Detox Salad', calories: '200 kcal', temp: '☀️ Cleansing' }
        ] : []).map(meal => ({ ...meal, ...getPreparationTime(meal.name) }))
      ]).flat(),
      dinner: filterByAllergies([
        ...(isHot ? [
          { emoji: '🥗', name: 'Light Garden Salad', calories: '180 kcal', temp: '❄️ Light' },
          { emoji: '🍇', name: 'Fruit & Yogurt Bowl', calories: '220 kcal', temp: '❄️ Cooling' }
        ] : [
          { emoji: '🍲', name: 'Hearty Vegetable Stew', calories: '300 kcal', temp: '☀️ Warming' },
          { emoji: '🥘', name: 'Spiced Curry', calories: '280 kcal', temp: '☀️ Warming' }
        ]).map(meal => ({ ...meal, ...getPreparationTime(meal.name) }))
      ]).flat(),
      snack1: filterByAllergies([
        ...(isHot ? [
          { emoji: '🍉', name: 'Watermelon Cubes', calories: '60 kcal', temp: '❄️ Hydrating' }
        ] : [
          { emoji: '🍎', name: 'Apple Slices', calories: '80 kcal', temp: '☀️ Fresh' }
        ]).map(meal => ({ ...meal, ...getPreparationTime(meal.name) }))
      ]).flat(),
      snack2: filterByAllergies([
        ...(isPoorAir ? [
          { emoji: '🫐', name: 'Blueberry Mix', calories: '90 kcal', temp: '☀️ Antioxidant' }
        ] : [
          { emoji: '🥜', name: 'Trail Mix', calories: '110 kcal', temp: '☀️ Energizing' }
        ]).map(meal => ({ ...meal, ...getPreparationTime(meal.name) }))
      ]).flat(),
      brunch: filterByAllergies([
        ...(isHot ? [
          { emoji: '🥤', name: 'Iced Smoothie Bowl', calories: '250 kcal', temp: '❄️ Refreshing' }
        ] : [
          { emoji: '🥐', name: 'Warm Avocado Toast', calories: '320 kcal', temp: '☀️ Satisfying' }
        ]).map(meal => ({ ...meal, ...getPreparationTime(meal.name) }))
      ]).flat()
    };
    
    const suggestions = mealData[currentMealTime as keyof typeof mealData] || [];
    const filteredSuggestions = suggestions.filter(meal => !dislikedMeals.includes(meal.name));
    
    if (mealAlternatives.length === 0 && filteredSuggestions.length > 0) {
      setMealAlternatives(filteredSuggestions);
    }
    
    return filteredSuggestions.length > 0 ? filteredSuggestions[currentMealIndex] || filteredSuggestions[0] : null;
  };

  const openRecipeAssistant = () => {
    setShowRecipeAssistant(true);
  };
  
  const getAlternativeMeal = () => {
    if (mealAlternatives.length > 1) {
      const nextIndex = (currentMealIndex + 1) % mealAlternatives.length;
      setCurrentMealIndex(nextIndex);
    }
  };
  
  const likeMeal = (mealName: string) => {
    const newLikedMeals = [...likedMeals, mealName];
    setLikedMeals(newLikedMeals);
    localStorage.setItem('likedMeals', JSON.stringify(newLikedMeals));
  };
  
  const dislikeMeal = (mealName: string) => {
    const newDislikedMeals = [...dislikedMeals, mealName];
    setDislikedMeals(newDislikedMeals);
    localStorage.setItem('dislikedMeals', JSON.stringify(newDislikedMeals));
    getAlternativeMeal();
  };
  
  const addCalories = (calories: number) => {
    const newTotal = dailyCalories + calories;
    setDailyCalories(newTotal);
    localStorage.setItem('dailyCalories', newTotal.toString());
  };
  
  const addWater = () => {
    const newWater = waterIntake + 250;
    setWaterIntake(newWater);
    localStorage.setItem('waterIntake', newWater.toString());
  };
  
  const getIngredientAvailability = () => {
    const random = Math.random();
    if (random > 0.7) return { status: 'available', message: '✅ All ingredients available nearby' };
    if (random > 0.4) return { status: 'partial', message: '🛒 2 items needed from store' };
    return { status: 'unavailable', message: '🏪 Visit grocery store for ingredients' };
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
          
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-orange-100 via-yellow-50 to-green-50 rounded-2xl p-6 mb-6 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              {getTimeBasedGreeting()} {user?.name}! 👋
            </h2>
            <p className="text-muted-foreground mb-4">What would you like to eat today?</p>
          </div>

          {/* Quick Access Features */}
          <div className="grid sm:grid-cols-4 gap-3 mb-6">
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
            <Card onClick={() => navigate("/chatbot")} className="cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02] bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <Bot className="w-8 h-8 text-blue-500" />
                  <div>
                    <CardTitle className="text-sm">Recipe Assistant</CardTitle>
                    <p className="text-xs text-muted-foreground">🤖 AI cooking help</p>
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
        </div>
      </main>
    </div>
  );
};

export default Dashboard;