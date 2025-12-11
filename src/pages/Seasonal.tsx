import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Apple, Carrot, Leaf, Coffee, Sparkles } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import AnimatedBackground from '@/components/AnimatedBackground';

const categories = [
  { id: 'fruits', label: 'Fruits', icon: Apple },
  { id: 'vegetables', label: 'Vegetables', icon: Carrot },
  { id: 'herbs', label: 'Herbs', icon: Leaf },
  { id: 'drinks', label: 'Drinks', icon: Coffee },
  { id: 'superfoods', label: 'Superfoods', icon: Sparkles },
];

const foods = {
  fruits: [
    { name: 'Watermelon', tags: ['Cooling', 'Immunity', 'Local'], season: 'Summer' },
    { name: 'Mango', tags: ['Energy', 'Budget'], season: 'Summer' },
    { name: 'Papaya', tags: ['Digestion', 'Local'], season: 'Year-round' },
  ],
  vegetables: [
    { name: 'Cucumber', tags: ['Cooling', 'Hydration'], season: 'Summer' },
    { name: 'Bottle Gourd', tags: ['Cooling', 'Digestion'], season: 'Monsoon' },
  ],
};

export default function Seasonal() {
  const [filter, setFilter] = useState<string | null>(null);
  const filters = ['Immunity', 'Budget', 'Local', 'Cooling', 'Heating'];

  return (
    <div className="min-h-screen pb-24 relative overflow-hidden">
      <AnimatedBackground />
      <div className="px-4 py-8 max-w-7xl mx-auto relative z-10">
        <h1 className="text-5xl font-black mb-3 text-gray-900 tracking-tight animate-fade-up">Seasonal Foods</h1>
        <p className="text-gray-600 mb-8 text-xl animate-fade-up" style={{animationDelay: '0.1s'}}>Explore what's fresh this season</p>

        <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide animate-fade-up" style={{animationDelay: '0.2s'}}>
          {filters.map(f => (
            <Badge
              key={f}
              variant={filter === f ? 'default' : 'outline'}
              className="cursor-pointer whitespace-nowrap rounded-full px-5 py-2 text-sm font-semibold transition-all duration-300 hover:scale-105"
              onClick={() => setFilter(filter === f ? null : f)}
            >
              {f}
            </Badge>
          ))}
        </div>

        <Tabs defaultValue="fruits" className="animate-fade-up" style={{animationDelay: '0.3s'}}>
          <TabsList className="grid grid-cols-5 mb-8 bg-white/80 backdrop-blur-sm p-2 rounded-2xl shadow-lg">
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <TabsTrigger key={cat.id} value={cat.id} className="flex flex-col gap-1.5 py-4 rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-blue-500 data-[state=active]:text-white transition-all duration-300">
                  <Icon className="w-4 h-4" />
                  <span className="text-xs">{cat.label}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {Object.entries(foods).map(([key, items]) => (
            <TabsContent key={key} value={key} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {items.map((food, i) => (
                <Card key={i} className="p-6 card-hover animate-fade-up shadow-xl border-0 bg-white/90 backdrop-blur-sm rounded-3xl" style={{animationDelay: `${i * 0.1}s`}}>
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-bold text-2xl text-gray-900">{food.name}</h3>
                    <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 rounded-full px-4 py-1">{food.season}</Badge>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {food.tags.map(tag => (
                      <Badge key={tag} className="bg-gray-100 text-gray-700 border-0 rounded-full text-xs px-3 py-1">{tag}</Badge>
                    ))}
                  </div>
                </Card>
              ))}
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <BottomNav />
    </div>
  );
}
