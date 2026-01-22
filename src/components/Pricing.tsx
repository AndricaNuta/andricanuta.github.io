import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Sparkles, Zap } from "lucide-react";
import { ShineBorder } from "./magicui/shine-border";
import { analytics } from "@/lib/analytics";
import { useEffect, useRef } from "react";

const Pricing = () => {
  const { t } = useTranslation();
  const hasTrackedView = useRef(false);

  useEffect(() => {
    // Track when pricing section comes into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTrackedView.current) {
            hasTrackedView.current = true;
            analytics.trackPricingView('pricing_section');
          }
        });
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('pricing');
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section id="pricing" className="py-16 lg:py-24 bg-background relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)`,
        backgroundSize: '50px 50px'
      }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              {t('pricing.badge')}
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            {t('pricing.title')}
          </h2>
          <p className="text-muted-foreground text-xl leading-relaxed font-normal md:font-normal">
            {t('pricing.description')}
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Free tier */}
          <motion.div
            className="p-8 rounded-2xl bg-card border border-border"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-semibold text-foreground">{t('pricing.free.title')}</h3>
            </div>
            <p className="text-3xl font-bold text-foreground mb-2">{t('pricing.free.price')}</p>
            <p className="text-muted-foreground text-sm mb-6">
              {t('pricing.free.subtitle')}
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {t('pricing.free.features.scanning')}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {t('pricing.free.features.share')}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {t('pricing.free.features.translation')}
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                {t('pricing.free.features.widgets')}
              </li>
            </ul>
          </motion.div>

          {/* Premium tier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <ShineBorder
              borderRadius={16}
              borderWidth={2}
              color="rgba(255, 255, 255, 0.3)"
              className="relative"
            >
              <div className="relative p-8 rounded-2xl bg-gradient-hero text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
                <div className="relative">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5" />
                    <h3 className="text-xl font-semibold">{t('pricing.premium.title')}</h3>
                  </div>
                  <p className="text-3xl font-bold mb-2">{t('pricing.premium.price')}</p>
                  <p className="text-white/70 text-sm mb-6">
                    {t('pricing.premium.subtitle')}
                  </p>
                  <ul className="space-y-3 text-sm text-white/80">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      {t('pricing.premium.features.everything')}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      {t('pricing.premium.features.noAds')}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      {t('pricing.premium.features.ai')}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                      {t('pricing.premium.features.more')}
                    </li>
                  </ul>
                </div>
              </div>
            </ShineBorder>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
