import { useState, useEffect } from 'react';

interface LocationData {
  latitude: number;
  longitude: number;
  weather: {
    temperature: number;
    humidity: number;
    windSpeed: number;
    visibility: number;
    condition: string;
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
              temperature: Math.round(20 + Math.random() * 15), // 20-35°C
              humidity: Math.round(40 + Math.random() * 50), // 40-90%
              windSpeed: Math.round(5 + Math.random() * 20), // 5-25 km/h
              visibility: Math.round(2 + Math.random() * 8), // 2-10 km
              condition: ['Sunny', 'Cloudy', 'Humid', 'Rainy'][Math.floor(Math.random() * 4)],
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
              temperature: Math.round(20 + Math.random() * 15),
              humidity: Math.round(40 + Math.random() * 50),
              windSpeed: Math.round(5 + Math.random() * 20),
              visibility: Math.round(2 + Math.random() * 8),
              condition: ['Sunny', 'Cloudy', 'Humid', 'Rainy'][Math.floor(Math.random() * 4)],
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