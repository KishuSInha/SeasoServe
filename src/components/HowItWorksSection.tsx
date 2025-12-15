import { Thermometer, User, UtensilsCrossed, Sparkles, TrendingUp, Cloud } from "lucide-react";
import { useState } from "react";

const steps = [
  {
    icon: Thermometer,
    title: "Detect Your Environment",
    description: "We analyze temperature, humidity, AQI, and real-time weather conditions in your location.",
    detail: "Our system continuously monitors 15+ environmental factors including UV index, air pressure, and seasonal patterns.",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500",
    stat: "15+ factors tracked",
    emoji: "🌡️"
  },
  {
    icon: User,
    title: "Understand Your Body",
    description: "Your age, dietary preferences, allergies, and lifestyle help us personalize recommendations.",
    detail: "We create a unique nutritional profile considering your metabolism, activity level, health goals, and food preferences.",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    iconBg: "bg-gradient-to-br from-green-500 to-emerald-500",
    stat: "100% personalized",
    emoji: "👤"
  },
  {
    icon: UtensilsCrossed,
    title: "Get Smart Meal Suggestions",
    description: "Receive AI-powered, science-backed meal suggestions tailored to your unique needs.",
    detail: "Every recommendation is optimized for nutrient timing, digestion efficiency, and energy balance based on current conditions.",
    color: "from-orange-500 to-yellow-500",
    bgColor: "bg-orange-50",
    iconBg: "bg-gradient-to-br from-orange-500 to-yellow-500",
    stat: "Updated daily",
    emoji: "🍽️"
  },
];

const HowItWorksSection = () => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section className="relative py-20 px-6 md:px-14 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 rounded-full border border-green-200">
            <Sparkles className="w-4 h-4 text-green-600" />
            <span className="text-sm font-semibold text-green-700 uppercase tracking-wider">
              Simple Process
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            How It Works
          </h2>
          
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Three intelligent steps to personalized nutrition that adapts to your environment in real-time
          </p>
        </div>

        {/* Steps Container */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => setActiveStep(index)}
              onMouseLeave={() => setActiveStep(null)}
            >
              {/* Connecting Line (Desktop) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-20 left-[60%] w-[80%] h-0.5">
                  <div className="w-full h-full bg-gradient-to-r from-gray-300 via-green-400 to-gray-300 animate-pulse"></div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                  </div>
                </div>
              )}

              {/* Step Card */}
              <div
                className={`relative group bg-white rounded-3xl p-8 shadow-lg border-2 transition-all duration-500 cursor-pointer
                  ${activeStep === index 
                    ? 'border-green-500 shadow-2xl scale-105 -translate-y-2' 
                    : 'border-gray-200 hover:border-green-300 hover:shadow-xl'
                  }`}
              >
                {/* Step Number Badge */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">{index + 1}</span>
                </div>

                {/* Icon Container with Animation */}
                <div className={`relative mb-6 w-20 h-20 ${step.iconBg} rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-500 ${activeStep === index ? 'rotate-12 scale-110' : 'group-hover:rotate-6'}`}>
                  <step.icon className="w-10 h-10 text-white" strokeWidth={2.5} />
                  
                  {/* Floating emoji */}
                  <div className={`absolute -top-2 -right-2 text-2xl transition-all duration-500 ${activeStep === index ? 'scale-125 rotate-12' : ''}`}>
                    {step.emoji}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>

                  {/* Expandable Detail */}
                  <div className={`overflow-hidden transition-all duration-500 ${activeStep === index ? 'max-h-32 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className={`mt-3 p-4 ${step.bgColor} rounded-xl border border-gray-200`}>
                      <p className="text-xs text-gray-700">
                        {step.detail}
                      </p>
                    </div>
                  </div>

                  {/* Stat Badge */}
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full text-xs font-semibold text-green-700 border border-green-200">
                      <TrendingUp className="w-3 h-3" />
                      {step.stat}
                    </span>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              </div>

              {/* Mobile Arrow */}
              {index < steps.length - 1 && (
                <div className="md:hidden flex justify-center py-4">
                  <div className="flex flex-col items-center gap-2 text-green-500">
                    <div className="w-0.5 h-8 bg-gradient-to-b from-green-300 to-green-500"></div>
                    <div className="w-8 h-8 border-2 border-green-500 rounded-full flex items-center justify-center bg-white animate-bounce">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorksSection;