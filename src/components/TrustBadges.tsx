import Marquee from "./magicui/marquee";
import { Shield, Globe, Lock, Zap } from "lucide-react";

const badges = [
  { icon: Shield, text: "100% Private" },
  { icon: Globe, text: "150+ Currencies" },
  { icon: Lock, text: "No Account Needed" },
  { icon: Zap, text: "Instant Conversion" },
];

const TrustBadges = () => {
  return (
    <section className="py-8 bg-background border-y border-border">
      <div className="container mx-auto px-6">
        <Marquee pauseOnHover className="[--duration:20s]">
          {badges.map((badge, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 mx-8 px-6 py-3 rounded-full bg-card border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <badge.icon className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-foreground whitespace-nowrap">
                {badge.text}
              </span>
            </div>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default TrustBadges;
