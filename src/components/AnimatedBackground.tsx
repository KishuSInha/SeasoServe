import { useEffect, useState } from 'react';

const backgrounds = [
  'from-emerald-50 via-teal-50 to-cyan-50',
  'from-blue-50 via-indigo-50 to-purple-50',
  'from-orange-50 via-amber-50 to-yellow-50',
  'from-rose-50 via-pink-50 to-fuchsia-50',
];

export default function AnimatedBackground() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(i => (i + 1) % backgrounds.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 -z-10">
      {backgrounds.map((bg, i) => (
        <div
          key={i}
          className={`absolute inset-0 bg-gradient-to-br ${bg} transition-opacity duration-[3000ms] ${
            i === index ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]" />
    </div>
  );
}
