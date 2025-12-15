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
    <section
      id="why"
      className="relative py-28 overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-lime-50"
    >
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-green-300/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-emerald-300/20 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT – Content */}
          <Reveal>
            <div className="space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-10 bg-gradient-to-b from-green-500 via-emerald-500 to-green-600 rounded-full" />
                <span className="text-sm uppercase tracking-[0.3em] font-bold text-gray-700">
                  The Benefits
                </span>
              </div>

              <h2 className="text-4xl md:text-6xl font-black leading-tight text-gray-900">
                Why Choose{" "}
                <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  SeasoServe?
                </span>
              </h2>

              <p className="text-xl text-gray-700 max-w-xl leading-relaxed">
                Your body’s nutritional needs shift with weather and environment.
                <span className="font-semibold text-green-700">
                  {" "}SeasoServe adapts your meals
                </span>{" "}
                so you always eat what your body truly needs.
              </p>
            </div>
          </Reveal>

          {/* RIGHT – Benefits Cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <Reveal key={benefit} delay={index * 100}>
                <div className="group relative bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-green-100 hover:border-green-300 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  
                  {/* Hover glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-200/30 to-emerald-200/30 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />

                  <div className="relative flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-gray-900 font-semibold leading-snug">
                      {benefit}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
