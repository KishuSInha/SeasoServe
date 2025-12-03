import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Reveal from "./Reveal";

const CTASection = () => {
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

  return (
    <section className="py-24 gradient-primary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-leaf-green rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-blue rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <Reveal className="max-w-3xl mx-auto text-center">
          <Smartphone className="w-16 h-16 text-leaf-green mx-auto mb-6" />

          <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Eat Smarter?
          </h2>

          <p className="text-primary-foreground/80 text-lg mb-10">
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
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 h-12"
              required
            />
            <Button variant="cta" size="lg" type="submit" className="gap-2">
              Get Early Access
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <p className="text-primary-foreground/60 text-sm mt-4">
            No spam, ever. Unsubscribe anytime.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default CTASection;
