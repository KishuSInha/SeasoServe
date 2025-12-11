import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Leaf, Droplets, Sun } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '@/components/BottomNav';
import AnimatedBackground from '@/components/AnimatedBackground';

const suggestions = [
  { name: 'Watermelon', benefit: 'Hydration & Cooling', reason: 'Perfect for hot, humid weather', score: 95, icon: Droplets, time: 'Morning' },
  { name: 'Cucumber', benefit: 'Cooling & Digestive', reason: 'Reduces body heat', score: 92, icon: Leaf, time: 'Afternoon' },
  { name: 'Coconut Water', benefit: 'Electrolyte Balance', reason: 'Replenishes minerals lost in humidity', score: 90, icon: Sun, time: 'Anytime' },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pb-24 relative overflow-hidden">
      <AnimatedBackground />
      <div className="px-4 py-8 max-w-7xl mx-auto relative z-10">
        <div className="mb-8 animate-fade-up">
          <h1 className="text-5xl font-black mb-3 text-gray-900 tracking-tight">Today's Suggestions</h1>
          <p className="text-gray-600 text-xl">Based on your climate and profile</p>
        </div>

        <Card className="p-6 mb-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white border-0 shadow-2xl rounded-3xl animate-fade-up" style={{animationDelay: '0.1s'}}>
          <div className="flex items-center gap-3">
            <Sun className="w-8 h-8" />
            <div>
              <p className="font-semibold">Monsoon Season • 28°C • Humid</p>
              <p className="text-sm opacity-90">Focus on light, cooling foods today</p>
            </div>
          </div>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {suggestions.map((food, i) => {
            const Icon = food.icon;
            return (
              <Card key={i} className="p-6 card-hover cursor-pointer animate-fade-up shadow-xl border-0 bg-white/90 backdrop-blur-sm rounded-3xl group" style={{animationDelay: `${(i + 2) * 0.1}s`}} onClick={() => navigate(`/food/${food.name.toLowerCase()}`)}>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 text-lg px-4 py-1.5 rounded-full">{food.score}%</Badge>
                  </div>
                  <h3 className="font-bold text-2xl text-gray-900 mb-1">{food.name}</h3>
                  <p className="text-sm text-gray-600">{food.benefit}</p>
                </div>

                <div className="space-y-2 mb-5">
                  <p className="text-sm text-gray-700 leading-relaxed"><span className="font-semibold">Why today:</span> {food.reason}</p>
                  <p className="text-sm text-gray-700"><span className="font-semibold">Best time:</span> {food.time}</p>
                </div>

                <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Meal Plan
                </Button>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-4 animate-fade-up" style={{animationDelay: '0.5s'}}>
          <Button className="bg-white/80 backdrop-blur-sm border-2 border-green-500 text-green-700 hover:bg-green-50 font-semibold shadow-lg rounded-2xl h-14 text-base" onClick={() => navigate('/seasonal')}>Seasonal Foods</Button>
          <Button className="bg-white/80 backdrop-blur-sm border-2 border-blue-500 text-blue-700 hover:bg-blue-50 font-semibold shadow-lg rounded-2xl h-14 text-base" onClick={() => navigate('/recipes')}>Recipes</Button>
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
