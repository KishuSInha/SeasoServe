import { useState, useEffect } from "react";

const sections = [
  { id: "hero", label: "Home" },
  { id: "how-it-works", label: "How It Works" },
  { id: "features", label: "Features" },
  { id: "climate", label: "Climate" },
  { id: "why", label: "Why" },
  { id: "stats", label: "Stats" },
];

const SectionIndicator = () => {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3">
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          className="group relative"
          aria-label={`Go to ${section.label}`}
        >
          <div
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === section.id
                ? "bg-sky-blue scale-125 shadow-lg shadow-sky-blue/50"
                : "bg-muted-foreground/30 hover:bg-muted-foreground/60 hover:scale-110"
            }`}
          />
          <span className="absolute right-6 top-1/2 -translate-y-1/2 bg-foreground text-background px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            {section.label}
          </span>
        </button>
      ))}
    </div>
  );
};

export default SectionIndicator;
