import { AlertTriangle, Thermometer, Droplets, Wind, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface WeatherData {
  temperature: number;
  humidity: number;
  windSpeed: number;
  visibility: number;
  condition: string;
}

interface ClimateRiskAlertsProps {
  weatherData?: WeatherData;
}

const ClimateRiskAlerts = ({ weatherData }: ClimateRiskAlertsProps) => {
  // Mock weather data if not provided
  const weather = weatherData || {
    temperature: 35,
    humidity: 85,
    windSpeed: 15,
    visibility: 3,
    condition: "hazy"
  };

  // Generate health alerts based on weather conditions
  const generateAlerts = () => {
    const alerts = [];

    if (weather.temperature > 32) {
      alerts.push({
        id: 'heat',
        type: 'High Temperature',
        severity: 'high',
        message: 'Extreme heat detected. Stay hydrated and avoid heavy meals.',
        recommendation: 'Consume cooling foods like cucumber, watermelon, and mint.',
        icon: <Thermometer className="w-5 h-5" />
      });
    }

    if (weather.humidity > 80) {
      alerts.push({
        id: 'humidity',
        type: 'High Humidity',
        severity: 'medium',
        message: 'High humidity may affect digestion and appetite.',
        recommendation: 'Choose light, easily digestible meals and increase fluid intake.',
        icon: <Droplets className="w-5 h-5" />
      });
    }

    if (weather.windSpeed > 20) {
      alerts.push({
        id: 'wind',
        type: 'Strong Winds',
        severity: 'low',
        message: 'Windy conditions may increase dust and allergens.',
        recommendation: 'Consider anti-inflammatory foods like turmeric and ginger.',
        icon: <Wind className="w-5 h-5" />
      });
    }

    if (weather.visibility < 5) {
      alerts.push({
        id: 'visibility',
        type: 'Poor Air Quality',
        severity: 'high',
        message: 'Low visibility indicates poor air quality.',
        recommendation: 'Boost immunity with vitamin C rich foods and antioxidants.',
        icon: <Eye className="w-5 h-5" />
      });
    }

    return alerts;
  };

  const alerts = generateAlerts();

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-orange-500" />
        <h3 className="text-lg font-semibold">Climate Health Alerts</h3>
      </div>

      {alerts.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <div className="text-4xl mb-2">✅</div>
            <p className="text-muted-foreground">No climate-related health risks detected today!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {alerts.map((alert) => (
            <Card key={alert.id} className="border-l-4 border-l-orange-500">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {alert.icon}
                    <CardTitle className="text-base">{alert.type}</CardTitle>
                  </div>
                  <Badge className={getSeverityColor(alert.severity)}>
                    {alert.severity.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-sm font-medium text-green-800">💡 Recommendation:</p>
                  <p className="text-sm text-green-700">{alert.recommendation}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Current Weather Summary */}
      <Card className="bg-gradient-to-r from-blue-50 to-cyan-50">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Current Conditions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-red-500" />
              <span>{weather.temperature}°C</span>
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-500" />
              <span>{weather.humidity}% humidity</span>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-gray-500" />
              <span>{weather.windSpeed} km/h</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-purple-500" />
              <span>{weather.visibility}km visibility</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Integration Note */}
      <div className="text-xs text-muted-foreground bg-gray-50 p-3 rounded-lg">
        💡 <strong>Future Enhancement:</strong> This component will integrate with weather APIs 
        to provide real-time climate-based health recommendations.
      </div>
    </div>
  );
};

export default ClimateRiskAlerts;