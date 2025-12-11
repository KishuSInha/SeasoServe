import { useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, Clock, Calendar, Heart } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function FoodDetail() {
  const { name } = useParams();

  const food = {
    name: 'Watermelon',
    season: 'Summer',
    bestTime: 'Morning or Afternoon',
    benefits: ['Hydration', 'Cooling', 'Rich in Vitamins A & C', 'Low Calorie'],
    nutrition: { calories: 30, protein: 0.6, carbs: 7.6, fiber: 0.4, vitaminC: 13 },
    precautions: 'Avoid eating at night or with meals',
    ayurveda: 'Cooling in nature, balances Pitta dosha',
  };

  return (
    <div className="min-h-screen pb-24 relative overflow-hidden">
      <AnimatedBackground />
      <div className="px-4 py-8 max-w-5xl mx-auto relative z-10">
        <div className="mb-8 animate-fade-up">
          <h1 className="text-6xl font-black mb-4 capitalize text-gray-900 tracking-tight">{name}</h1>
          <div className="flex gap-3">
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 text-lg px-6 py-2 rounded-full">Summer</Badge>
            <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 text-lg px-6 py-2 rounded-full">Cooling</Badge>
          </div>
        </div>

        <Tabs defaultValue="nutrition" className="space-y-6 animate-fade-up" style={{animationDelay: '0.1s'}}>
          <TabsList className="grid grid-cols-3 bg-white/80 backdrop-blur-sm p-2 rounded-2xl shadow-lg">
            <TabsTrigger value="nutrition" className="rounded-xl py-3 text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white transition-all duration-300">Nutrition</TabsTrigger>
            <TabsTrigger value="benefits" className="rounded-xl py-3 text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white transition-all duration-300">Benefits</TabsTrigger>
            <TabsTrigger value="tips" className="rounded-xl py-3 text-base font-semibold data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white transition-all duration-300">Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="nutrition">
            <Card className="p-8 shadow-xl border-0 bg-white/90 backdrop-blur-sm rounded-3xl">
              <h3 className="font-semibold mb-4">Nutritional Facts (per 100g)</h3>
              <div className="space-y-3">
                {Object.entries(food.nutrition).map(([key, val]) => (
                  <div key={key}>
                    <div className="flex justify-between mb-1">
                      <span className="capitalize text-sm">{key}</span>
                      <span className="font-medium">{val}{key === 'calories' ? ' kcal' : 'g'}</span>
                    </div>
                    <Progress value={val * 2} className="h-2" />
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="benefits">
            <Card className="p-8 shadow-xl border-0 bg-white/90 backdrop-blur-sm rounded-3xl">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Health Benefits
              </h3>
              <ul className="space-y-2">
                {food.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </TabsContent>

          <TabsContent value="tips" className="space-y-5">
            <Card className="p-6 flex gap-4 shadow-xl border-0 bg-white/90 backdrop-blur-sm rounded-3xl">
              <Clock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium mb-1">Best Time to Eat</p>
                <p className="text-sm text-muted-foreground">{food.bestTime}</p>
              </div>
            </Card>

            <Card className="p-6 flex gap-4 shadow-xl border-0 bg-white/90 backdrop-blur-sm rounded-3xl">
              <Calendar className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium mb-1">Seasonal Availability</p>
                <p className="text-sm text-muted-foreground">{food.season}</p>
              </div>
            </Card>

            <Card className="p-6 flex gap-4 bg-gradient-to-r from-orange-100 to-red-100 border-0 shadow-xl rounded-3xl">
              <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium mb-1 text-orange-900">Precautions</p>
                <p className="text-sm text-orange-800">{food.precautions}</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
