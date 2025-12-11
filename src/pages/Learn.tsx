import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Clock } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import AnimatedBackground from '@/components/AnimatedBackground';

const articles = [
  { title: 'Why Seasonal Eating Matters', category: 'Nutrition', time: '5 min read' },
  { title: 'Ayurvedic Diet Principles', category: 'Traditional', time: '8 min read' },
  { title: 'Foods to Avoid in Monsoon', category: 'Seasonal', time: '4 min read' },
];

export default function Learn() {
  return (
    <div className="min-h-screen pb-24 relative overflow-hidden">
      <AnimatedBackground />
      <div className="px-4 py-8 max-w-5xl mx-auto relative z-10">
        <h1 className="text-5xl font-black mb-3 text-gray-900 tracking-tight animate-fade-up">Learn</h1>
        <p className="text-gray-600 mb-8 text-xl animate-fade-up" style={{animationDelay: '0.1s'}}>Discover nutrition wisdom</p>

        <div className="grid gap-6 md:grid-cols-2">
          {articles.map((article, i) => (
            <Card key={i} className="p-6 card-hover cursor-pointer animate-fade-up shadow-xl border-0 bg-white/90 backdrop-blur-sm rounded-3xl group" style={{animationDelay: `${(i + 2) * 0.1}s`}}>
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-xl mb-3 text-gray-900">{article.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">{article.category}</Badge>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {article.time}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
