import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, Leaf, CloudSun, Heart, Sparkles } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';

const slides = [
  {
    icon: Leaf,
    title: 'Eat with the Seasons',
    description: 'Seasonal foods are fresher, more nutritious, and naturally aligned with your body\'s needs.',
  },
  {
    icon: CloudSun,
    title: 'Climate-Smart Nutrition',
    description: 'Get food recommendations that adapt to your local weather—cooling foods for heat, warming foods for cold.',
  },
  {
    icon: Heart,
    title: 'Boost Your Health',
    description: 'Improve immunity, digestion, energy, and overall wellness with nature-guided eating.',
  },
  {
    icon: Sparkles,
    title: 'Personalized for You',
    description: 'Tailored suggestions based on your diet, allergies, goals, and current climate.',
  },
];

export default function Onboarding() {
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();

  const next = () => current < slides.length - 1 ? setCurrent(current + 1) : navigate('/location');

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <AnimatedBackground />
      <div className="w-full max-w-lg relative z-10">
        {slides.map((slide, i) => {
          const Icon = slide.icon;
          return i === current && (
            <div key={i} className="text-center animate-fade-up">
              <div className="mb-10 flex justify-center">
                <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center shadow-2xl">
                  <Icon className="w-16 h-16 text-white" />
                </div>
              </div>
              <h1 className="text-5xl font-black mb-5 text-gray-900 tracking-tight">{slide.title}</h1>
              <p className="text-gray-600 text-xl leading-relaxed mb-16 px-4">{slide.description}</p>
            </div>
          );
        })}

        <div className="flex justify-center gap-3 mb-10">
          {slides.map((_, i) => (
            <div key={i} className={`h-2.5 rounded-full transition-all duration-300 ${i === current ? 'w-10 bg-gradient-to-r from-green-500 to-blue-500 shadow-lg' : 'w-2.5 bg-gray-300'}`} />
          ))}
        </div>

        <Button onClick={next} className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0 shadow-lg rounded-2xl h-16 text-lg font-semibold" size="lg">
          {current === slides.length - 1 ? 'Get Started' : 'Next'}
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
