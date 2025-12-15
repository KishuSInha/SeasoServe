import { useState } from "react";
import {
  Twitter,
  Instagram,
  Linkedin,
  Github,
  ArrowRight,
  CloudSun,
  UtensilsCrossed,
  Bot,
  Plane,
  Leaf,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Reveal from "./Reveal";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    toast({
      title: "You're on the list 🌱",
      description: "Early access details will be sent to your inbox.",
    });

    setEmail("");
  };

  const footerLinks = {
    product: ["Features", "How It Works", "Climate Guide", "Pricing"],
    company: ["About", "Team", "Careers", "Blog"],
    legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  };

  return (
    <footer className="relative overflow-hidden text-background">

      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hidden md:block w-full h-full object-cover opacity-70"
        >
          <source src="/winter.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/70 to-black/80" />
      </div>

      {/* ================= CTA SECTION (ENHANCED) ================= */}
      <section className="relative z-10 py-24">
        <div className="container mx-auto px-6">
          <Reveal className="max-w-4xl mx-auto text-center space-y-10">

            {/* Feature Pills */}
            <div className="flex justify-center gap-4 flex-wrap">
              {[
                { icon: CloudSun, label: "Climate-Based" },
                { icon: Bot, label: "AI Powered" },
                { icon: UtensilsCrossed, label: "Personalized Meals" },
                { icon: Plane, label: "Travel Ready" },
                { icon: Leaf, label: "Seasonal Foods" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-sm text-background/90"
                >
                  <item.icon className="w-4 h-4 text-leaf-green" />
                  <span className="font-medium">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">
                Eat Smarter. Every Season.
                <span className="block text-leaf-green">
                  Every Place.
                </span>
              </h2>

              <p className="text-lg text-background/75 max-w-2xl mx-auto">
                Climate-aware meals, AI-powered planning, and seasonal nutrition —
                tailored to your environment, lifestyle, and travel.
              </p>
            </div>

            {/* Email Signup */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <Input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-white/10 border-white/20 text-background placeholder:text-background/50"
              />
              <Button
                type="submit"
                size="lg"
                className="gap-2 bg-leaf-green text-foreground hover:bg-leaf-green/90"
              >
                Get Early Access
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
            

            <p className="text-xs text-background/60">
              ✓ No spam • ✓ Free early access • ✓ Built for real climates
            </p>
          </Reveal>
        </div>

        {/* Trust indicators - Enhanced */}
        <div className="flex flex-wrap items-center justify-center gap-12 pt-10 ">
          <div className="text-center group hover:scale-110 transition-transform duration-300 cursor-pointer">
            <p className="text-4xl font-black text-gray-900 mb-1 group-hover:text-green-600 transition-colors duration-300">500+</p>
            <p className="text-sm text-gray-600 font-bold uppercase tracking-wider">Climate zones</p>
          </div>
          <div className="text-center group hover:scale-110 transition-transform duration-300 cursor-pointer">
            <p className="text-4xl font-black text-gray-900 mb-1 group-hover:text-green-600 transition-colors duration-300">1M+</p>
            <p className="text-sm text-gray-600 font-bold uppercase tracking-wider">Meals served</p>
          </div>
          <div className="text-center group hover:scale-110 transition-transform duration-300 cursor-pointer">
            <p className="text-4xl font-black text-gray-900 mb-1 group-hover:text-green-600 transition-colors duration-300">Real-time</p>
            <p className="text-sm text-gray-600 font-bold uppercase tracking-wider">Weather sync</p>
          </div>
        </div>
      </section>
      

      {/* ================= FOOTER LINKS ================= */}
      <section className="relative z-10 border-t border-white/10 py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">

            {/* Brand */}
            <Reveal className="lg:col-span-2">
              <h3 className="text-3xl font-bold mb-4">SeasoServe</h3>
              <p className="text-background/70 max-w-sm mb-6">
                Climate-aware nutrition powered by real-time environmental data.
                Nature guides, we serve.
              </p>

              <div className="flex gap-4">
                {[Twitter, Instagram, Linkedin, Github].map((Icon, idx) => (
                  <a
                    key={idx}
                    href="#"
                    aria-label="Social link"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-leaf-green hover:text-foreground transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </Reveal>

            {/* Product */}
            <Reveal delay={200}>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-3 text-background/70">
                {footerLinks.product.map((item) => (
                  <li key={item} className="hover:text-leaf-green transition-colors">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            

            {/* Company */}
            <Reveal delay={300}>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-3 text-background/70">
                {footerLinks.company.map((item) => (
                  <li key={item} className="hover:text-leaf-green transition-colors">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Legal */}
            <Reveal delay={400}>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-3 text-background/70">
                {footerLinks.legal.map((item) => (
                  <li key={item} className="hover:text-leaf-green transition-colors">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Bottom Bar */}
          <Reveal delay={500}>
            <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/60">
              <p>© {currentYear} SeasoServe. All rights reserved.</p>
              <p>Healthier choices, guided by nature 🌱</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Reduced Motion Support */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
