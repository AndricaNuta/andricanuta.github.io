import { useTranslation } from "react-i18next";
import Marquee from "./magicui/marquee";
import { Shield, Globe, Lock, Zap } from "lucide-react";

const TrustBadges = () => {
  const { t } = useTranslation();
  
  const badges = [
    { icon: Shield, text: t('trustBadges.private') },
    { icon: Globe, text: t('trustBadges.currencies') },
    { icon: Lock, text: t('trustBadges.noAccount') },
    { icon: Zap, text: t('trustBadges.instant') },
  ];
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
