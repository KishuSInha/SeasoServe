import { Users, Globe, Leaf, TrendingUp } from "lucide-react";
import Reveal from "./Reveal";

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

const StatsSection = () => {
  return (
    <section className="py-16 pb-0 bg-gradient-to-b from-background to-foreground relative overflow-hidden">
      {/* Background Effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-blue rounded-full blur-3xl animate-[morphBlob_20s_ease-in-out_infinite]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <Reveal className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            Trusted by Food Lovers Worldwide
          </h3>
          <p className="text-muted-foreground">
            Join thousands who eat smarter with SeasoServe
          </p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 100} vanish>
              <div className="bg-card rounded-2xl p-6 text-center card-hover glow-on-hover border border-border">
                <div className={`w-16 h-16 rounded-2xl ${stat.bgColor} flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  {stat.label}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
