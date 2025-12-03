import { useState, useEffect } from "react";
import { ArrowUp, Sparkles } from "lucide-react";

const FloatingAction = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* Scroll to Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-sky-blue to-accent text-white shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-110 animate-[fadeInScale_0.3s_ease-out] group"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6 mx-auto group-hover:animate-bounce" />
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-blue to-accent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
        </button>
      )}

      {/* Floating CTA Badge */}
      <div className="fixed bottom-8 left-8 z-50 animate-[fadeInScale_0.5s_ease-out]">
        <div className="bg-gradient-to-r from-sky-blue to-accent text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-pulse-glow">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-semibold">AI-Powered</span>
        </div>
      </div>
    </>
  );
};

export default FloatingAction;
