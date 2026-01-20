import { motion } from "framer-motion";
import { Shield, Zap, Globe, Lock } from "lucide-react";
import { NumberTicker } from "./magicui/number-ticker";

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
    <section className="pt-16 pb-12 lg:pt-24 lg:pb-16 bg-gradient-subtle relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      </div>
      
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
              Trust & Security
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Built for travelers, by travelers
          </h2>
          <p className="text-muted-foreground text-xl leading-relaxed">
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
          className="mt-12 pt-8 pb-8 border-t-2 border-b-2 border-primary/20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16 text-muted-foreground">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                <NumberTicker value={100} />%
              </div>
              <div className="text-sm font-medium">Private & Secure</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                <NumberTicker value={150} />+
              </div>
              <div className="text-sm font-medium">Currencies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">Free</div>
              <div className="text-sm font-medium">Forever</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                <NumberTicker value={0} />
              </div>
              <div className="text-sm font-medium">Account Required</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
