import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser } from "@/lib/auth";
import { 
  Sun, LogOut, UtensilsCrossed, Bot, Plane, User, Apple, AlertCircle, Scan
} from "lucide-react";
import { Button } from "@/components/ui/button";
import FeatureCard from "@/components/FeatureCard";
import ClimateRiskAlerts from "@/components/ClimateRiskAlerts";
import SeasonalLocalProduce from "@/components/SeasonalLocalProduce";
import FoodScanner from "@/components/FoodScanner";
import NutritionAnalytics from "@/components/NutritionAnalytics";
import { useLocation } from "@/hooks/useLocation";

const DashboardHome = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const { locationData } = useLocation();
  const [showClimateAlerts, setShowClimateAlerts] = useState(false);
  const [showFoodScanner, setShowFoodScanner] = useState(false);
  const [showMealSuggestions, setShowMealSuggestions] = useState(false);
  const [showMealPreferences, setShowMealPreferences] = useState(false);
  const [mealInterval, setMealInterval] = useState(localStorage.getItem('mealInterval') || '3');
  const [currentMealType, setCurrentMealType] = useState('breakfast');
  const [selectedMeal, setSelectedMeal] = useState(null);

  const handleMealSelection = (meal) => {
    setSelectedMeal(meal);
    localStorage.setItem(`selectedMeal_${currentMealType}`, JSON.stringify(meal));
    setShowMealSuggestions(false);
  };

  const getSelectedMeal = () => {
    const saved = localStorage.getItem(`selectedMeal_${currentMealType}`);
    return saved ? JSON.parse(saved) : null;
  };

  const getMealsByType = (type: string) => {
    const meals = {
      breakfast: [
        { name: "Oats with Fruits", calories: 320, protein: "12g", emoji: "🥣" },
        { name: "Vegetable Upma", calories: 280, protein: "8g", emoji: "🍲" },
        { name: "Paneer Paratha", calories: 450, protein: "18g", emoji: "🫓" },
        { name: "Smoothie Bowl", calories: 250, protein: "10g", emoji: "🥤" }
      ],
      lunch: [
        { name: "Dal Rice", calories: 380, protein: "14g", emoji: "🍛" },
        { name: "Vegetable Biryani", calories: 420, protein: "12g", emoji: "🍚" },
        { name: "Paneer Curry", calories: 350, protein: "16g", emoji: "🍛" },
        { name: "Mixed Veg Thali", calories: 450, protein: "18g", emoji: "🍽️" }
      ],
      dinner: [
        { name: "Khichdi", calories: 250, protein: "10g", emoji: "🍲" },
        { name: "Roti with Sabzi", calories: 300, protein: "12g", emoji: "🫓" },
        { name: "Vegetable Soup", calories: 150, protein: "6g", emoji: "🍲" },
        { name: "Quinoa Salad", calories: 280, protein: "14g", emoji: "🥗" }
      ],
      snack1: [
        { name: "Fruit Bowl", calories: 120, protein: "2g", emoji: "🍎" },
        { name: "Nuts Mix", calories: 180, protein: "6g", emoji: "🥜" },
        { name: "Green Tea", calories: 5, protein: "0g", emoji: "🍵" }
      ],
      snack2: [
        { name: "Yogurt", calories: 100, protein: "8g", emoji: "🥛" },
        { name: "Sprouts Salad", calories: 150, protein: "10g", emoji: "🥗" },
        { name: "Herbal Tea", calories: 5, protein: "0g", emoji: "🍵" }
      ]
    };
    return meals[type] || [];
  };

  const getMealTypes = () => {
    if (mealInterval === '3') {
      return ['breakfast', 'lunch', 'dinner'];
    } else {
      return ['breakfast', 'snack1', 'lunch', 'snack2', 'dinner'];
    }
  };

  const getCurrentMealByTime = () => {
    const hour = new Date().getHours();
    if (mealInterval === '3') {
      if (hour < 11) return 'breakfast';
      if (hour < 17) return 'lunch';
      return 'dinner';
    } else {
      if (hour < 9) return 'breakfast';
      if (hour < 11) return 'snack1';
      if (hour < 15) return 'lunch';
      if (hour < 17) return 'snack2';
      return 'dinner';
    }
  };

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate("/login");
    } else {
      setUser(currentUser);
      // Show meal preferences popup on first login
      const hasSetPreferences = localStorage.getItem('mealInterval');
      if (!hasSetPreferences) {
        setTimeout(() => setShowMealPreferences(true), 1000);
      } else {
        // Set current meal type based on time
        const currentMeal = getCurrentMealByTime();
        setCurrentMealType(currentMeal);
        
        // Load selected meal for current meal type
        const saved = localStorage.getItem(`selectedMeal_${currentMeal}`);
        if (saved) {
          setSelectedMeal(JSON.parse(saved));
        }
        
        const hasShownToday = localStorage.getItem(`mealPopup_${new Date().toDateString()}`);
        if (!hasShownToday) {
          setTimeout(() => setShowMealSuggestions(true), 1500);
          localStorage.setItem(`mealPopup_${new Date().toDateString()}`, 'true');
        }
      }
    }
  }, [navigate]);

  useEffect(() => {
    // Update selected meal when meal type changes
    const saved = localStorage.getItem(`selectedMeal_${currentMealType}`);
    setSelectedMeal(saved ? JSON.parse(saved) : null);
  }, [currentMealType]);

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning! ☀️';
    if (hour < 17) return 'Good Afternoon! 🌤️';
    return 'Good Evening! 🌙';
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
            <p className="text-muted-foreground mb-4">Perfect breakfast suggestions for you</p>
            
            {/* Profile Stats */}
            <div className="flex flex-wrap gap-4">
              <div className="bg-white/80 backdrop-blur rounded-lg px-4 py-2 shadow-sm">
                <p className="text-xs text-muted-foreground">Diet</p>
                <p className="text-sm font-bold capitalize">Veg</p>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-lg px-4 py-2 shadow-sm">
                <p className="text-xs text-muted-foreground">Age</p>
                <p className="text-sm font-bold">18 years</p>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-lg px-4 py-2 shadow-sm">
                <p className="text-xs text-muted-foreground">Height</p>
                <p className="text-sm font-bold">164 cm</p>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-lg px-4 py-2 shadow-sm">
                <p className="text-xs text-muted-foreground">Weight</p>
                <p className="text-sm font-bold">50 kg</p>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-lg px-4 py-2 shadow-sm">
                <p className="text-xs text-muted-foreground">Daily Calories</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold">450/2000</p>
                  <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all"
                      style={{ width: `22.5%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-lg px-4 py-2 shadow-sm">
                <p className="text-xs text-muted-foreground">Water Intake</p>
                <p className="text-sm font-bold">0ml</p>
              </div>
            </div>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
            <FeatureCard
              title="Climate-Suggestions"
              description=""
              route="/dashboard/climate"
              icon={<Sun className="w-8 h-8 text-orange-500" />}
            />
            <div onClick={() => setShowClimateAlerts(true)}>
              <FeatureCard
                title="Climate Risk Alerts"
                description="⚠️ Health warnings"
                route="#climate-alerts"
                icon={<AlertCircle className="w-8 h-8 text-red-500" />}
                className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200 cursor-pointer"
              />
            </div>
            <div onClick={() => setShowFoodScanner(true)}>
              <FeatureCard
                title="Food Scanner"
                description="🔍 Check food suitability"
                route="#food-scanner"
                icon={<Scan className="w-8 h-8 text-blue-500" />}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 cursor-pointer"
              />
            </div>
            <FeatureCard
              title="Personalized Meal Planner"
              description="🍽️ Custom meal plans"
              route="/dashboard/meal-planner"
              icon={<UtensilsCrossed className="w-8 h-8 text-green-500" />}
            />
            <FeatureCard
              title="AI Recipe Chatbot"
              description="🤖 Cooking assistant"
              route="/dashboard/chatbot"
              icon={<Bot className="w-8 h-8 text-blue-500" />}
              className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200"
            />
            <FeatureCard
              title="Travel Mode"
              description="✈️ Meals on the go"
              route="/dashboard/travel"
              icon={<Plane className="w-8 h-8 text-purple-500" />}
              className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200"
            />
          </div>

          {/* Your Meal for Today Section */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-foreground capitalize">Your {currentMealType} for Today</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-2" onClick={() => setShowMealPreferences(true)}>
                  ⚙️ Preferences
                </Button>
                <Button variant="outline" size="sm" className="gap-2" onClick={() => setShowMealSuggestions(true)}>
                  📅 Change Meal
                </Button>
              </div>
            </div>
            
            {selectedMeal ? (
              <div className="bg-gradient-to-r from-green-50 to-orange-50 rounded-2xl p-6 border border-green-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{selectedMeal.emoji}</span>
                    <div>
                      <h4 className="text-xl font-bold text-foreground">{selectedMeal.name}</h4>
                      <p className="text-muted-foreground">{selectedMeal.calories} cal • {selectedMeal.protein} protein</p>
                    </div>
                  </div>
                  <Button variant="outline" onClick={() => setShowMealSuggestions(true)}>
                    Change
                  </Button>
                </div>
              </div>
            ) : (
              <div 
                className="border-dashed border-2 border-orange-200 bg-orange-50/50 rounded-2xl p-12 text-center cursor-pointer hover:bg-orange-100/50 transition-colors"
                onClick={() => setShowMealSuggestions(true)}
              >
                <div className="text-6xl mb-4">🍽️</div>
                <h4 className="text-lg font-semibold mb-2 capitalize">Select Your {currentMealType}</h4>
                <p className="text-muted-foreground text-center mb-4">
                  Choose your {currentMealType} to get personalized meal suggestions based on your preferences.
                </p>
              </div>
            )}
          </div>

          {/* Nutrition Analytics */}
          <div className="mb-6">
            <NutritionAnalytics />
          </div>

          {/* Seasonal Local Produce */}
          <div className="mb-6">
            <SeasonalLocalProduce locationData={locationData} />
          </div>

          {/* Climate Risk Alerts Modal */}
          {showClimateAlerts && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    Climate Risk Alerts
                  </h3>
                  <Button variant="ghost" size="sm" onClick={() => setShowClimateAlerts(false)}>✕</Button>
                </div>
                <ClimateRiskAlerts weatherData={locationData?.weather} />
              </div>
            </div>
          )}


          {/* Food Scanner Modal */}
          {showFoodScanner && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Scan className="w-5 h-5 text-blue-500" />
                    Food Scanner
                  </h3>
                  <Button variant="ghost" size="sm" onClick={() => setShowFoodScanner(false)}>✕</Button>
                </div>
                <FoodScanner />
              </div>
            </div>
          )}

          {/* Meal Preferences Modal */}
          {showMealPreferences && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">⚙️ Meal Preferences</h3>
                  <Button variant="ghost" size="sm" onClick={() => setShowMealPreferences(false)}>✕</Button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Meal Frequency</label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input 
                          type="radio" 
                          id="3meals" 
                          name="mealInterval" 
                          value="3" 
                          checked={mealInterval === '3'}
                          onChange={(e) => {
                            setMealInterval(e.target.value);
                            localStorage.setItem('mealInterval', e.target.value);
                          }}
                        />
                        <label htmlFor="3meals" className="text-sm">3 Meals (Breakfast, Lunch, Dinner)</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input 
                          type="radio" 
                          id="5meals" 
                          name="mealInterval" 
                          value="5" 
                          checked={mealInterval === '5'}
                          onChange={(e) => {
                            setMealInterval(e.target.value);
                            localStorage.setItem('mealInterval', e.target.value);
                          }}
                        />
                        <label htmlFor="5meals" className="text-sm">5 Meals (+ 2 Snacks)</label>
                      </div>
                    </div>
                  </div>
                  <Button 
                    onClick={() => {
                      setCurrentMealType(getCurrentMealByTime());
                      setShowMealPreferences(false);
                    }} 
                    className="w-full"
                  >
                    Save Preferences
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Meal Suggestions Modal */}
          {showMealSuggestions && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold capitalize">🍽️ {currentMealType} Suggestions</h3>
                  <Button variant="ghost" size="sm" onClick={() => setShowMealSuggestions(false)}>✕</Button>
                </div>
                <div className="flex gap-2 mb-4 overflow-x-auto">
                  {getMealTypes().map((type) => (
                    <Button
                      key={type}
                      size="sm"
                      variant={currentMealType === type ? "default" : "outline"}
                      onClick={() => setCurrentMealType(type)}
                      className="capitalize whitespace-nowrap"
                    >
                      {type === 'snack1' ? 'Morning Snack' : type === 'snack2' ? 'Evening Snack' : type}
                    </Button>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4">Based on your vegetarian preference</p>
                <div className="space-y-3">
                  {getMealsByType(currentMealType).map((meal, index) => (
                    <div key={index} className="bg-gradient-to-r from-green-50 to-orange-50 rounded-lg p-4 border border-green-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{meal.emoji}</span>
                          <div>
                            <h4 className="font-semibold text-foreground">{meal.name}</h4>
                            <p className="text-sm text-muted-foreground">{meal.calories} cal • {meal.protein} protein</p>
                          </div>
                        </div>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-xs"
                          onClick={() => handleMealSelection(meal)}
                        >
                          Select
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardHome;