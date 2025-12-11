import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Flame, CloudRain } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';

const recipes = [
  {
    name: 'Watermelon Mint Cooler',
    category: 'Drinks',
    time: '5 min',
    calories: 45,
    weather: 'Hot & Humid',
    ingredients: ['Watermelon', 'Mint', 'Lemon', 'Salt'],
  },
  {
    name: 'Cucumber Raita',
    category: 'Quick Meals',
    time: '10 min',
    calories: 80,
    weather: 'Summer',
    ingredients: ['Cucumber', 'Yogurt', 'Cumin', 'Salt'],
  },
];

export default function Recipes() {
  return (
    <div className="min-h-screen pb-24 relative overflow-hidden">
      <AnimatedBackground />
      <div className="px-4 py-8 max-w-7xl mx-auto relative z-10">
        <h1 className="text-5xl font-black mb-3 text-gray-900 tracking-tight animate-fade-up">Seasonal Recipes</h1>
        <p className="text-gray-600 mb-8 text-xl animate-fade-up" style={{animationDelay: '0.1s'}}>Easy recipes with seasonal ingredients</p>

        <div className="grid gap-6 md:grid-cols-2">
          {recipes.map((recipe, i) => (
            <Card key={i} className="p-6 card-hover cursor-pointer animate-fade-up shadow-xl border-0 bg-white/90 backdrop-blur-sm rounded-3xl group" style={{animationDelay: `${(i + 2) * 0.1}s`}}>
              <div className="flex items-start justify-between mb-5">
                <div>
                  <h3 className="font-bold text-2xl mb-3 text-gray-900">{recipe.name}</h3>
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 rounded-full px-4 py-1.5">{recipe.category}</Badge>
                </div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <CloudRain className="w-7 h-7 text-white" />
                </div>
              </div>

              <div className="flex gap-6 mb-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {recipe.time}
                </div>
                <div className="flex items-center gap-1">
                  <Flame className="w-4 h-4" />
                  {recipe.calories} cal
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm font-semibold mb-2 text-gray-900">Ingredients:</p>
                <p className="text-sm text-gray-600 leading-relaxed">{recipe.ingredients.join(', ')}</p>
              </div>

              <Badge className="bg-blue-100 text-blue-700 border-0 rounded-full text-xs px-3 py-1.5">Best for: {recipe.weather}</Badge>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
