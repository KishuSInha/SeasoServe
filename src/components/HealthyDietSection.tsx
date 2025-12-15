import { useEffect, useState } from "react";
import Reveal from "./Reveal";

const HealthyDietSection = () => {
  const [scrollProgress, setScrollProgress] = useState(1);
  const [showContent, setShowContent] = useState(true);

  useEffect(() => {
    // Disable scroll-based animation; render content fully visible.
    setScrollProgress(1);
    setShowContent(true);
  }, []);

  // Images and content are fully visible (no scroll animation)
  const imageScale = 1;
  const imageOpacity = 1;
  const contentBlur = 'blur(0px)';
  const contentOpacity = 1;

  return (
    <section id="healthy-diet-section" className="py-24 bg-gradient-to-br from-white via-amber-50/30 to-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-40 h-40 bg-amber-300/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* LEFT TEXT SECTION */}
          <div className="lg:w-2/5 space-y-8" style={{ opacity: contentOpacity, filter: contentBlur, transition: 'opacity 0.6s ease, filter 0.6s ease' }}>
            <Reveal>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] text-gray-900 tracking-tight">
                EAT WITH<br />
                <span className="bg-gradient-to-r from-yellow-500 via-amber-500 to-yellow-600 bg-clip-text text-transparent">
                  THE SEASONS,
                </span><br />
                THRIVE ALWAYS.
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-2xl text-gray-600 font-semibold leading-relaxed">
                Climate-smart nutrition,powered by nature.<br />
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="space-y-5 text-gray-800">
                <div className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300">
                  <span className="text-yellow-500 text-3xl mt-1 group-hover:scale-125 transition-transform duration-300">●</span>
                  <span className="text-lg font-medium leading-relaxed">Food recommendations that adapt to your weather</span>
                </div>
                <div className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300">
                  <span className="text-yellow-500 text-3xl mt-1 group-hover:scale-125 transition-transform duration-300">●</span>
                  <span className="text-lg font-medium leading-relaxed">Seasonal ingredients for optimal nutrition</span>
                </div>
                <div className="flex items-start gap-4 group hover:translate-x-2 transition-transform duration-300">
                  <span className="text-yellow-500 text-3xl mt-1 group-hover:scale-125 transition-transform duration-300">●</span>
                  <span className="text-lg font-medium leading-relaxed">Personalized meal plans for your climate zone</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT GRAPHIC SECTION */}
          <div className="lg:w-3/5 relative h-[700px] w-full flex items-center justify-center">
            
            {/* YELLOW CIRCLE WITH GLOW */}
            <div className="absolute w-[420px] h-[420px] rounded-full shadow-2xl animate-pulse" 
                 style={{
                   background: 'radial-gradient(circle, #fde68a 0%, #facc15 60%, #f59e0b 100%)', 
                   opacity: contentOpacity, 
                   filter: contentBlur, 
                   transition: 'opacity 0.6s ease, filter 0.6s ease', 
                   boxShadow: '0 0 100px rgba(250, 204, 21, 0.5), 0 0 150px rgba(245, 158, 11, 0.3)'
                 }}>
            </div>

            {/* Floating Sparkles */}
            <div className="absolute w-3 h-3 bg-yellow-400 rounded-full top-10 left-20 animate-ping opacity-75"></div>
            <div className="absolute w-2 h-2 bg-amber-400 rounded-full bottom-32 left-10 animate-ping opacity-60" style={{animationDelay: '1s'}}></div>
            <div className="absolute w-3 h-3 bg-yellow-300 rounded-full top-40 right-32 animate-ping opacity-70" style={{animationDelay: '0.5s'}}></div>

            {/* BERRY BLEND - TOP RIGHT */}
            <Reveal delay={300}>
              <div className="absolute top-[40px] right-[30px] z-20 -rotate-12 flex flex-col items-center group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                  <div className="relative w-[210px] h-[210px] rounded-full overflow-hidden border-[6px] border-gray-900 shadow-2xl hover:scale-110 hover:rotate-6 hover:shadow-3xl transition-all duration-500 cursor-pointer" 
                       style={{ transform: `scale(${imageScale})`, opacity: imageOpacity }}>
                    <img 
                      src="/images/smoothie.jpg" 
                      alt="Berry Blend" 
                      className="w-full h-full object-cover scale-[1.4] rotate-12 group-hover:scale-[1.5] transition-transform duration-500"
                    />
                  </div>
                </div>
                <span className="inline-block mt-4 px-4 py-2 bg-white/90 backdrop-blur-sm font-bold text-gray-900 text-lg rotate-12 text-center group-hover:scale-110 group-hover:bg-white transition-all duration-300 rounded-full shadow-lg" 
                      style={{ opacity: contentOpacity, filter: contentBlur }}>
                  Berry Blend
                </span>
              </div>
            </Reveal>

            {/* PROTEIN FUSION - LEFT CENTER */}
            <Reveal delay={400}>
              <div className="absolute left-[80px] top-1/2 -translate-y-1/2 z-20 rotate-6 flex flex-col items-center group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                  <div className="relative w-[210px] h-[210px] rounded-full overflow-hidden border-[6px] border-gray-900 shadow-2xl hover:scale-110 hover:-rotate-3 hover:shadow-3xl transition-all duration-500 cursor-pointer" 
                       style={{ transform: `scale(${imageScale})`, opacity: imageOpacity }}>
                    <img 
                      src="/images/bowl.jpg" 
                      alt="Protein Fusion" 
                      className="w-full h-full object-cover object-center scale-[1.4] -rotate-6 group-hover:scale-[1.5] transition-transform duration-500"
                    />
                  </div>
                </div>
                <span className="inline-block mt-4 px-4 py-2 bg-white/90 backdrop-blur-sm font-bold text-gray-900 text-lg -rotate-6 text-center group-hover:scale-110 group-hover:bg-white transition-all duration-300 rounded-full shadow-lg" 
                      style={{ opacity: contentOpacity, filter: contentBlur }}>
                  Protein Fusion
                </span>
              </div>
            </Reveal>

            {/* RAINBOW HARVEST - BOTTOM RIGHT */}
            <Reveal delay={500}>
              <div className="absolute bottom-[20px] right-[10px] z-20 -rotate-6 flex flex-col items-center group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
                  <div className="relative w-[210px] h-[210px] rounded-full overflow-hidden border-[6px] border-gray-900 shadow-2xl hover:scale-110 hover:rotate-3 hover:shadow-3xl transition-all duration-500 cursor-pointer" 
                       style={{ transform: `scale(${imageScale})`, opacity: imageOpacity }}>
                    <img 
                      src="/images/salad.jpg" 
                      alt="Rainbow Harvest" 
                      className="w-full h-full object-cover scale-[1.4] rotate-6 group-hover:scale-[1.5] transition-transform duration-500"
                    />
                  </div>
                </div>
                <span className="inline-block mt-4 px-4 py-2 bg-white/90 backdrop-blur-sm font-bold text-gray-900 text-lg rotate-6 text-center group-hover:scale-110 group-hover:bg-white transition-all duration-300 rounded-full shadow-lg" 
                      style={{ opacity: contentOpacity, filter: contentBlur }}>
                  Rainbow Harvest
                </span>
              </div>
            </Reveal>

          </div>

        </div>
      </div>
    </section>
  );
};

export default HealthyDietSection;