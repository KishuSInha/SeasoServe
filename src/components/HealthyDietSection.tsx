import { useEffect, useState } from "react";
import Reveal from "./Reveal";

const HealthyDietSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById('healthy-diet-section');
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionTop = rect.top;
      const sectionHeight = rect.height;

      // Calculate progress: 0 when section enters viewport, 1 when fully visible
      const progress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight + sectionHeight / 2)));
      setScrollProgress(progress);
      
      // Trigger content reveal after images are visible (0.5s delay)
      if (progress >= 0.5 && !showContent) {
        setTimeout(() => setShowContent(true), 500);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showContent]);

  // Images pop first (0-0.5)
  const imageScale = scrollProgress < 0.5 ? 0.5 + scrollProgress : 1;
  const imageOpacity = scrollProgress < 0.5 ? scrollProgress * 2 : 1;
  
  // Content loads after 0.5s delay
  const contentBlur = showContent ? 'blur(0px)' : 'blur(10px)';
  const contentOpacity = showContent ? 1 : 0.3;

  return (
    <section id="healthy-diet-section" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* LEFT TEXT SECTION */}
          <div className="lg:w-2/5 space-y-8" style={{ opacity: contentOpacity, filter: contentBlur, transition: 'opacity 0.6s ease, filter 0.6s ease' }}>
            <Reveal>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-foreground">
                EAT WITH<br />
                THE SEASONS,<br />
                THRIVE ALWAYS.
              </h2>
            </Reveal>

            <Reveal delay={100}>
              <p className="text-xl text-muted-foreground font-medium">
                Climate-smart nutrition,<br />
                powered by nature.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <div className="space-y-4 text-foreground">
                <p className="flex items-center gap-3">
                  <span className="text-sun-yellow text-2xl">•</span>
                  <span>Food recommendations that adapt to your weather</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-sun-yellow text-2xl">•</span>
                  <span>Seasonal ingredients for optimal nutrition</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-sun-yellow text-2xl">•</span>
                  <span>Personalized meal plans for your climate zone</span>
                </p>
              </div>
            </Reveal>
          </div>

          {/* RIGHT GRAPHIC SECTION */}
          <div className="lg:w-3/5 relative h-[700px] w-full flex items-center justify-center">
            
            {/* YELLOW CIRCLE */}
            <div className="absolute w-[400px] h-[400px] rounded-full shadow-xl" style={{background: 'radial-gradient(circle, #fde68a 0%, #facc15 70%, rgba(255,255,255,0.35) 100%)', opacity: contentOpacity, filter: contentBlur, transition: 'opacity 0.6s ease, filter 0.6s ease' }}></div>

            {/* BERRY BLEND - TOP RIGHT */}
            <Reveal delay={300}>
              <div className="absolute top-[40px] right-[30px] z-20 -rotate-12 flex flex-col items-center">
                <div className="w-[200px] h-[200px] rounded-full overflow-hidden border-[5px] border-black shadow-2xl hover:scale-105 transition-all duration-500" style={{ transform: `scale(${imageScale})`, opacity: imageOpacity }}>
                  <img 
                    src="/images/smoothie.jpg" 
                    alt="Berry Blend" 
                    className="w-full h-full object-cover scale-[1.4] rotate-12"
                  />
                </div>
                <span className="inline-block mt-3 font-bold text-foreground text-lg rotate-12 text-center" style={{ opacity: contentOpacity, filter: contentBlur, transition: 'opacity 0.6s ease, filter 0.6s ease' }}>
                  Berry Blend
                </span>

              </div>
            </Reveal>

            {/* PROTEIN FUSION - LEFT CENTER */}
            <Reveal delay={400}>
              <div className="absolute left-[80px] top-1/2 -translate-y-1/2 z-20 rotate-6 flex flex-col items-center">
                <div className="w-[200px] h-[200px] rounded-full overflow-hidden border-[5px] border-black shadow-2xl hover:scale-105 transition-all duration-500" style={{ transform: `scale(${imageScale})`, opacity: imageOpacity }}>
                  <img 
                    src="/images/bowl.jpg" 
                    alt="Protein Fusion" 
                    className="w-full h-full object-cover object-center scale-[1.4] -rotate-6"
                  />
                </div>
                <span className="inline-block mt-3 font-bold text-foreground text-lg -rotate-6 text-center" style={{ opacity: contentOpacity, filter: contentBlur, transition: 'opacity 0.6s ease, filter 0.6s ease' }}>Protein Fusion</span>
              </div>
            </Reveal>

            {/* RAINBOW HARVEST - BOTTOM RIGHT */}
            <Reveal delay={500}>
              <div className="absolute bottom-[20px] right-[10px] z-20 -rotate-6 flex flex-col items-center">
                <div className="w-[200px] h-[200px] rounded-full overflow-hidden border-[5px] border-black shadow-2xl hover:scale-105 transition-all duration-500" style={{ transform: `scale(${imageScale})`, opacity: imageOpacity }}>
                  <img 
                    src="/images/salad.jpg" 
                    alt="Rainbow Harvest" 
                    className="w-full h-full object-cover scale-[1.4] rotate-6"
                  />
                </div>
                <span className="inline-block mt-3 font-bold text-foreground text-lg rotate-6 text-center" style={{ opacity: contentOpacity, filter: contentBlur, transition: 'opacity 0.6s ease, filter 0.6s ease' }}>Rainbow Harvest</span>
              </div>
            </Reveal>

          </div>

        </div>
      </div>
    </section>
  );
};

export default HealthyDietSection;
