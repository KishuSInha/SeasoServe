import { Thermometer, User, UtensilsCrossed, ArrowRight } from "lucide-react";
import Reveal from "./Reveal";

const steps = [
  {
    icon: Thermometer,
    title: "Detect Your Environment",
    description: "We analyze temperature, humidity, AQI, and real-time weather conditions in your location.",
    color: "bg-sky-blue/10 text-sky-blue",
    borderColor: "border-sky-blue/30",
  },
  {
    icon: User,
    title: "Understand Your Body",
    description: "Your age, dietary preferences, allergies, and lifestyle help us personalize recommendations.",
    color: "bg-leaf-green/10 text-leaf-green",
    borderColor: "border-leaf-green/30",
  },
  {
    icon: UtensilsCrossed,
    title: "Suggest the Right Foods",
    description: "Get AI-powered, science-backed meal suggestions tailored to your unique needs.",
    color: "bg-sun-yellow/10 text-sun-yellow",
    borderColor: "border-sun-yellow/30",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-[hsl(217,91%,75%)] blur-3xl animate-[morphBlob_22s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/3 left-10 w-96 h-96 bg-[hsl(230,95%,78%)] blur-3xl animate-[morphBlob_28s_ease-in-out_infinite_reverse]" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <Reveal className="text-center mb-16">
          <span className="text-leaf-green font-semibold text-sm uppercase tracking-wider">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-3 mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to personalized nutrition that adapts to your environment
          </p>
        </Reveal>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection Lines (Desktop) */}
          <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-sky-blue via-leaf-green to-sun-yellow opacity-30" />

          {steps.map((step, index) => (
            <Reveal key={step.title} delay={index * 200} vanish>
              <div className="relative pt-6">
                {/* Step Card */}
                <div className={`bg-card rounded-2xl p-8 border-2 ${step.borderColor} card-hover text-center glow-on-hover relative overflow-visible`}>
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gradient-to-br from-sky-blue to-accent text-white flex items-center justify-center font-bold text-lg shadow-lg z-20">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`w-20 h-20 rounded-2xl ${step.color} flex items-center justify-center mx-auto mb-6`}>
                    <step.icon className="w-10 h-10" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                {/* Arrow (Mobile) */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center my-4">
                    <ArrowRight className="w-6 h-6 text-muted-foreground rotate-90" />
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
