import { useState } from "react";
import { Camera, Upload, Scan, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ScanResult {
  foodName: string;
  suitability: 'suitable' | 'caution' | 'avoid';
  confidence: number;
  reasons: string[];
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
}

const FoodScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Mock scan function - will be replaced with actual AI integration
  const performScan = async () => {
    setIsScanning(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock result based on user profile (vegetarian, health conditions, etc.)
    const mockResult: ScanResult = {
      foodName: "Mixed Vegetable Curry",
      suitability: "suitable",
      confidence: 92,
      reasons: [
        "Matches your vegetarian diet preference",
        "Rich in fiber and vitamins",
        "No allergens detected based on your profile"
      ],
      nutritionalInfo: {
        calories: 180,
        protein: 8,
        carbs: 25,
        fats: 6
      }
    };
    
    setScanResult(mockResult);
    setIsScanning(false);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setScanResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const getSuitabilityIcon = (suitability: string) => {
    switch (suitability) {
      case 'suitable': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'caution': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'avoid': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return null;
    }
  };

  const getSuitabilityColor = (suitability: string) => {
    switch (suitability) {
      case 'suitable': return 'bg-green-100 text-green-800 border-green-200';
      case 'caution': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'avoid': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Scan className="w-6 h-6 text-blue-500" />
          <h3 className="text-xl font-bold">Food Scanner</h3>
        </div>
        <p className="text-muted-foreground">
          Scan or upload food images to check suitability for your diet
        </p>
      </div>

      {/* Upload Section */}
      <Card>
        <CardContent className="p-6">
          {!selectedImage ? (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <div className="text-4xl mb-4">📸</div>
              <p className="text-muted-foreground mb-4">
                Take a photo or upload an image of your food
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" className="gap-2">
                  <Camera className="w-4 h-4" />
                  Take Photo
                </Button>
                <label htmlFor="file-upload">
                  <Button variant="outline" className="gap-2 cursor-pointer">
                    <Upload className="w-4 h-4" />
                    Upload Image
                  </Button>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Selected food"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedImage(null);
                    setScanResult(null);
                  }}
                  className="absolute top-2 right-2 bg-white/80 backdrop-blur"
                >
                  ✕
                </Button>
              </div>
              
              {!scanResult && (
                <Button 
                  onClick={performScan} 
                  disabled={isScanning}
                  className="w-full gap-2"
                >
                  {isScanning ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Scan className="w-4 h-4" />
                      Scan Food
                    </>
                  )}
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Scan Results */}
      {scanResult && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                {getSuitabilityIcon(scanResult.suitability)}
                {scanResult.foodName}
              </CardTitle>
              <Badge className={getSuitabilityColor(scanResult.suitability)}>
                {scanResult.suitability.toUpperCase()}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">
              Confidence: {scanResult.confidence}%
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Reasons */}
            <div>
              <h4 className="font-medium mb-2">Analysis:</h4>
              <ul className="space-y-1">
                {scanResult.reasons.map((reason, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    {reason}
                  </li>
                ))}
              </ul>
            </div>

            {/* Nutritional Info */}
            {scanResult.nutritionalInfo && (
              <div>
                <h4 className="font-medium mb-2">Nutritional Information (per serving):</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-orange-50 p-2 rounded">
                    <span className="font-medium">Calories:</span> {scanResult.nutritionalInfo.calories}
                  </div>
                  <div className="bg-blue-50 p-2 rounded">
                    <span className="font-medium">Protein:</span> {scanResult.nutritionalInfo.protein}g
                  </div>
                  <div className="bg-green-50 p-2 rounded">
                    <span className="font-medium">Carbs:</span> {scanResult.nutritionalInfo.carbs}g
                  </div>
                  <div className="bg-purple-50 p-2 rounded">
                    <span className="font-medium">Fats:</span> {scanResult.nutritionalInfo.fats}g
                  </div>
                </div>
              </div>
            )}

            <Button 
              onClick={() => {
                setSelectedImage(null);
                setScanResult(null);
              }}
              variant="outline" 
              className="w-full"
            >
              Scan Another Food
            </Button>
          </CardContent>
        </Card>
      )}

      {/* API Integration Note */}
      <div className="text-xs text-muted-foreground bg-gray-50 p-3 rounded-lg">
        💡 <strong>Future Enhancement:</strong> This component will integrate with AI vision APIs 
        for real-time food recognition and personalized dietary analysis.
      </div>
    </div>
  );
};

export default FoodScanner;