import {
  CloudSun,
  UtensilsCrossed,
  Bot,
  Plane,
  AlertTriangle,
  Leaf,
  ScanLine,
  BarChart3,
  ArrowRight,
  Sparkles,
  Zap
} from "lucide-react";
import { useState } from "react";

const features = [
  {
    icon: CloudSun,
    title: "Climate-Based Suggestions",
    description: "Food recommendations that adapt to your local weather in real-time.",
    detail: "Temperature, humidity, and air quality all influence what your body needs. We track it all.",
    gradient: "from-blue-400 to-cyan-500",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    hoverBg: "group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-cyan-50"
  },
  {
    icon: UtensilsCrossed,
    title: "Personalized Meal Planning",
    description: "Weekly meal plans tailored to your preferences and health goals.",
    detail: "Custom plans that consider your dietary restrictions, allergies, and favorite cuisines.",
    gradient: "from-green-400 to-emerald-500",
    color: "text-green-600",
    bgColor: "bg-green-50",
    hoverBg: "group-hover:bg-gradient-to-br group-hover:from-green-50 group-hover:to-emerald-50"
  },
  {
    icon: Bot,
    title: "AI Recipe Chatbot",
    description: "Ask our AI for recipes, cooking tips, and nutritional advice anytime.",
    detail: "24/7 culinary assistant powered by advanced AI that understands your unique needs.",
    gradient: "from-purple-400 to-pink-500",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    hoverBg: "group-hover:bg-gradient-to-br group-hover:from-purple-50 group-hover:to-pink-50"
  },
  {
    icon: Plane,
    title: "Travel Mode",
    description: "Get food suggestions for your destination before you arrive.",
    detail: "Prepare your body for new climates with pre-travel nutrition recommendations.",
    gradient: "from-indigo-400 to-blue-500",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    hoverBg: "group-hover:bg-gradient-to-br group-hover:from-indigo-50 group-hover:to-blue-50"
  },
  {
    icon: AlertTriangle,
    title: "Climate Risk Alerts",
    description: "Stay ahead of weather changes with proactive nutrition tips.",
    detail: "Get notified about extreme weather and receive protective dietary suggestions.",
    gradient: "from-orange-400 to-red-500",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    hoverBg: "group-hover:bg-gradient-to-br group-hover:from-orange-50 group-hover:to-red-50"
  },
  {
    icon: Leaf,
    title: "Seasonal & Local Produce",
    description: "Discover what's fresh and in-season in your area.",
    detail: "Support local farmers while eating the most nutritious seasonal ingredients.",
    gradient: "from-lime-400 to-green-500",
    color: "text-lime-600",
    bgColor: "bg-lime-50",
    hoverBg: "group-hover:bg-gradient-to-br group-hover:from-lime-50 group-hover:to-green-50"
  },
  {
    icon: ScanLine,
    title: "Food Scanner",
    description: "Scan foods to check if they're right for your current climate.",
    detail: "Point your camera at any food and get instant climate-compatibility ratings.",
    gradient: "from-cyan-400 to-teal-500",
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
    hoverBg: "group-hover:bg-gradient-to-br group-hover:from-cyan-50 group-hover:to-teal-50"
  },
  {
    icon: BarChart3,
    title: "Nutrition Analytics",
    description: "Track your eating patterns and nutritional intake over time.",
    detail: "Comprehensive dashboards showing how your diet adapts to seasonal changes.",
    gradient: "from-amber-400 to-yellow-500",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    hoverBg: "group-hover:bg-gradient-to-br group-hover:from-amber-50 group-hover:to-yellow-50"
  },
];

const FeaturesSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-40">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full border border-green-200">
            <Sparkles className="w-4 h-4 text-green-600" />
            <span className="text-sm font-semibold text-green-700 uppercase tracking-wider">
              Powerful Features
            </span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900">
            Everything You Need
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive tools to help you eat smarter based on your environment and body's needs
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Feature Card */}
              <div className={`
                relative bg-white rounded-2xl p-6 border-2 h-full
                transition-all duration-500 cursor-pointer
                ${hoveredIndex === index 
                  ? 'border-green-400 shadow-2xl scale-105 -translate-y-2' 
                  : 'border-gray-200 shadow-lg hover:border-green-300'
                }
                ${feature.hoverBg}
              `}>

                {/* Icon Container */}
                <div className={`
                  relative w-16 h-16 rounded-2xl ${feature.bgColor} 
                  flex items-center justify-center mb-5
                  transition-all duration-500
                  ${hoveredIndex === index ? 'scale-110 rotate-6' : 'group-hover:scale-105'}
                `}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} strokeWidth={2.5} />
                  
                  {/* Glow effect on hover */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Expandable Detail on Hover */}
                  <div className={`
                    overflow-hidden transition-all duration-500
                    ${hoveredIndex === index ? 'max-h-24 opacity-100 mt-4' : 'max-h-0 opacity-0'}
                  `}>
                    <div className={`p-3 ${feature.bgColor} rounded-xl border border-gray-200`}>
                      <p className="text-xs text-gray-700">
                        {feature.detail}
                      </p>
                    </div>
                  </div>

                  {/* Learn More Link */}
                  <button className={`
                    inline-flex items-center gap-1 text-sm font-semibold transition-all duration-300
                    ${hoveredIndex === index ? 'text-green-600 gap-2' : 'text-gray-400'}
                  `}>
                    Learn more
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Shine effect on hover */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div className={`
                    absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent
                    transition-all duration-1000 opacity-0 group-hover:opacity-30
                    ${hoveredIndex === index ? 'translate-x-full' : '-translate-x-full'}
                  `}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
         </div>
    </section>
  );
};

export default FeaturesSection;