import {
  CloudSun,
  UtensilsCrossed,
  Bot,
  Plane,
  AlertTriangle,
  Leaf,
  ScanLine,
  BarChart3,
} from "lucide-react";
import Reveal from "./Reveal";

const features = [
  {
    icon: CloudSun,
    title: "Climate-based Suggestions",
    description: "Food recommendations that adapt to your local weather .",
    color: "text-sky-blue",
    bgColor: "bg-sky-blue/10",
  },
  {
    icon: UtensilsCrossed,
    title: "Personalized Meal Planning",
    description: "Weekly meal plans tailored to your preferences and health goals.",
    color: "text-leaf-green",
    bgColor: "bg-leaf-green/10",
  },
  {
    icon: Bot,
    title: "AI Recipe Chatbot",
    description: "Ask our AI for recipes, cooking tips, and nutritional advice.",
    color: "text-sun-yellow",
    bgColor: "bg-sun-yellow/10",
  },
  {
    icon: Plane,
    title: "Travel Mode",
    description: "Get food suggestions for your destination before you arrive.",
    color: "text-deep-blue",
    bgColor: "bg-deep-blue/10",
  },
  {
    icon: AlertTriangle,
    title: "Climate Risk Alerts",
    description: "Stay ahead of weather changes with proactive nutrition tips.",
    color: "text-warm-red",
    bgColor: "bg-warm-red/10",
  },
  {
    icon: Leaf,
    title: "Seasonal & Local Produce",
    description: "Discover what's fresh and in-season in your area.",
    color: "text-leaf-green",
    bgColor: "bg-leaf-green/10",
  },
  {
    icon: ScanLine,
    title: "Food Scanner",
    description: "Scan foods to check if they're right for your current climate.",
    color: "text-sky-blue",
    bgColor: "bg-sky-blue/10",
  },
  {
    icon: BarChart3,
    title: "Nutrition Analytics",
    description: "Track your eating patterns and nutritional intake over time.",
    color: "text-sun-yellow",
    bgColor: "bg-sun-yellow/10",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <Reveal className="text-center mb-16">
          <span className="text-leaf-green font-semibold text-sm uppercase tracking-wider">
            Powerful Features
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            Everything You Need
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools to help you eat smarter based on your environment
          </p>
        </Reveal>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={index * 100} vanish>
              <div className="bg-card rounded-xl p-6 border border-border card-hover group glow-on-hover">
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
