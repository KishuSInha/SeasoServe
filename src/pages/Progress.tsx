import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Droplets, Apple, Smile } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';
import BottomNav from '@/components/BottomNav';

export default function ProgressPage() {
  const stats = [
    { label: 'Seasonal Foods', value: 7, total: 7, icon: Apple, color: 'text-green-600' },
    { label: 'Hydration', value: 6, total: 8, icon: Droplets, color: 'text-blue-600' },
    { label: 'Mood Score', value: 8, total: 10, icon: Smile, color: 'text-yellow-600' },
  ];

  return (
    <div className="min-h-screen pb-24 relative overflow-hidden">
      <AnimatedBackground />
      <div className="px-4 py-8 max-w-5xl mx-auto relative z-10">
        <h1 className="text-5xl font-black mb-3 text-gray-900 tracking-tight animate-fade-up">Your Progress</h1>
        <p className="text-gray-600 mb-8 text-xl animate-fade-up" style={{animationDelay: '0.1s'}}>Track your health journey</p>

        <Card className="p-8 mb-8 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white border-0 shadow-2xl rounded-3xl animate-fade-up" style={{animationDelay: '0.2s'}}>
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-6 h-6" />
            <h3 className="text-xl font-semibold">7 Day Streak!</h3>
          </div>
          <p className="text-sm opacity-90">You've eaten seasonal foods for 7 days straight</p>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <Card key={i} className="p-6 card-hover animate-fade-up shadow-xl border-0 bg-white/90 backdrop-blur-sm rounded-3xl" style={{animationDelay: `${(i + 3) * 0.1}s`}}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                    <span className="font-semibold">{stat.label}</span>
                  </div>
                  <Badge>{stat.value}/{stat.total}</Badge>
                </div>
                <Progress value={(stat.value / stat.total) * 100} className="h-2" />
              </Card>
            );
          })}
        </div>
      </div>
      <BottomNav />
    </div>
  );
}
