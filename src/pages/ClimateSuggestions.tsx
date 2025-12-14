import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MapPin, Loader2, Sun, CloudRain, Snowflake, Wind, Droplets, Thermometer, X, Clock, Shield, Lightbulb, RefreshCw, ThumbsUp, ThumbsDown, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ClimateSuggestions = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<string>("");
  const [climate, setClimate] = useState<string>("");
  const [temperature, setTemperature] = useState<number>(0);
  const [humidity, setHumidity] = useState<number>(0);
  const [season, setSeason] = useState<string>("");
  const [foods, setFoods] = useState<any[]>([]);

  const climateData: any = {
    hot: {
      icon: Sun,
      color: "text-sun-yellow",
      bg: "bg-sun-yellow/10",
      foods: [
        { name: "Watermelon", reason: "High water content for hydration", emoji: "🍉" },
        { name: "Cucumber", reason: "Cooling effect and electrolytes", emoji: "🥒" },
        { name: "Coconut Water", reason: "Natural electrolyte replenishment", emoji: "🥥" },
        { name: "Mint Yogurt", reason: "Cooling probiotics for gut health", emoji: "🍦" },
      ]
    },
    rainy: {
      icon: CloudRain,
      color: "text-sky-blue",
      bg: "bg-sky-blue/10",
      foods: [
        { name: "Ginger Tea", reason: "Boosts immunity and aids digestion", emoji: "🍵" },
        { name: "Turmeric Soup", reason: "Anti-inflammatory properties", emoji: "🍲" },
        { name: "Roasted Corn", reason: "Easy to digest, warm comfort food", emoji: "🌽" },
        { name: "Garlic Vegetables", reason: "Natural antibacterial benefits", emoji: "🧄" },
      ]
    },
    cold: {
      icon: Snowflake,
      color: "text-sky-blue",
      bg: "bg-sky-blue/10",
      foods: [
        { name: "Hot Soup", reason: "Warms body and provides nutrients", emoji: "🍜" },
        { name: "Root Vegetables", reason: "Sustained energy release", emoji: "🥕" },
        { name: "Oatmeal", reason: "Complex carbs for lasting warmth", emoji: "🥣" },
        { name: "Nuts & Dried Fruits", reason: "Healthy fats and calories", emoji: "🥜" },
      ]
    },
    windy: {
      icon: Wind,
      color: "text-muted-foreground",
      bg: "bg-muted/50",
      foods: [
        { name: "Warm Stews", reason: "Grounding and satisfying", emoji: "🍲" },
        { name: "Cooked Grains", reason: "Easy on digestion", emoji: "🍚" },
        { name: "Steamed Vegetables", reason: "Gentle on the system", emoji: "🥦" },
        { name: "Herbal Tea", reason: "Calming and warming", emoji: "🍵" },
      ]
    },
    humid: {
      icon: Droplets,
      color: "text-leaf-green",
      bg: "bg-leaf-green/10",
      foods: [
        { name: "Light Salads", reason: "Easy digestion in heavy weather", emoji: "🥗" },
        { name: "Bitter Greens", reason: "Help balance body moisture", emoji: "🥬" },
        { name: "Barley Water", reason: "Natural diuretic properties", emoji: "🥤" },
        { name: "Citrus Fruits", reason: "Refreshing and vitamin-rich", emoji: "🍊" },
      ]
    }
  };

  const detectLocation = () => {
    setLoading(true);
    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          
          // Set coordinates immediately as fallback
          setLocation(`${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`);
          
          // Reverse geocoding to get location name using BigDataCloud (no API key needed)
          fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
            .then(response => response.json())
            .then(data => {
              console.log('Location data:', data);
              const city = data.city || data.locality || data.principalSubdivision;
              const country = data.countryName;
              
              if (city && country) {
                setLocation(`${city}, ${country}`);
              } else if (country) {
                setLocation(country);
              }
            })
            .catch(error => {
              console.error('Geocoding error:', error);
            });
          
          // Get real-time weather data (runs in parallel with geocoding)
          try {
            const weatherResponse = await fetch(
              `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,precipitation,rain,wind_speed_10m`
            );
            
            if (weatherResponse.ok) {
              const weatherData = await weatherResponse.json();
              const current = weatherData.current;
              
              console.log('Weather data:', current);
              
              // Store weather data
              setTemperature(Math.round(current.temperature_2m));
              setHumidity(Math.round(current.relative_humidity_2m));
              
              // Determine season based on month
              const month = new Date().getMonth();
              if (month >= 2 && month <= 4) setSeason("Spring");
              else if (month >= 5 && month <= 8) setSeason("Summer");
              else if (month >= 9 && month <= 10) setSeason("Autumn");
              else setSeason("Winter");
              
              // Determine climate based on real weather conditions
              let detectedClimate = "hot";
              
              if (current.rain > 0 || current.precipitation > 0) {
                detectedClimate = "rainy";
              } else if (current.temperature_2m < 15) {
                detectedClimate = "cold";
              } else if (current.temperature_2m > 30) {
                detectedClimate = "hot";
              } else if (current.relative_humidity_2m > 70) {
                detectedClimate = "humid";
              } else if (current.wind_speed_10m > 20) {
                detectedClimate = "windy";
              } else if (current.temperature_2m >= 15 && current.temperature_2m <= 30) {
                detectedClimate = current.relative_humidity_2m > 60 ? "humid" : "hot";
              }
              
              setClimate(detectedClimate);
              setFoods(climateData[detectedClimate].foods);
              setLoading(false);
              
              toast({
                title: "Location Detected!",
                description: `${Math.round(current.temperature_2m)}°C, ${detectedClimate.charAt(0).toUpperCase() + detectedClimate.slice(1)} climate`,
              });
            } else {
              throw new Error('Weather API failed');
            }
          } catch (weatherError) {
            console.error('Weather detection error:', weatherError);
            // Fallback to simple latitude-based detection
            let detectedClimate = "hot";
            if (latitude > 60 || latitude < -60) {
              detectedClimate = "cold";
            } else if (latitude > 40 || latitude < -40) {
              detectedClimate = "windy";
            }
            
            setClimate(detectedClimate);
            setFoods(climateData[detectedClimate].foods);
            setLoading(false);
            
            toast({
              title: "Location Detected!",
              description: `Climate: ${detectedClimate.charAt(0).toUpperCase() + detectedClimate.slice(1)}`,
            });
          }
        },
        (error) => {
          setLoading(false);
          toast({
            title: "Location Error",
            description: "Please enable location access to get personalized suggestions.",
            variant: "destructive",
          });
        }
      );
    } else {
      setLoading(false);
      toast({
        title: "Not Supported",
        description: "Geolocation is not supported by your browser.",
        variant: "destructive",
      });
    }
  };

  const ClimateIcon = climate ? climateData[climate]?.icon : Sun;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-border py-3 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 flex items-center gap-4">
          <Button onClick={() => navigate("/dashboard")} variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-xl font-bold text-foreground">Climate-based Suggestions</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          
          {!climate ? (
            <Card className="text-center">
              <CardHeader>
                <div className="mx-auto w-20 h-20 rounded-full bg-sun-yellow/20 flex items-center justify-center mb-4">
                  <MapPin className="w-10 h-10 text-sun-yellow" />
                </div>
                <CardTitle>Detect Your Location</CardTitle>
                <CardDescription>
                  We'll analyze your local climate and suggest the best foods for you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={detectLocation} 
                  disabled={loading}
                  className="gap-2"
                  size="lg"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Detecting...
                    </>
                  ) : (
                    <>
                      <MapPin className="w-5 h-5" />
                      Detect My Location
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* 1. Climate Snapshot */}
              <Card className="shadow-lg bg-gradient-to-br from-orange-50 to-yellow-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ClimateIcon className={`w-6 h-6 ${climateData[climate].color}`} />
                    Climate Snapshot
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span className="font-semibold">{location}</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Badge className="bg-white/80 text-foreground">{season}</Badge>
                    <Badge className="bg-white/80 text-foreground">
                      <Thermometer className="w-3 h-3 mr-1" />
                      {temperature}°C
                    </Badge>
                    <Badge className="bg-white/80 text-foreground">
                      <Droplets className="w-3 h-3 mr-1" />
                      {humidity}% Humidity
                    </Badge>
                    <Badge className={`${climateData[climate].bg} ${climateData[climate].color} capitalize`}>
                      {climate} Weather
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* 2. Recommended Foods */}
              <div>
                <h3 className="text-xl font-bold text-foreground mb-4">🍽️ Recommended Foods</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {foods.map((food, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start gap-3">
                          <span className="text-4xl">{food.emoji}</span>
                          <div className="flex-1">
                            <CardTitle className="text-base mb-1">{food.name}</CardTitle>
                            <CardDescription className="text-sm">{food.reason}</CardDescription>
                            <Badge className="mt-2 text-xs" variant="outline">
                              {climate === 'hot' || climate === 'humid' ? '☀️ Cooling' : '❄️ Warming'}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>

              {/* 3. Foods to Avoid */}
              <Card className="shadow-md border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-800">
                    <X className="w-5 h-5" />
                    Foods to Avoid
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-red-700">
                  {climate === 'hot' && (
                    <>
                      <p>❌ Deep-fried snacks – cause dehydration in hot weather</p>
                      <p>❌ Spicy foods – increase body heat</p>
                      <p>❌ Heavy dairy – hard to digest in heat</p>
                    </>
                  )}
                  {climate === 'cold' && (
                    <>
                      <p>❌ Cold beverages – lower body temperature</p>
                      <p>❌ Raw salads – hard to digest in cold</p>
                      <p>❌ Ice cream – can cause throat issues</p>
                    </>
                  )}
                  {climate === 'rainy' && (
                    <>
                      <p>❌ Street food – risk of contamination</p>
                      <p>❌ Raw vegetables – bacterial growth risk</p>
                      <p>❌ Fried items – slow digestion in humidity</p>
                    </>
                  )}
                  {(climate === 'humid' || climate === 'windy') && (
                    <>
                      <p>❌ Heavy meals – difficult digestion</p>
                      <p>❌ Oily foods – cause sluggishness</p>
                      <p>❌ Excess salt – water retention</p>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* 4. Hydration & Drinks */}
              <Card className="shadow-md bg-gradient-to-br from-blue-50 to-cyan-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-blue-500" />
                    Hydration & Drinks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="text-3xl mb-2">🥥</div>
                      <p className="text-sm font-medium">Coconut Water</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="text-3xl mb-2">🥛</div>
                      <p className="text-sm font-medium">Buttermilk</p>
                    </div>
                    <div className="text-center p-3 bg-white rounded-lg">
                      <div className="text-3xl mb-2">🍋</div>
                      <p className="text-sm font-medium">Lemon Water</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* 5. Meal Timing Tips */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-500" />
                    Meal Timing Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  {climate === 'hot' && (
                    <>
                      <p>• Eat light meals during peak afternoon heat</p>
                      <p>• Avoid heavy dinners after 8 PM</p>
                      <p>• Start day with hydrating fruits</p>
                    </>
                  )}
                  {climate === 'cold' && (
                    <>
                      <p>• Eat heavy meals before sunset</p>
                      <p>• Prefer warm breakfasts</p>
                      <p>• Have dinner by 7 PM for better digestion</p>
                    </>
                  )}
                  {(climate === 'rainy' || climate === 'humid' || climate === 'windy') && (
                    <>
                      <p>• Eat smaller, frequent meals</p>
                      <p>• Avoid late-night oily food</p>
                      <p>• Have warm soups in evening</p>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* 6. Digestive & Immunity Tips */}
              <Card className="shadow-md bg-gradient-to-br from-green-50 to-lime-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-500" />
                    Digestive & Immunity Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  {climate === 'cold' && <p>• Add ginger to meals for warmth</p>}
                  {climate === 'hot' && <p>• Include curd only during daytime</p>}
                  {climate === 'rainy' && <p>• Avoid raw foods during heavy rain</p>}
                  <p>• Drink warm water throughout the day</p>
                  <p>• Include turmeric for immunity boost</p>
                </CardContent>
              </Card>

              {/* 7. Local & Seasonal Alternatives */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-orange-500" />
                    Local & Seasonal Alternatives
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>🥭 Mango not available? Try Papaya for similar cooling effect</p>
                  <p>🥒 Cucumber alternative: Bottle gourd (Lauki)</p>
                  <p>🌶️ Ginger substitute: Black pepper for warmth</p>
                </CardContent>
              </Card>

              {/* 8. Smart Substitutions */}
              <Card className="shadow-md bg-gradient-to-br from-yellow-50 to-orange-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <RefreshCw className="w-5 h-5 text-yellow-600" />
                    Smart Substitutions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  {climate === 'humid' && <p>🌾 Rice → Millets (better for humid climate)</p>}
                  {climate === 'hot' && <p>🥛 Dairy → Plant-based (lighter in heat)</p>}
                  <p>🌶️ Spicy → Mild (easier digestion)</p>
                </CardContent>
              </Card>

              {/* 9. Travel-Specific Warnings */}
              <Card className="shadow-md border-orange-200 bg-orange-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-800">
                    <AlertTriangle className="w-5 h-5" />
                    Travel-Specific Warnings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm text-orange-700">
                  <p>⚠️ Avoid street food in rainy regions while travelling</p>
                  <p>⚠️ Drink only bottled or boiled water</p>
                  <p>⚠️ Skip raw salads in unfamiliar places</p>
                </CardContent>
              </Card>

              {/* 10. User Feedback Controls */}
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Was this helpful?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 gap-2">
                      <ThumbsUp className="w-4 h-4" />
                      Useful
                    </Button>
                    <Button variant="outline" className="flex-1 gap-2">
                      <ThumbsDown className="w-4 h-4" />
                      Not relevant
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="text-xs">Show less spicy</Button>
                    <Button variant="ghost" size="sm" className="text-xs">More vegetarian</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Retry Button */}
              <Button 
                onClick={detectLocation} 
                variant="outline" 
                className="w-full gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Detect Again
              </Button>
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default ClimateSuggestions;
