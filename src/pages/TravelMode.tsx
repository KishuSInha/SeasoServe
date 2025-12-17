import { useState } from "react";
import { MapPin, Navigation, Search, Utensils, Star, Clock, ArrowLeft, Sparkles, Loader2, Coffee, ChefHat } from "lucide-react";

const TravelMode = () => {
  const [currentCity, setCurrentCity] = useState("");
  const [destination, setDestination] = useState("");
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [restaurants, setRestaurants] = useState([]);
  const [authenticFoods, setAuthenticFoods] = useState([]);

  // Get current location
  const getCurrentPosition = () => {
    setIsSearching(true);
    setLocationError("");
    
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            
            const city = data.address?.city || data.address?.town || data.address?.village || "Your Location";
            const country = data.address?.country || "";
            const cityName = country ? `${city}, ${country}` : city;
            
            setCurrentCity(cityName);
            setUseCurrentLocation(true);
            setIsSearching(false);
          } catch (error) {
            setCurrentCity(`${latitude.toFixed(2)}, ${longitude.toFixed(2)}`);
            setUseCurrentLocation(true);
            setIsSearching(false);
          }
        },
        (error) => {
          setLocationError("Unable to get location. Please enter manually.");
          setIsSearching(false);
        }
      );
    } else {
      setLocationError("Geolocation not supported");
      setIsSearching(false);
    }
  };

  // Search for restaurants and foods
const handleSearch = async () => {
  if (!destination.trim()) {
    setLocationError("Please enter a destination");
    return;
  }

  setIsSearching(true);
  setLocationError("");

  try {
    const response = await fetch("/api/travel-food", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ destination })
    });

    if (!response.ok) {
      throw new Error("Backend error");
    }

    const result = await response.json();

    setRestaurants(result.restaurants || []);
    setAuthenticFoods(result.foods || []);
    setShowResults(true);

  } catch (error) {
    console.error(error);
    setLocationError("Error loading data. Try again.");
  } finally {
    setIsSearching(false);
  }
};

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-purple-200 sticky top-0 z-50 shadow-lg">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
            <button 
              onClick={() => setShowResults(false)}
              className="p-2 hover:bg-purple-100 rounded-xl transition-all"
            >
              <ArrowLeft className="w-5 h-5 text-purple-600" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-purple-900">Travel Mode ✈️</h1>
              <p className="text-sm text-purple-600">{destination}</p>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Trip Summary */}
          <div className="relative overflow-hidden rounded-3xl mb-8 group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 opacity-90"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIgb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-30"></div>
            <div className="relative p-8">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <Sparkles className="w-8 h-8 animate-pulse" />
                Your Trip to {destination}
              </h2>
              <div className="flex flex-wrap gap-4">
                {currentCity && (
                  <div className="bg-white/20 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/30">
                    <p className="text-xs text-white/80 font-medium">From</p>
                    <p className="text-sm font-bold text-white">{currentCity}</p>
                  </div>
                )}
                <div className="bg-white/20 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/30">
                  <p className="text-xs text-white/80 font-medium">Destination</p>
                  <p className="text-sm font-bold text-white">{destination}</p>
                </div>
                <div className="bg-white/20 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/30">
                  <p className="text-xs text-white/80 font-medium">Recommendations</p>
                  <p className="text-sm font-bold text-white">{restaurants.length} restaurants</p>
                </div>
              </div>
            </div>
          </div>

          {/* Authentic Foods */}
          {authenticFoods.length > 0 && (
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <ChefHat className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-800">Must-Try Local Foods</h3>
                  <p className="text-gray-600">Authentic dishes from {destination}</p>
                </div>
              </div>
              
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {authenticFoods.map((food, idx) => (
                  <div
                    key={idx}
                    className={`relative rounded-3xl p-6 border-2 transition-all duration-300 hover:scale-105 hover:shadow-2xl group cursor-pointer ${
                      food.mustTry
                        ? "bg-gradient-to-br from-amber-50 to-orange-100 border-orange-300 shadow-lg"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    {food.mustTry && (
                      <div className="absolute -top-3 -right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-xl animate-bounce">
                        ⭐ Must Try
                      </div>
                    )}
                    <div className="text-7xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">
                      {food.emoji}
                    </div>
                    <h4 className="font-bold text-gray-900 text-center mb-2 text-lg">
                      {food.name}
                    </h4>
                    <p className="text-sm text-gray-600 text-center leading-relaxed">
                      {food.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Restaurants */}
          {restaurants.length > 0 && (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Utensils className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-gray-800">Top Restaurants</h3>
                  <p className="text-gray-600">Highly recommended dining spots</p>
                </div>
              </div>
              
              <div className="grid gap-5">
                {restaurants.map((restaurant, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-3xl p-6 border-2 border-gray-200 shadow-md hover:shadow-2xl hover:border-purple-300 transition-all duration-300 hover:scale-[1.01] group"
                  >
                    <div className="flex gap-5">
                      <div className="w-28 h-28 bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 rounded-2xl flex items-center justify-center text-5xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md">
                        {restaurant.emoji}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-bold text-xl text-gray-900 mb-1 group-hover:text-purple-600 transition-colors">
                              {restaurant.name}
                            </h4>
                            <p className="text-sm text-gray-600">{restaurant.cuisine}</p>
                          </div>
                          <div className="flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-400 px-4 py-2 rounded-xl shadow-md">
                            <Star className="w-5 h-5 fill-white text-white" />
                            <span className="text-sm font-bold text-white">{restaurant.rating}</span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                          {restaurant.description}
                        </p>
                        
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                          <MapPin className="w-4 h-4" />
                          <span>{restaurant.address}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-3">
                          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium ${
                            restaurant.open 
                              ? "bg-green-100 text-green-700" 
                              : "bg-red-100 text-red-700"
                          }`}>
                            <Clock className="w-4 h-4" />
                            {restaurant.open ? "Open Now" : "Closed"}
                          </div>
                          <div className="px-4 py-2 bg-purple-100 text-purple-700 rounded-xl font-bold">
                            {restaurant.price}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tips */}
          <div className="grid md:grid-cols-2 gap-5 mt-10">
            <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl p-6 border-2 border-green-300 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🌱</span>
                </div>
                <h4 className="font-bold text-lg text-gray-900">Dietary Options</h4>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                Most restaurants offer vegetarian options. Look for symbols on menus or ask staff about plant-based alternatives.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl p-6 border-2 border-blue-300 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">💡</span>
                </div>
                <h4 className="font-bold text-lg text-gray-900">Pro Tip</h4>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                Visit local markets for authentic street food. Peak hours offer better atmosphere but expect crowds!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <div className="relative bg-white/80 backdrop-blur-xl border-b border-purple-200 shadow-lg">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-8 h-8 text-purple-600 animate-pulse" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              Travel Mode
            </h1>
          </div>
          <p className="text-gray-600 ml-11">Discover authentic cuisine worldwide 🌍</p>
        </div>
      </div>

      <main className="relative max-w-4xl mx-auto px-4 py-12">
        {/* Hero */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="text-9xl mb-6 animate-float">🌍</div>
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
            Discover Local Flavors
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
            AI-powered restaurant recommendations and authentic food discoveries
          </p>
        </div>

        {/* Location Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-purple-200 mb-6 hover:shadow-3xl transition-all">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Current Location</h3>
            <span className="text-gray-500">(Optional)</span>
          </div>
          
          <input
            type="text"
            placeholder="Enter your current city"
            value={currentCity}
            onChange={(e) => {
              setCurrentCity(e.target.value);
              setUseCurrentLocation(false);
            }}
            className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all text-lg mb-4"
            disabled={useCurrentLocation}
          />
          
          {useCurrentLocation && (
            <div className="bg-green-100 border-2 border-green-300 rounded-2xl px-4 py-3 mb-4 flex items-center gap-2">
              <span className="text-green-700 font-bold">✓ Using GPS Location</span>
            </div>
          )}
          
          <button
            onClick={getCurrentPosition}
            disabled={isSearching}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 text-lg disabled:opacity-50"
          >
            <Navigation className="w-5 h-5" />
            {isSearching ? "Getting Location..." : "Use My Current Location"}
          </button>
        </div>

        {/* Destination Card */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-2 border-orange-200 mb-6 hover:shadow-3xl transition-all">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Search className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">Where are you going?</h3>
          </div>
          
          <input
            type="text"
            placeholder="Enter destination (e.g., Paris, Tokyo, New York)"
            value={destination}
            onChange={(e) => {
              setDestination(e.target.value);
              setLocationError("");
            }}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full px-6 py-4 border-2 border-gray-300 rounded-2xl focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all text-lg mb-4"
          />
          
          {locationError && (
            <div className="bg-red-100 border-2 border-red-300 rounded-2xl px-4 py-3 mb-4">
              <p className="text-red-700 font-medium text-center">{locationError}</p>
            </div>
          )}
          
          <button
            onClick={handleSearch}
            disabled={!destination.trim() || isSearching}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSearching ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Discovering...
              </>
            ) : (
              <>
                <Search className="w-5 h-5" />
                Discover Food & Restaurants
              </>
            )}
          </button>
        </div>

        {/* Info Card */}
        <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl p-8 border-2 border-blue-300 shadow-xl">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Coffee className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">How It Works</h3>
          </div>
          
          <div className="space-y-4">
            {[
              { num: "1", text: "Optionally share your current location", color: "purple" },
              { num: "2", text: "Enter your dream destination city", color: "pink" },
              { num: "3", text: "Get AI-curated restaurant recommendations", color: "orange" },
              { num: "4", text: "Discover must-try authentic local dishes", color: "blue" }
            ].map((step, idx) => (
              <div key={idx} className="flex items-start gap-4 p-4 bg-white/70 backdrop-blur-sm rounded-2xl hover:bg-white transition-all">
                <div className={`w-10 h-10 bg-gradient-to-br from-${step.color}-400 to-${step.color}-600 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-white shadow-md`}>
                  {step.num}
                </div>
                <p className="text-gray-700 pt-2">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default TravelMode;