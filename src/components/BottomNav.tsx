import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Leaf, BookOpen, TrendingUp, User } from 'lucide-react';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { icon: Home, label: 'Home', path: '/home' },
    { icon: Leaf, label: 'Seasonal', path: '/seasonal' },
    { icon: BookOpen, label: 'Learn', path: '/learn' },
    { icon: TrendingUp, label: 'Progress', path: '/progress' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-gray-200 px-4 py-2 z-50 shadow-2xl">
      <div className="max-w-2xl mx-auto flex justify-around">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const active = location.pathname === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all duration-300 ${
                active ? 'text-white bg-gradient-to-r from-green-500 to-blue-500 shadow-lg scale-105' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
