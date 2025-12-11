// components/HeroSection.tsx
import { Button } from "@/components/ui/button";
import { Sun, Cloud, CloudRain, Snowflake, Wind } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useToast } from "@/components/ui/use-toast";

const HeroSection = () => {
  const { toast } = useToast();

  return (
    <section
      className="min-h-screen w-full relative flex items-center justify-center"
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src="/oranges.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30" style={{ zIndex: 1 }}></div>

      {/* Floating Weather Icons with Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
        <Sun className="absolute top-[20%] left-[10%] w-12 h-12 text-sun-yellow/50 floating-icon" />
        <Cloud
          className="absolute top-[30%] right-[15%] w-16 h-16 text-sky-blue/40 floating-icon"
          style={{ animationDelay: "-2s" }}
        />
        <CloudRain
          className="absolute bottom-[30%] left-[20%] w-10 h-10 text-sky-blue/35 floating-icon"
          style={{ animationDelay: "-4s" }}
        />
        <Snowflake
          className="absolute top-[50%] right-[10%] w-8 h-8 text-sky-blue/30 floating-icon"
          style={{ animationDelay: "-1s" }}
        />
        <Wind
          className="absolute bottom-[20%] right-[25%] w-10 h-10 text-muted-foreground/30 floating-icon"
          style={{ animationDelay: "-3s" }}
        />
        <Sun
          className="absolute bottom-[40%] left-[5%] w-6 h-6 text-sun-yellow/40 floating-icon"
          style={{ animationDelay: "-5s" }}
        />
      </div>

      <div className="container mx-auto px-4 relative" style={{ zIndex: 10 }}>
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-8">
            <h2 className="text-5xl md:text-7xl font-extrabold text-gradient mx-auto">
              SeasoServe
            </h2>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6">
            Nature guides,
            <br />
            <span className="text-gradient">we serve.</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10">
            AI-powered food recommendations based on your environment, season,
            and health. Stay nourished, energized, and healthy—no matter the
            weather.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="hero"
              size="xl"
              onClick={() =>
                toast({
                  title: "Welcome to SeasoServe",
                  description: "Personalized food guidance is just a step away.",
                })
              }
            >
              Step Into
            </Button>
            <Button variant="hero-outline" size="xl">
              Login
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16">
            <p className="text-sm text-white/80 mb-4">
              Personalized for your climate
            </p>
            <div className="flex justify-center gap-6">
              {[
                { icon: Sun, label: "Hot", color: "text-sun-yellow" },
                { icon: CloudRain, label: "Rainy", color: "text-sky-blue" },
                { icon: Snowflake, label: "Cold", color: "text-sky-blue" },
                { icon: Wind, label: "Windy", color: "text-muted-foreground" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity" >
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                  <span className="text-xs text-white/70">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
