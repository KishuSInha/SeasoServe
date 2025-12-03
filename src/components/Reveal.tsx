import { useRef, useEffect, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  vanish?: boolean; // Enable vanish on scroll out
}

export default function Reveal({ children, className = "", delay = 0, vanish = false }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (vanish) {
          // Continuous animation - show when in view, hide when out
          setVisible(entry.isIntersecting);
        } else {
          // One-time animation - show once and stay
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(element);
          }
        }
      },
      { threshold: 0.15, rootMargin: "-50px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [vanish]);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`
        transition-all duration-700 ease-out 
        ${visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
