import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Plane, MapPin, Clock, Sun, Cloud, CloudRain, Snowflake } from "lucide-react";

const TravelMode = () => {
  const navigate = useNavigate();
  const [travelModeEnabled, setTravelModeEnabled] = useState(false);
  const [destination, setDestination] = useState("");
  const [destinationClimate, setDestinationClimate] = useState<string | null>(null);

  // Mock climate data for destinations
  const getDestinationClimate = (city: string) => {
    const climateData: { [key: string]: string } = {
      "new york": "cold",
      "miami": "hot",
      "london": "rainy",
      "tokyo": "mild",
      "dubai": "hot",
      "paris": "mild",
      "mumbai": "hot",
      "delhi": "hot",
      "bangalore": "mild",
      "chennai": "hot",
      "kolkata": "hot",
      "hyderabad": "hot",
      "pune": "mild",
      "ahmedabad": "hot",
      "jaipur": "hot",
      "surat": "hot",
      "lucknow": "mild",
      "kanpur": "hot",
      "nagpur": "hot",
      "indore": "hot",
      "thane": "hot",
      "bhopal": "mild",
      "visakhapatnam": "hot",
      "pimpri": "mild",
      "patna": "hot",
      "vadodara": "hot",
      "ghaziabad": "hot",
      "ludhiana": "mild",
      "agra": "hot",
      "nashik": "mild"
    };
    return climateData[city.toLowerCase()] || "mild";
  };

  // Food suggestions based on climate
  const getFoodSuggestions = (climate: string) => {
    const suggestions: { [key: string]: string[] } = {
      hot: ["Fresh salads", "Cold smoothies", "Coconut water", "Watermelon", "Cucumber dishes"],
      cold: ["Hot soups", "Warm tea", "Spiced foods", "Root vegetables", "Hearty stews"],
      rainy: ["Hot beverages", "Comfort foods", "Ginger tea", "Warm snacks", "Indoor meals"],
      mild: ["Balanced meals", "Seasonal fruits", "Light proteins", "Mixed vegetables", "Herbal teas"]
    };
    return suggestions[climate] || suggestions.mild;
  };

  const handleDestinationSubmit = () => {
    if (destination.trim()) {
      const climate = getDestinationClimate(destination);
      setDestinationClimate(climate);
    }
  };

  // Auto-reset logic: When travel mode is disabled, clear destination data
  const handleToggle = (enabled: boolean) => {
    setTravelModeEnabled(enabled);
    if (!enabled) {
      // Auto-reset: Clear destination and climate data when disabled
      setDestination("");
      setDestinationClimate(null);
    }
  };

  const getClimateIcon = (climate: string) => {
    switch (climate) {
      case "hot": return <Sun className="w-5 h-5 text-orange-500" />;
      case "cold": return <Snowflake className="w-5 h-5 text-blue-500" />;
      case "rainy": return <CloudRain className="w-5 h-5 text-gray-500" />;
      default: return <Cloud className="w-5 h-5 text-green-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-border py-3 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Button onClick={() => navigate("/dashboard")} variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <img src="/favicon.png" alt="SeasoServe" className="w-8 h-8" />
            <h1 className="text-xl font-bold text-foreground">Travel Mode</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 max-w-4xl py-6">
        {/* Travel Mode Toggle */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="w-5 h-5" />
                  Travel Mode
                  <span className={`text-sm px-2 py-1 rounded-full ${travelModeEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {travelModeEnabled ? 'ON' : 'OFF'}
                  </span>
                </CardTitle>
                <CardDescription>
                  Override your current location with destination climate
                </CardDescription>
              </div>
              <Switch
                checked={travelModeEnabled}
                onCheckedChange={handleToggle}
              />
            </div>
          </CardHeader>
          {travelModeEnabled && (
            <CardContent>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter destination city"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleDestinationSubmit()}
                />
                <Button onClick={handleDestinationSubmit}>
                  Get Climate
                </Button>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Climate-Based Food Suggestions */}
        {travelModeEnabled && destinationClimate && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getClimateIcon(destinationClimate)}
                Food Suggestions for {destination}
              </CardTitle>
              <CardDescription>
                Climate: {destinationClimate.charAt(0).toUpperCase() + destinationClimate.slice(1)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {getFoodSuggestions(destinationClimate).map((food, index) => (
                  <div key={index} className="bg-purple-50 rounded-lg p-3 text-sm">
                    {food}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Additional Travel Features */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-purple-500" />
                Destination Meals
              </CardTitle>
              <CardDescription>
                Discover local cuisine and healthy options at your travel destination
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white">
                Explore Destination Foods
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                Timezone Meals
              </CardTitle>
              <CardDescription>
                Adjust your meal timing for different time zones and jet lag recovery
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full border-purple-200 hover:bg-purple-50">
                Plan Timezone Meals
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plane className="w-5 h-5 text-green-500" />
                Airport & Flight Meals
              </CardTitle>
              <CardDescription>
                Healthy meal options for airports and long flights
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full border-purple-200 hover:bg-purple-50">
                Find Airport Foods
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-orange-500" />
                Travel Nutrition Tips
              </CardTitle>
              <CardDescription>
                Stay healthy and energized during your travels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full border-purple-200 hover:bg-purple-50">
                Get Travel Tips
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default TravelMode;