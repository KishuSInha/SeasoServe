import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cloud, Sun, CloudRain, Snowflake } from "lucide-react";

interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
}

interface LocationData {
  weather: WeatherData;
  city: string;
}

interface ClimateBasedSuggestionsProps {
  locationData: LocationData | null;
}

const ClimateBasedSuggestions = ({ locationData }: ClimateBasedSuggestionsProps) => {
  if (!locationData?.weather) return null;

  const { temp, condition, humidity } = locationData.weather;

  const getWeatherIcon = () => {
    if (condition === 'Sunny') return <Sun className="w-6 h-6 text-yellow-500" />;
    if (condition === 'Rainy') return <CloudRain className="w-6 h-6 text-blue-500" />;
    if (condition === 'Cloudy') return <Cloud className="w-6 h-6 text-gray-500" />;
    if (temp < 10) return <Snowflake className="w-6 h-6 text-blue-300" />;
    return <Sun className="w-6 h-6 text-yellow-500" />;
  };

  const getClimateSuggestions = () => {
    if (temp > 25) {
      return {
        foods: ['🥒 Cucumber salad', '🍉 Watermelon', '🥥 Coconut water', '🍇 Fresh grapes', '🥗 Light leafy greens'],
        hydration: 'Drink 3-4L water daily. Add electrolytes and cooling herbs like mint.',
        avoid: ['Spicy foods', 'Heavy proteins', 'Hot beverages', 'Fried foods']
      };
    } else if (temp < 15) {
      return {
        foods: ['🍲 Warm soups', '🫖 Herbal teas', '🍯 Honey ginger', '🥜 Nuts & seeds', '🍠 Root vegetables'],
        hydration: 'Warm water with lemon. Herbal teas for immunity boost.',
        avoid: ['Cold drinks', 'Raw foods', 'Ice cream', 'Cold salads']
      };
    } else if (condition === 'Rainy') {
      return {
        foods: ['🍵 Ginger tea', '🥣 Light porridge', '🍌 Bananas', '🥖 Whole grains', '🫐 Antioxidant berries'],
        hydration: 'Warm fluids to aid digestion. Avoid excess water during meals.',
        avoid: ['Heavy meals', 'Dairy products', 'Oily foods', 'Cold beverages']
      };
    } else {
      return {
        foods: ['🥗 Mixed salads', '🍎 Fresh fruits', '🥑 Avocado', '🐟 Light proteins', '🌿 Fresh herbs'],
        hydration: 'Maintain regular water intake. Fresh fruit juices are beneficial.',
        avoid: ['Processed foods', 'Excess sugar', 'Heavy spices']
      };
    }
  };

  const suggestions = getClimateSuggestions();

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200 hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-3 text-lg">
          {getWeatherIcon()}
          <div>
            <div className="font-semibold">Climate-Based Suggestions</div>
            <div className="text-sm font-normal text-muted-foreground">
              {temp}°C • {condition} • {locationData.city}
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium text-sm text-green-700 mb-2">🍽️ Recommended Foods</h4>
          <ul className="space-y-1">
            {suggestions.foods.map((food, index) => (
              <li key={index} className="text-sm text-muted-foreground">• {food}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-medium text-sm text-blue-700 mb-2">💧 Hydration Tips</h4>
          <p className="text-sm text-muted-foreground">{suggestions.hydration}</p>
        </div>
        
        <div>
          <h4 className="font-medium text-sm text-red-700 mb-2">⚠️ Foods to Avoid</h4>
          <ul className="space-y-1">
            {suggestions.avoid.map((food, index) => (
              <li key={index} className="text-sm text-muted-foreground">• {food}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClimateBasedSuggestions;