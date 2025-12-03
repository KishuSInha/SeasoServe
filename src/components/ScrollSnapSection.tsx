import { ReactNode, useEffect, useRef, useState } from "react";

interface ScrollSnapSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

const ScrollSnapSection = ({ children, className = "", id }: ScrollSnapSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: "-10% 0px -10% 0px",
      }
    );

    const handleScroll = () => {
      if (!section) return;
      
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how much of the section is visible
      const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
      const progress = Math.max(0, Math.min(1, visibleHeight / windowHeight));
      
      setScrollProgress(progress);
    };

    observer.observe(section);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`scroll-snap-section ${className}`}
      style={{
        opacity: 0.3 + scrollProgress * 0.7,
        transform: `scale(${0.95 + scrollProgress * 0.05})`,
      }}
    >
      {children}
    </section>
  );
};

export default ScrollSnapSection;
