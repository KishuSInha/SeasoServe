import { Check } from "lucide-react";

const benefits = [
  "Eat according to your climate",
  "Reduce dehydration, fatigue, seasonal sickness",
  "Improve digestion and energy levels",
  "Get science-backed suggestions",
  "Save time deciding what to eat",
  "Adapt meals when traveling",
];

const WhySection = () => {
  return (
    <section id="why" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <span className="text-leaf-green font-semibold text-sm uppercase tracking-wider">
              The Benefits
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mt-3 mb-6">
              Why Choose{" "}
              <span className="text-gradient">SeasoServe?</span>
            </h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Your body's nutritional needs change with the weather. SeasoServe ensures
              you're always eating what's best for your current environment.
            </p>

            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li
                  key={benefit}
                  className="flex items-center gap-3 animate-fade-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-6 h-6 rounded-full bg-leaf-green/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-leaf-green" />
                  </div>
                  <span className="text-foreground font-medium">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="aspect-square rounded-3xl gradient-hero overflow-hidden relative">
              {/* Decorative Elements */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 p-8">
                  {[
                    { emoji: "🌡️", label: "Climate Aware" },
                    { emoji: "🥗", label: "Healthy Meals" },
                    { emoji: "🧠", label: "AI Powered" },
                    { emoji: "🌍", label: "Travel Ready" },
                  ].map((item, index) => (
                    <div
                      key={item.label}
                      className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 text-center card-hover"
                      style={{ animationDelay: `${index * 0.15}s` }}
                    >
                      <div className="text-4xl mb-2">{item.emoji}</div>
                      <p className="text-sm font-medium text-foreground">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-4 -right-4 bg-leaf-green text-secondary-foreground px-6 py-3 rounded-full font-semibold shadow-lg animate-pulse-glow">
              Science-Backed
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
