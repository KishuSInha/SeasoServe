import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "@/lib/auth";
import { useLocation } from "@/hooks/useLocation";
import { 
  ArrowLeft, Calendar, MapPin, Thermometer, Droplets, Sun, Cloud, 
  UtensilsCrossed, Clock, Target, RefreshCw, ThumbsUp, ThumbsDown,
  Download, Share, Bell, ShoppingCart, ChefHat, RotateCcw, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const MealPlan = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [planType, setPlanType] = useState<'today' | 'weekly'>('today');
  const [expandedIngredients, setExpandedIngredients] = useState(false);
  const [expandedSubstitutions, setExpandedSubstitutions] = useState(false);
  const { locationData, detectLocation } = useLocation();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate("/login");
    } else {
      setUser(currentUser);
      // Auto-detect location for meal plan
      if (!locationData) {
        detectLocation();
      }
    }
  }, [navigate, locationData, detectLocation]);

  const mealInterval = localStorage.getItem('mealInterval') || '3-meals';

  const getMealPlan = () => {
    const isHot = locationData?.weather?.temp > 25;
    const isHighHumidity = locationData?.weather?.humidity > 70;
    
    const meals = [
      {
        id: 'breakfast',
        name: 'Breakfast',
        time: '7:00 AM',
        emoji: '🌅',
        meal: {
          name: 'Coconut Water Smoothie Bowl',
          image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400',
          calories: 280,
          climateTag: '❄️ Cooling',
          reason: 'Hydrates and cools your body in hot weather',
          ingredients: ['Coconut water', 'Banana', 'Mango', 'Chia seeds', 'Mint'],
          protein: 8, fiber: 6
        }
      },
      {
        id: 'lunch',
        name: 'Lunch',
        time: '12:30 PM',
        emoji: '☀️',
        meal: {
          name: 'Cucumber Mint Salad',
          image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400',
          calories: 320,
          climateTag: '❄️ Cooling',
          reason: 'Light and refreshing for high humidity',
          ingredients: ['Cucumber', 'Mint', 'Lemon', 'Chickpeas', 'Olive oil'],
          protein: 12, fiber: 8
        }
      },
      {
        id: 'dinner',
        name: 'Dinner',
        time: '7:00 PM',
        emoji: '🌙',
        meal: {
          name: 'Vegetable Khichdi',
          image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400',
          calories: 420,
          climateTag: '🌧️ Digestive',
          reason: 'Easy to digest in humid weather',
          ingredients: ['Rice', 'Moong dal', 'Vegetables', 'Turmeric', 'Ginger'],
          protein: 15, fiber: 10
        }
      }
    ];

    if (mealInterval === '5-meals') {
      meals.splice(1, 0, {
        id: 'snack1',
        name: 'Morning Snack',
        time: '10:00 AM',
        emoji: '🍎',
        meal: {
          name: 'Watermelon Cubes',
          image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400',
          calories: 80,
          climateTag: '❄️ Hydrating',
          reason: 'Perfect hydration boost',
          ingredients: ['Watermelon', 'Mint', 'Black salt'],
          protein: 2, fiber: 1
        }
      });
      meals.push({
        id: 'snack2',
        name: 'Evening Snack',
        time: '4:30 PM',
        emoji: '🥜',
        meal: {
          name: 'Coconut Water',
          image: 'https://images.unsplash.com/photo-1447279506476-3faec8071eee?w=400',
          calories: 60,
          climateTag: '❄️ Cooling',
          reason: 'Natural electrolyte replenishment',
          ingredients: ['Fresh coconut water', 'Lemon'],
          protein: 1, fiber: 0
        }
      });
    }

    return meals;
  };

  const getClimateInsight = () => {
    const temp = locationData?.weather?.temp || 25;
    const humidity = locationData?.weather?.humidity || 60;
    
    if (temp > 30 && humidity > 70) {
      return {
        condition: 'High heat and humidity detected',
        recommendation: 'Light, hydrating, non-oily meals recommended',
        direction: 'Cooling'
      };
    } else if (temp > 25) {
      return {
        condition: 'Hot weather detected',
        recommendation: 'Cooling foods and increased hydration needed',
        direction: 'Cooling'
      };
    } else {
      return {
        condition: 'Moderate weather',
        recommendation: 'Balanced warm and cool foods suitable',
        direction: 'Balanced'
      };
    }
  };

  const getTotalNutrition = () => {
    const meals = getMealPlan();
    return {
      calories: meals.reduce((sum, meal) => sum + meal.meal.calories, 0),
      protein: meals.reduce((sum, meal) => sum + meal.meal.protein, 0),
      fiber: meals.reduce((sum, meal) => sum + meal.meal.fiber, 0),
      hydration: 85,
      seasonalAlignment: 92
    };
  };

  const getSubstitutions = () => [
    { from: 'Rice', to: 'Millets', reason: 'Better for humidity' },
    { from: 'Dairy milk', to: 'Coconut milk', reason: 'Cooling in hot weather' },
    { from: 'Heavy oils', to: 'Light oils', reason: 'Easier digestion' }
  ];

  const getTimingTips = () => [
    'Eat lunch before 2 PM to avoid peak heat',
    'Avoid heavy dinner in hot weather',
    'Drink coconut water between meals'
  ];

  if (!user) return null;

  const climateInsight = getClimateInsight();
  const nutrition = getTotalNutrition();
  const meals = getMealPlan();

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-border py-3 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 flex items-center gap-4">
          <Button onClick={() => navigate("/dashboard")} variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-xl font-bold">Meal Plan</h1>
        </div>
      </header>

      <main className="pb-24">
        <div className="container mx-auto px-4 max-w-4xl">
          
          {/* Meal Plan Header */}
          <Card className="mb-6 shadow-md">
            <CardHeader>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <CardTitle className="text-2xl mb-2">Your Personalized Meal Plan</CardTitle>
                  <div className="flex gap-2 mb-3">
                    <Button 
                      size="sm" 
                      variant={planType === 'today' ? 'default' : 'outline'}
                      onClick={() => setPlanType('today')}
                    >
                      Today
                    </Button>
                    <Button 
                      size="sm" 
                      variant={planType === 'weekly' ? 'default' : 'outline'}
                      onClick={() => setPlanType('weekly')}
                    >
                      Weekly
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="bg-orange-50 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground">Climate</p>
                  <p className="text-sm font-bold">{locationData?.weather?.condition || 'Loading...'} · {locationData?.weather?.temp || '--'}°C · {locationData?.weather?.humidity || '--'}% Humidity</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="text-sm font-bold">{locationData?.city || 'Detecting location...'}</p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground">Diet Goal</p>
                  <p className="text-sm font-bold capitalize">{user?.dietType || 'Balanced'}</p>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="text-xs text-muted-foreground">Meals per day</p>
                  <p className="text-sm font-bold">{mealInterval === '5-meals' ? '5' : mealInterval === '2-meals' ? '2' : '3'}</p>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground italic">
                This plan adapts to today's weather and your preferences.
              </p>
            </CardHeader>
          </Card>

          {/* Climate Insight Card */}
          <Card className="mb-6 shadow-md bg-gradient-to-r from-blue-50 to-cyan-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-blue-500" />
                Today's Climate Insight
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-2">
                <strong>{climateInsight.condition}</strong> → {climateInsight.recommendation}
              </p>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                {climateInsight.direction} Foods Recommended
              </Badge>
            </CardContent>
          </Card>

          {/* Meal-by-Meal Plan */}
          <div className="space-y-4 mb-6">
            <h3 className="text-xl font-bold">Today's Meals</h3>
            {meals.map((mealSlot) => (
              <Card key={mealSlot.id} className="shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{mealSlot.emoji}</span>
                    <div>
                      <CardTitle className="text-lg">{mealSlot.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{mealSlot.time}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="md:col-span-1">
                      <img 
                        src={mealSlot.meal.image} 
                        alt={mealSlot.meal.name}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <h4 className="font-bold text-lg mb-2">{mealSlot.meal.name}</h4>
                      <div className="flex gap-4 mb-2">
                        <span className="text-sm font-medium">{mealSlot.meal.calories} kcal</span>
                        <Badge variant="outline">{mealSlot.meal.climateTag}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{mealSlot.meal.reason}</p>
                      
                      {/* Smart Actions */}
                      <div className="flex gap-2 flex-wrap">
                        <Button size="sm" variant="outline" className="gap-1">
                          <ChefHat className="w-3 h-3" />
                          View Recipe
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1">
                          <RotateCcw className="w-3 h-3" />
                          Replace Meal
                        </Button>
                        <Button size="sm" variant="outline" className="gap-1">
                          <Zap className="w-3 h-3" />
                          Change Portion
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Ingredient Breakdown */}
          <Card className="mb-6 shadow-md">
            <CardHeader>
              <CardTitle 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedIngredients(!expandedIngredients)}
              >
                <span>Ingredient Breakdown</span>
                <Button variant="ghost" size="sm">
                  {expandedIngredients ? '−' : '+'}
                </Button>
              </CardTitle>
            </CardHeader>
            {expandedIngredients && (
              <CardContent>
                <div className="space-y-3">
                  {meals.map((meal) => (
                    <div key={meal.id} className="border-l-4 border-orange-200 pl-4">
                      <h5 className="font-medium">{meal.meal.name}</h5>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {meal.meal.ingredients.map((ingredient, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {ingredient}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                  <Button className="w-full mt-4 gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    Generate Grocery List
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Substitutions & Flexibility */}
          <Card className="mb-6 shadow-md">
            <CardHeader>
              <CardTitle 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedSubstitutions(!expandedSubstitutions)}
              >
                <span>Smart Substitutions</span>
                <Button variant="ghost" size="sm">
                  {expandedSubstitutions ? '−' : '+'}
                </Button>
              </CardTitle>
            </CardHeader>
            {expandedSubstitutions && (
              <CardContent>
                <div className="space-y-2">
                  {getSubstitutions().map((sub, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <span className="font-medium">{sub.from}</span>
                      <span>→</span>
                      <span className="font-medium text-green-600">{sub.to}</span>
                      <span className="text-muted-foreground">({sub.reason})</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>

          {/* Nutrition Snapshot */}
          <Card className="mb-6 shadow-md">
            <CardHeader>
              <CardTitle>Nutrition Snapshot</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Total Calories</span>
                    <span className="font-semibold">{nutrition.calories} kcal</span>
                  </div>
                  <Progress value={65} className="h-2 mb-3" />
                  
                  <div className="flex justify-between text-sm mb-1">
                    <span>Protein</span>
                    <span className="font-semibold">{nutrition.protein}g</span>
                  </div>
                  <Progress value={70} className="h-2 mb-3" />
                  
                  <div className="flex justify-between text-sm mb-1">
                    <span>Fiber</span>
                    <span className="font-semibold">{nutrition.fiber}g</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Hydration Score</span>
                    <span className="font-semibold">{nutrition.hydration}%</span>
                  </div>
                  <Progress value={nutrition.hydration} className="h-2 mb-3" />
                  
                  <div className="flex justify-between text-sm mb-1">
                    <span>Seasonal Alignment</span>
                    <span className="font-semibold">{nutrition.seasonalAlignment}%</span>
                  </div>
                  <Progress value={nutrition.seasonalAlignment} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timing & Eating Tips */}
          <Card className="mb-6 shadow-md bg-gradient-to-r from-yellow-50 to-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-500" />
                Climate-Based Eating Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-1">
                {getTimingTips().map((tip, i) => (
                  <li key={i} className="text-sm flex items-start gap-2">
                    <span className="text-orange-500 mt-1">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* User Feedback */}
          <Card className="mb-20 shadow-md">
            <CardHeader>
              <CardTitle>How's this plan?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Button variant="outline" className="gap-2">
                  <ThumbsUp className="w-4 h-4" />
                  I liked this plan
                </Button>
                <Button variant="outline" className="gap-2">
                  <ThumbsDown className="w-4 h-4" />
                  Change meals
                </Button>
                <Button variant="outline" className="gap-2">
                  <RefreshCw className="w-4 h-4" />
                  Regenerate
                </Button>
              </div>
            </CardContent>
          </Card>

        </div>
      </main>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-border py-3 shadow-lg z-40">
        <div className="container mx-auto px-4 flex justify-around items-center max-w-2xl">
          <Button variant="ghost" size="sm" className="flex-col h-auto gap-1">
            <Download className="w-5 h-5" />
            <span className="text-xs">Save Plan</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-auto gap-1">
            <Download className="w-5 h-5" />
            <span className="text-xs">Download</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-auto gap-1">
            <Share className="w-5 h-5" />
            <span className="text-xs">Share</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col h-auto gap-1">
            <Bell className="w-5 h-5" />
            <span className="text-xs">Reminder</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MealPlan;