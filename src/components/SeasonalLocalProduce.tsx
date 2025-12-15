import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SeasonalLocalProduceProps {
  locationData?: any;
}

const SeasonalLocalProduce = ({ locationData }: SeasonalLocalProduceProps) => {
  const getCurrentSeason = () => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'autumn';
    return 'winter';
  };

  const seasonalProduce = {
    spring: [
      { name: 'Spinach', emoji: '🥬', benefit: 'Iron rich' },
      { name: 'Strawberries', emoji: '🍓', benefit: 'Vitamin C' },
      { name: 'Asparagus', emoji: '🌱', benefit: 'Detoxifying' },
      { name: 'Peas', emoji: '🟢', benefit: 'Protein boost' }
    ],
    summer: [
      { name: 'Watermelon', emoji: '🍉', benefit: 'Hydrating' },
      { name: 'Tomatoes', emoji: '🍅', benefit: 'Lycopene' },
      { name: 'Cucumber', emoji: '🥒', benefit: 'Cooling' },
      { name: 'Mango', emoji: '🥭', benefit: 'Vitamin A' }
    ],
    autumn: [
      { name: 'Pumpkin', emoji: '🎃', benefit: 'Beta carotene' },
      { name: 'Apples', emoji: '🍎', benefit: 'Fiber rich' },
      { name: 'Sweet Potato', emoji: '🍠', benefit: 'Complex carbs' },
      { name: 'Pomegranate', emoji: '🍇', benefit: 'Antioxidants' }
    ],
    winter: [
      { name: 'Oranges', emoji: '🍊', benefit: 'Immunity boost' },
      { name: 'Carrots', emoji: '🥕', benefit: 'Vitamin A' },
      { name: 'Cabbage', emoji: '🥬', benefit: 'Vitamin K' },
      { name: 'Ginger', emoji: '🫚', benefit: 'Anti-inflammatory' }
    ]
  };

  const currentSeason = getCurrentSeason();
  const currentProduce = seasonalProduce[currentSeason as keyof typeof seasonalProduce];

  return (
    <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          🌱 Seasonal Local Produce
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            {currentSeason.charAt(0).toUpperCase() + currentSeason.slice(1)}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {currentProduce.map((item, index) => (
            <div key={index} className="bg-white/80 rounded-lg p-3 shadow-sm">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">{item.emoji}</span>
                <div>
                  <p className="font-medium text-sm">{item.name}</p>
                  <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                    Best Now
                  </Badge>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{item.benefit}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default SeasonalLocalProduce;