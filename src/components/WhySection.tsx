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
    <section id="why" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
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
        </div>
      </div>
    </section>
  );
};

export default WhySection;
