import { motion } from "framer-motion";
import { Shield, Zap, Globe, Lock } from "lucide-react";

const trustFeatures = [
  {
    icon: Shield,
    title: "100% Private",
    description: "All processing happens on your device. Your photos never leave your phone.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get instant conversions in under 2 seconds. No waiting, no delays.",
  },
  {
    icon: Globe,
    title: "150+ Currencies",
    description: "Works with all major currencies worldwide. Convert anywhere you travel.",
  },
  {
    icon: Lock,
    title: "No Account Required",
    description: "Start using immediately. No sign-up, no email, no personal data collected.",
  },
];

const Testimonials = () => {
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
            Built for travelers, by travelers
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to shop confidently and save money abroad
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="p-6 rounded-2xl bg-card border border-border hover:shadow-card transition-shadow duration-300 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mx-auto mb-4 group-hover:bg-primary transition-colors duration-300">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators - honest metrics only */}
        <motion.div
          className="mt-16 pt-12 border-t border-border"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 text-muted-foreground">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">100%</div>
              <div className="text-sm">Private & Secure</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">150+</div>
              <div className="text-sm">Currencies</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">Free</div>
              <div className="text-sm">Forever</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">0</div>
              <div className="text-sm">Account Required</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
