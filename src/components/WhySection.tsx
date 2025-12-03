import { Check } from "lucide-react";
import Reveal from "./Reveal";

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
    <section id="why" className="py-24 bg-gradient-to-tr from-background via-sky-blue/5 to-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 left-20 w-96 h-96 bg-[hsl(217,91%,73%)] blur-3xl animate-[morphBlob_27s_ease-in-out_infinite]" />
        <div className="absolute bottom-1/4 right-10 w-[500px] h-[500px] bg-[hsl(230,95%,77%)] blur-3xl animate-[morphBlob_23s_ease-in-out_infinite_reverse]" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <Reveal>
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
                  <Reveal key={benefit} delay={index * 100}>
                    <li className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-leaf-green/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-leaf-green" />
                      </div>
                      <span className="text-foreground font-medium">{benefit}</span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Visual */}
          <Reveal delay={200}>
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
                      <Reveal key={item.label} delay={400 + index * 100}>
                        <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 text-center card-hover">
                          <div className="text-4xl mb-2">{item.emoji}</div>
                          <p className="text-sm font-medium text-foreground">
                            {item.label}
                          </p>
                        </div>
                      </Reveal>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-4 -right-4 bg-leaf-green text-secondary-foreground px-6 py-3 rounded-full font-semibold shadow-lg animate-pulse-glow">
                Science-Backed
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
