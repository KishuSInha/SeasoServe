import { useState } from "react";
import { Sun, CloudRain, Snowflake, Wind, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";

const climates = [
  {
    id: "hot",
    label: "Hot",
    icon: Sun,
    color: "bg-sun-yellow text-sun-yellow",
    bgActive: "bg-sun-yellow/20 border-sun-yellow",
    foods: [
      { name: "Watermelon", reason: "High water content for hydration" },
      { name: "Cucumber", reason: "Cooling effect and electrolytes" },
      { name: "Coconut Water", reason: "Natural electrolyte replenishment" },
      { name: "Mint Yogurt", reason: "Cooling probiotics for gut health" },
    ],
  },
  {
    id: "rainy",
    label: "Rainy",
    icon: CloudRain,
    color: "bg-sky-blue text-sky-blue",
    bgActive: "bg-sky-blue/20 border-sky-blue",
    foods: [
      { name: "Ginger Tea", reason: "Boosts immunity and aids digestion" },
      { name: "Turmeric Soup", reason: "Anti-inflammatory properties" },
      { name: "Roasted Corn", reason: "Easy to digest, warm comfort food" },
      { name: "Garlic Vegetables", reason: "Natural antibacterial benefits" },
    ],
  },
  {
    id: "cold",
    label: "Cold",
    icon: Snowflake,
    color: "bg-sky-blue text-sky-blue",
    bgActive: "bg-sky-blue/20 border-sky-blue",
    foods: [
      { name: "Hot Soup", reason: "Warms body and provides nutrients" },
      { name: "Root Vegetables", reason: "Sustained energy release" },
      { name: "Oatmeal", reason: "Complex carbs for lasting warmth" },
      { name: "Nuts & Dried Fruits", reason: "Healthy fats and calories" },
    ],
  },
  {
    id: "windy",
    label: "Windy",
    icon: Wind,
    color: "bg-muted-foreground text-muted-foreground",
    bgActive: "bg-muted/50 border-muted-foreground",
    foods: [
      { name: "Warm Stews", reason: "Grounding and satisfying" },
      { name: "Cooked Grains", reason: "Easy on digestion" },
      { name: "Steamed Vegetables", reason: "Gentle on the system" },
      { name: "Herbal Tea", reason: "Calming and warming" },
    ],
  },
  {
    id: "humid",
    label: "Humid",
    icon: Droplets,
    color: "bg-leaf-green text-leaf-green",
    bgActive: "bg-leaf-green/20 border-leaf-green",
    foods: [
      { name: "Light Salads", reason: "Easy digestion in heavy weather" },
      { name: "Bitter Greens", reason: "Help balance body moisture" },
      { name: "Barley Water", reason: "Natural diuretic properties" },
      { name: "Citrus Fruits", reason: "Refreshing and vitamin-rich" },
    ],
  },
];

const ClimateSelector = () => {
  const [selectedClimate, setSelectedClimate] = useState(climates[0]);

  return (
    <section id="climate" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-leaf-green font-semibold text-sm uppercase tracking-wider">
            Interactive Guide
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            What to Eat in Your Climate
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select your current weather condition to see personalized food recommendations
          </p>
        </div>

        {/* Climate Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {climates.map((climate) => (
            <Button
              key={climate.id}
              variant="climate"
              size="lg"
              onClick={() => setSelectedClimate(climate)}
              className={`gap-2 ${
                selectedClimate.id === climate.id
                  ? `${climate.bgActive} border-2`
                  : "bg-card"
              }`}
            >
              <climate.icon className={`w-5 h-5 ${climate.color.split(" ")[1]}`} />
              {climate.label}
            </Button>
          ))}
        </div>

        {/* Food Recommendations */}
        <div className="max-w-4xl mx-auto">
          <div
            className={`rounded-2xl p-8 border-2 ${selectedClimate.bgActive} transition-all duration-300`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-xl ${selectedClimate.color.split(" ")[0]}/20 flex items-center justify-center`}>
                <selectedClimate.icon className={`w-6 h-6 ${selectedClimate.color.split(" ")[1]}`} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">
                  {selectedClimate.label} Weather Foods
                </h3>
                <p className="text-sm text-muted-foreground">
                  Recommended for optimal health
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {selectedClimate.foods.map((food, index) => (
                <div
                  key={food.name}
                  className="bg-card rounded-xl p-4 border border-border animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h4 className="font-semibold text-foreground mb-1">
                    {food.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">{food.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClimateSelector;
