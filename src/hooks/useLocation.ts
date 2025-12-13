import { useState, useEffect } from 'react';

interface LocationData {
  latitude: number;
  longitude: number;
  weather: {
    temp: number;
    humidity: number;
    condition: string;
    season: string;
    aqi: number;
  };
  city?: string;
}

export const useLocation = () => {
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const detectLocation = () => {
    setLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported');
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Get city name using reverse geocoding
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const locationInfo = await response.json();
          
          const city = locationInfo.city || locationInfo.locality || locationInfo.principalSubdivision || 'Unknown Location';
          
          const mockWeatherData = {
            latitude,
            longitude,
            weather: {
              temp: Math.round(20 + Math.random() * 15), // 20-35°C
              humidity: Math.round(40 + Math.random() * 50), // 40-90%
              condition: ['Sunny', 'Cloudy', 'Humid', 'Rainy'][Math.floor(Math.random() * 4)],
              season: getCurrentSeason(),
              aqi: Math.round(50 + Math.random() * 150), // 50-200 AQI
            },
            city: city
          };
          
          setLocationData(mockWeatherData);
          setLoading(false);
        } catch (err) {
          // Fallback if reverse geocoding fails
          const mockWeatherData = {
            latitude,
            longitude,
            weather: {
              temp: Math.round(20 + Math.random() * 15),
              humidity: Math.round(40 + Math.random() * 50),
              condition: ['Sunny', 'Cloudy', 'Humid', 'Rainy'][Math.floor(Math.random() * 4)],
              season: getCurrentSeason(),
              aqi: Math.round(50 + Math.random() * 150),
            },
            city: `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`
          };
          
          setLocationData(mockWeatherData);
          setLoading(false);
        }
      },
      (error) => {
        setError('Unable to detect location');
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const getCurrentSeason = () => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'Spring';
    if (month >= 5 && month <= 7) return 'Summer';
    if (month >= 8 && month <= 10) return 'Autumn';
    return 'Winter';
  };

  return {
    locationData,
    loading,
    error,
    detectLocation
  };
};