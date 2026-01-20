import { motion } from "framer-motion";
import FeatureCard from "./FeatureCard";
import {
  Camera,
  Share2,
  Languages,
  Shield,
  Bookmark,
  Smartphone,
} from "lucide-react";

const features = [
  {
    icon: Camera,
    title: "Scan in Seconds",
    description: "Point, scan, done. No typing, no manual entry. Get instant currency conversions from any price tag, menu, or receipt in under 2 seconds.",
  },
  {
    icon: Shield,
    title: "100% Private & Secure",
    description: "Your photos never leave your device. All processing happens locally on your phone—no cloud, no servers, no data collection.",
  },
  {
    icon: Languages,
    title: "Smart Translation",
    description: "Not just currency conversion—translate price labels and descriptions too. Understand exactly what you're buying, in any language.",
  },
  {
    icon: Bookmark,
    title: "Save & Compare",
    description: "Save prices as you shop to compare later. Perfect for finding the best deals across different stores or planning your travel budget.",
  },
  {
    icon: Share2,
    title: "Share Instantly",
    description: "Share converted prices with travel companions instantly. Great for splitting bills, group shopping, or showing friends back home.",
  },
  {
    icon: Smartphone,
    title: "Widgets & Quick Access",
    description: "Check exchange rates without opening the app. Home screen and lock screen widgets keep you informed at a glance.",
  },
];

const Features = () => {
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
              Powerful Features
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Everything you need to shop confidently abroad
          </h2>
          <p className="text-muted-foreground text-xl leading-relaxed font-normal md:font-light">
            Powerful features designed to make international travel stress-free and budget-friendly.
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
