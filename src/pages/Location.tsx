import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapPin, CloudRain, Thermometer, Droplets, Wind } from 'lucide-react';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function Location() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [climate, setClimate] = useState<any>(null);

  const detectLocation = () => {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(() => {
      setTimeout(() => {
        setClimate({
          temp: 28,
          condition: 'Humid',
          season: 'Monsoon',
          humidity: 85,
          advisory: 'High humidity today. Stay hydrated and eat light, cooling foods.',
        });
        setLoading(false);
      }, 1500);
    });
  };

  return (
    <div className="min-h-screen p-6 relative overflow-hidden">
      <AnimatedBackground />
      <div className="max-w-lg mx-auto pt-12 relative z-10">
        <h1 className="text-5xl font-black mb-3 text-gray-900 tracking-tight animate-fade-up">Your Climate</h1>
        <p className="text-gray-600 mb-8 text-xl leading-relaxed animate-fade-up" style={{animationDelay: '0.1s'}}>We'll detect your location to provide personalized food recommendations</p>

        {!climate ? (
          <Card className="p-10 text-center shadow-xl border-0 bg-white/80 backdrop-blur-sm rounded-3xl animate-fade-up" style={{animationDelay: '0.2s'}}>
            <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-2xl">
              <MapPin className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold mb-3 text-gray-900">Enable Location</h3>
            <p className="text-gray-600 mb-8 text-lg">Allow access to get real-time weather-based suggestions</p>
            <Button onClick={detectLocation} disabled={loading} className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 shadow-lg rounded-2xl h-14 text-lg font-semibold" size="lg">
              {loading ? 'Detecting...' : 'Detect My Location'}
            </Button>
          </Card>
        ) : (
          <div className="space-y-6 animate-fade-up">
            <Card className="p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm rounded-3xl">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900">Current Weather</h3>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-cyan-500 flex items-center justify-center shadow-lg">
                  <CloudRain className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-6 rounded-3xl bg-gradient-to-br from-orange-100 to-red-100 shadow-lg">
                  <Thermometer className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-gray-900">{climate.temp}°C</p>
                  <p className="text-xs text-gray-600 mt-1">Temperature</p>
                </div>
                <div className="text-center p-6 rounded-3xl bg-gradient-to-br from-blue-100 to-cyan-100 shadow-lg">
                  <Droplets className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-3xl font-bold text-gray-900">{climate.humidity}%</p>
                  <p className="text-xs text-gray-600 mt-1">Humidity</p>
                </div>
              </div>
              <div className="space-y-2 p-5 rounded-2xl bg-gray-50">
                <p className="text-sm font-semibold text-gray-700">Season: <span className="text-green-600">{climate.season}</span></p>
                <p className="text-sm font-semibold text-gray-700">Condition: <span className="text-blue-600">{climate.condition}</span></p>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-blue-500 to-cyan-500 border-0 shadow-xl rounded-3xl">
              <div className="flex gap-3">
                <Wind className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                <p className="text-sm text-white font-medium">{climate.advisory}</p>
              </div>
            </Card>

            <Button onClick={() => navigate('/profile')} className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0 shadow-lg rounded-2xl h-14 text-lg font-semibold" size="lg">
              Continue to Profile
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
