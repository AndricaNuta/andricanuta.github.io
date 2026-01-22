import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import FeatureCard from "./FeatureCard";
import {
  Camera,
  Share2,
  Languages,
  Shield,
  Bookmark,
  Smartphone,
} from "lucide-react";

const Features = () => {
  const { t } = useTranslation();
  
  const features = [
    {
      icon: Camera,
      title: t('features.scan.title'),
      description: t('features.scan.description'),
    },
    {
      icon: Shield,
      title: t('features.private.title'),
      description: t('features.private.description'),
    },
    {
      icon: Languages,
      title: t('features.translation.title'),
      description: t('features.translation.description'),
    },
    {
      icon: Bookmark,
      title: t('features.save.title'),
      description: t('features.save.description'),
    },
    {
      icon: Share2,
      title: t('features.share.title'),
      description: t('features.share.description'),
    },
    {
      icon: Smartphone,
      title: t('features.widgets.title'),
      description: t('features.widgets.description'),
    },
  ];
  return (
    <section id="features" className="py-16 lg:py-24 bg-background relative overflow-hidden">
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
              {t('features.badge')}
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            {t('features.title')}
          </h2>
          <p className="text-muted-foreground text-xl leading-relaxed font-normal md:font-normal">
            {t('features.description')}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
