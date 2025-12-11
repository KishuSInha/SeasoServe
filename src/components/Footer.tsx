import { useState } from "react";
import { Twitter, Instagram, Linkedin, Github, ArrowRight, Smartphone, Users, Globe, Leaf, TrendingUp } from "lucide-react";
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
    if (email) {
      toast({
        title: "You're on the list!",
        description: "We'll notify you when SeasoServe launches.",
      });
      setEmail("");
    }
  };

  const footerLinks = {
    product: [
      { label: "Features", href: "#features" },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Climate Guide", href: "#climate" },
      { label: "Pricing", href: "#" },
    ],
    company: [
      { label: "About", href: "#" },
      { label: "Team", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Blog", href: "#" },
    ],
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
  ];

  const stats = [
    {
      icon: Users,
      value: "10K+",
      label: "Active Users",
      color: "text-sky-blue",
      bgColor: "bg-sky-blue/10",
    },
    {
      icon: Globe,
      value: "50+",
      label: "Countries",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      icon: Leaf,
      value: "1M+",
      label: "Meals Planned",
      color: "text-leaf-green",
      bgColor: "bg-leaf-green/10",
    },
    {
      icon: TrendingUp,
      value: "95%",
      label: "Satisfaction",
      color: "text-sun-yellow",
      bgColor: "bg-sun-yellow/10",
    },
  ];

  return (
    <footer className="text-background relative overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src="/winter.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" style={{ zIndex: 1 }}></div>

      {/* Stats Section */}
      <div className="py-16 relative" style={{ zIndex: 10 }}>
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-background mb-2">
              Trusted by Food Lovers Worldwide
            </h3>
            <p className="text-background/70">
              Join thousands who eat smarter with SeasoServe
            </p>
          </Reveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Reveal key={stat.label} delay={index * 100}>
                <div className="bg-background/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-background/20">
                  <div className={`w-16 h-16 rounded-2xl ${stat.bgColor} flex items-center justify-center mx-auto mb-4`}>
                    <stat.icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-background mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-background/70 font-medium">
                    {stat.label}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="pt-8 pb-24 relative" style={{ zIndex: 10 }}>
        <div className="container mx-auto px-4">
          <Reveal className="max-w-3xl mx-auto text-center">
            <Smartphone className="w-16 h-16 text-sky-blue mx-auto mb-6" />

            <h2 className="text-3xl md:text-5xl font-bold text-background mb-6">
              Ready to Eat Smarter?
            </h2>

            <p className="text-background/80 text-lg mb-10">
              Join thousands waiting for the future of personalized nutrition.
              Get early access when we launch on Android & iOS.
            </p>

            {/* Email Signup */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50 h-12"
                required
              />
              <Button variant="secondary" size="lg" type="submit" className="gap-2">
                Get Early Access
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            <p className="text-background/60 text-sm mt-4">
              No spam, ever. Unsubscribe anytime.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Footer Links */}
      <div className="py-16 border-t border-background/10 relative" style={{ zIndex: 10 }}>
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand */}
          <Reveal className="lg:col-span-2">
            <h3 className="text-3xl font-bold text-background mb-4">SeasoServe</h3>
            <p className="text-background/70 max-w-sm mb-6">
              AI-powered food recommendations based on your environment, season, and health.
              Nature guides, we serve.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-leaf-green hover:text-foreground transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </Reveal>

          {/* Links */}
          <Reveal delay={200}>
            <h4 className="font-semibold text-background mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-leaf-green transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={300}>
            <h4 className="font-semibold text-background mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-leaf-green transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={400}>
            <h4 className="font-semibold text-background mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-background/70 hover:text-leaf-green transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* Bottom Bar */}
        <Reveal delay={500}>
          <div className="pt-8 border-t border-background/10">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-background/60 text-sm">
                © {currentYear} SeasoServe. All rights reserved.
              </p>
              <p className="text-background/60 text-sm">
                Healthier choices, one tap at a time.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
