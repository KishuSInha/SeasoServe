import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  const [tempC, setTempC] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);
  const [locationLabel, setLocationLabel] = useState("Live weather");
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [weatherCondition, setWeatherCondition] = useState("moderate");

  useEffect(() => {
    const fetchWeather = async (latitude: number, longitude: number) => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relativehumidity_2m`
        );
        const data = await response.json();
        const liveTemp = data?.current_weather?.temperature;
        const currentHumidity = data?.hourly?.relativehumidity_2m?.[0];
        
        setTempC(typeof liveTemp === "number" ? Math.round(liveTemp) : null);
        setHumidity(typeof currentHumidity === "number" ? currentHumidity : null);
        
        // Determine weather condition
        if (liveTemp > 28) setWeatherCondition("hot");
        else if (liveTemp < 18) setWeatherCondition("cold");
        else setWeatherCondition("moderate");
      } catch (error) {
        setWeatherError("Unable to fetch weather");
        setTempC(null);
      } finally {
        setIsLoadingWeather(false);
      }
    };

    const fetchLocationName = async (latitude: number, longitude: number) => {
      try {
        const response = await fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        );
        const locationInfo = await response.json();
        const city =
          locationInfo.city ||
          locationInfo.locality ||
          locationInfo.principalSubdivision;
        if (city) setLocationLabel(city);
      } catch {
        // Keep default label on failure
      }
    };

    if (!navigator.geolocation) {
      setWeatherError("Geolocation not supported");
      setIsLoadingWeather(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { latitude, longitude } = coords;
        await Promise.all([
          fetchWeather(latitude, longitude),
          fetchLocationName(latitude, longitude),
        ]);
      },
      () => {
        setWeatherError("Unable to detect location");
        setIsLoadingWeather(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  // Weather-responsive background gradients
  const getBackgroundGradient = () => {
    if (weatherCondition === "hot") {
      return "from-orange-50 via-amber-50 to-yellow-50";
    } else if (weatherCondition === "cold") {
      return "from-blue-50 via-cyan-50 to-teal-50";
    }
    return "from-green-50 via-emerald-50 to-lime-50";
  };

  const getRecommendation = () => {
    if (tempC === null) return null;
    
    if (tempC > 28) {
      return {
        title: "🌡️ Hot Weather Detected",
        foods: ["Cucumber salads", "Watermelon", "Coconut water", "Light proteins"],
        reason: "Your body needs extra hydration and cooling foods",
        icon: "🔥"
      };
    } else if (tempC < 18) {
      return {
        title: "❄️ Cool Weather Detected",
        foods: ["Warm soups", "Root vegetables", "Ginger tea", "Hearty grains"],
        reason: "Your body needs warming and energy-supportive meals",
        icon: "☕"
      };
    }
    return {
      title: "🌤️ Moderate Weather",
      foods: ["Balanced salads", "Seasonal fruits", "Lean proteins", "Whole grains"],
      reason: "Perfect conditions for balanced, nutritious meals",
      icon: "🥗"
    };
  };

  const sliderItems = [
    {
      title: "Citrus Balance Bowl",
      subtitle: "Vitamin C boost for humid weather",
      temp: "28°C+",
      gradient: "from-orange-500 via-amber-400 to-yellow-400",
      emoji: "🍊"
    },
    {
      title: "Coastal Greens Plate",
      subtitle: "Light proteins with cooling herbs",
      temp: "25-28°C",
      gradient: "from-emerald-500 via-teal-400 to-cyan-400",
      emoji: "🥗"
    },
    {
      title: "Berry Antioxidant Mix",
      subtitle: "Seasonal fruits for steady energy",
      temp: "20-25°C",
      gradient: "from-purple-500 via-pink-400 to-rose-400",
      emoji: "🫐"
    },
    {
      title: "Warming Root Bowl",
      subtitle: "Energy-dense for cooler days",
      temp: "<20°C",
      gradient: "from-amber-600 via-orange-500 to-red-400",
      emoji: "🍲"
    },
  ];

  const recommendation = getRecommendation();

  return (
    <section className={`min-h-screen w-full bg-gradient-to-br ${getBackgroundGradient()} transition-all duration-1000 flex items-center justify-center relative overflow-hidden`}>
      
      {/* Animated background elements - Enhanced */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute top-20 left-10 w-80 h-80 rounded-full blur-3xl animate-pulse opacity-30 ${weatherCondition === 'hot' ? 'bg-orange-300' : weatherCondition === 'cold' ? 'bg-blue-300' : 'bg-green-300'}`}></div>
        <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse opacity-20 ${weatherCondition === 'hot' ? 'bg-yellow-300' : weatherCondition === 'cold' ? 'bg-cyan-300' : 'bg-emerald-300'}`} style={{ animationDelay: '1s' }}></div>
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl animate-pulse opacity-10 ${weatherCondition === 'hot' ? 'bg-amber-400' : weatherCondition === 'cold' ? 'bg-teal-400' : 'bg-lime-400'}`} style={{ animationDelay: '0.5s' }}></div>
      </div>

      <div className="w-full min-h-screen bg-white/80 backdrop-blur-md shadow-2xl px-6 md:px-14 py-10 md:py-14 flex flex-col gap-10 relative z-10">

        {/* ================= HERO CONTENT ================= */}
        <div className="grid lg:grid-cols-2 gap-12 items-center flex-1">

          {/* LEFT CONTENT */}
          <div className="space-y-8">

            {/* Headline - Enhanced */}
            <div className="space-y-5">
              <div className="flex items-center gap-3 group">
                <div className="w-1.5 h-10 bg-gradient-to-b from-green-500 via-emerald-500 to-green-600 rounded-full group-hover:h-12 transition-all duration-300"></div>
                <p className="text-sm uppercase tracking-[0.3em] text-gray-700 font-bold">
                  Climate-Aware Nutrition
                </p>
              </div>

              <h1 className="text-6xl  font-black leading-[1.05] text-gray-900 tracking-tight">
                Nature guides, we Serves.
              </h1>

              {/* Live Weather Display - Enhanced */}
              <div className="flex items-center gap-3 flex-wrap">
                <div className="px-4 py-2 bg-white rounded-xl shadow-lg flex items-center gap-3 border border-gray-100">
                  <span className="text-2xl" aria-hidden>📍</span>
                  <div>
                    {isLoadingWeather && (
                      <p className="text-sm text-gray-600">Detecting location...</p>
                    )}
                    {!isLoadingWeather && tempC !== null && (
                      <>
                        <p className="text-sm font-semibold text-gray-900">
                          {locationLabel}
                        </p>
                        <p className="text-xs text-gray-500">
                          {tempC}°C {humidity && `· ${humidity}% humidity`}
                        </p>
                      </>
                    )}
                    {!isLoadingWeather && (tempC === null || weatherError) && (
                      <p className="text-sm text-gray-600">{weatherError || "Weather unavailable"}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Description - Enhanced */}
              <p className="text-gray-700 text-xl max-w-xl leading-relaxed font-medium">
                SeaSoServe analyzes your <span className="font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded">local weather</span> and recommends meals that support your body's needs today.
              </p>
            </div>

            {/* CTA - Enhanced */}
            <div className="flex flex-col gap-5">
              <Link to="/register">
                <button className="group relative inline-flex items-center justify-center px-10 py-5 rounded-2xl bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white text-lg font-bold shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center gap-3">
                    <span>Get Started with SeaSOServe</span>
                    <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </button>
              </Link>
              <div className="flex items-center gap-5 text-base text-gray-700 font-medium">
                <span className="flex items-center gap-2 group hover:scale-105 transition-transform duration-300">
                  <span className="text-green-600 text-xl group-hover:scale-125 transition-transform duration-300">✓</span> 
                  <span>Weather-responsive</span>
                </span>
                <span className="flex items-center gap-2 group hover:scale-105 transition-transform duration-300">
                  <span className="text-green-600 text-xl group-hover:scale-125 transition-transform duration-300">✓</span> 
                  <span>Daily updates</span>
                </span>
                <span className="flex items-center gap-2 group hover:scale-105 transition-transform duration-300">
                  <span className="text-green-600 text-xl group-hover:scale-125 transition-transform duration-300">✓</span> 
                  <span>Personalized</span>
                </span>
              </div>
            </div>
          </div>

         {/* RIGHT IMAGE - Super Enhanced */}
            <div className="relative flex justify-center items-center">
  
             {/* Main circular display */}
             <div className="relative group">
    
               {/* Multi-layered glow effect */}
               <div
                 className={`absolute inset-0 rounded-full blur-3xl opacity-45 scale-110 animate-pulse ${
                 weatherCondition === "hot"
                 ? "bg-orange-300"
                 : weatherCondition === "cold"
                 ? "bg-blue-300"
                 : "bg-emerald-300"
                 }`}/>
              <div
                 className={`absolute inset-0 rounded-full blur-2xl opacity-30 scale-105 animate-pulse ${
                 weatherCondition === "hot"
                   ? "bg-yellow-200"
                   : weatherCondition === "cold"
                   ? "bg-cyan-200"
                   : "bg-lime-200"}`}
                style={{ animationDelay: "0.5s" }}
              />

               {/* Image container */}
               <div className="relative w-[420px] h-[420px] rounded-full overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.25)] flex items-center justify-center transition-transform duration-500 group-hover:scale-[1.03]">
              <img
               src="/landing/l1.jpg"
                alt="Climate-matched meal"
                className="w-full h-full object-cover object-center scale-[1.30] group-hover:scale-[1.40] transition-transform duration-700 ease-out"
               />
              </div>

              {/* Floating stats */}
              <div className="absolute -top-6 -right-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl px-5 py-4 border border-green-100 hover:scale-105 transition-transform duration-300">
               <p className="text-xs text-gray-600 font-bold uppercase tracking-wider">
               Climate Match
               </p>
               <p className="text-3xl font-black text-green-600 flex items-end gap-1">
                98<span className="text-lg">%</span>
              </p>
               </div>
    
               <div className="absolute -bottom-6 -left-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-xl px-5 py-4 border border-blue-100 hover:scale-105 transition-transform duration-300">
               <p className="text-xs text-gray-600 font-bold uppercase tracking-wider">
               Hydration
               </p>
               <p className="text-2xl font-black text-blue-600 flex items-center gap-1">
                    Perfect <span className="text-xl">💧</span>
                </p>
             </div>

                 {/* Nutrition badge */}
                   <div className="absolute top-1/2 -right-8 -translate-y-1/2 bg-white/85 backdrop-blur-md rounded-xl shadow-lg px-4 py-3 border border-amber-100 hover:scale-105 transition-transform duration-300">
                    <p className="text-2xl font-black text-amber-600">A+</p>
                     <p className="text-xs text-gray-600 font-bold">Nutrition</p>
                   </div>
              </div>
            </div>
        </div>
      </div>

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
