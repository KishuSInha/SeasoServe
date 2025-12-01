import { Button } from "@/components/ui/button";
import { Sun, Cloud, CloudRain, Snowflake, Wind } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="min-h-screen gradient-hero relative overflow-hidden flex items-center pt-20">
      {/* Floating Weather Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <Sun className="absolute top-[20%] left-[10%] w-12 h-12 text-sun-yellow/40 floating-icon" />
        <Cloud className="absolute top-[30%] right-[15%] w-16 h-16 text-sky-blue/30 floating-icon" style={{ animationDelay: '-2s' }} />
        <CloudRain className="absolute bottom-[30%] left-[20%] w-10 h-10 text-sky-blue/25 floating-icon" style={{ animationDelay: '-4s' }} />
        <Snowflake className="absolute top-[50%] right-[10%] w-8 h-8 text-sky-blue/20 floating-icon" style={{ animationDelay: '-1s' }} />
        <Wind className="absolute bottom-[20%] right-[25%] w-10 h-10 text-muted-foreground/20 floating-icon" style={{ animationDelay: '-3s' }} />
        <Sun className="absolute bottom-[40%] left-[5%] w-6 h-6 text-sun-yellow/30 floating-icon" style={{ animationDelay: '-5s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="animate-fade-up mb-8">
            <h2 className="text-5xl md:text-7xl font-extrabold text-gradient mx-auto">
              SeasoServe
            </h2>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground mb-6 animate-fade-up-delay-1">
            Eat Right for{" "}
            <span className="text-gradient">Every Climate.</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up-delay-2">
            AI-powered food recommendations based on your environment, season, and health.
            Stay nourished, energized, and healthy—no matter the weather.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up-delay-3">
            <Button variant="hero" size="xl">
              Get Started
            </Button>
            <Button variant="hero-outline" size="xl">
              Login
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 animate-fade-up-delay-3">
            <p className="text-sm text-muted-foreground mb-4">Personalized for your climate</p>
            <div className="flex justify-center gap-6">
              {[
                { icon: Sun, label: "Hot", color: "text-sun-yellow" },
                { icon: CloudRain, label: "Rainy", color: "text-sky-blue" },
                { icon: Snowflake, label: "Cold", color: "text-sky-blue" },
                { icon: Wind, label: "Windy", color: "text-muted-foreground" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity"
                >
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="hsl(var(--background))"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
