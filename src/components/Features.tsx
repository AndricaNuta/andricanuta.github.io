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
    title: "Instant Scanning",
    description: "Point your camera at any price tag, menu, or receipt. Get instant conversions with no typing required.",
  },
  {
    icon: Share2,
    title: "Easy Sharing",
    description: "Share converted prices with friends and family. Perfect for planning group trips or shopping together.",
  },
  {
    icon: Bookmark,
    title: "Save Prices",
    description: "Save your converted prices for later. Keep track of what you've found while traveling.",
  },
  {
    icon: Languages,
    title: "Label Translation",
    description: "Translate price labels into any language you need. Understand what you're buying, anywhere.",
  },
  {
    icon: Shield,
    title: "100% Private",
    description: "All processing happens on your device. Your data never leaves your phone.",
  },
  {
    icon: Smartphone,
    title: "Home Screen Widgets",
    description: "Check rates at a glance with widgets for your home screen and lock screen.",
  },
];

const Features = () => {
  return (
    <section className="py-20 lg:py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why travelers love CurrenSee
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need for hassle-free currency conversion abroad.
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
