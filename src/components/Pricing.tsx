import { motion } from "framer-motion";
import { Sparkles, Zap } from "lucide-react";

const Pricing = () => {
  return (
    <section className="py-20 lg:py-32 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Simple pricing
          </h2>
          <p className="text-muted-foreground text-lg">
            Start for free, upgrade when you need more.
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
              <h3 className="text-xl font-semibold text-foreground">Free</h3>
            </div>
            <p className="text-3xl font-bold text-foreground mb-2">$0</p>
            <p className="text-muted-foreground text-sm mb-6">
              Ad-supported — hey, it's free!
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Instant price scanning
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Share & save prices
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Label translation
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Home screen widgets
              </li>
            </ul>
          </motion.div>

          {/* Premium tier */}
          <motion.div
            className="relative p-8 rounded-2xl bg-gradient-hero text-white overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5" />
                <h3 className="text-xl font-semibold">Premium</h3>
              </div>
              <p className="text-3xl font-bold mb-2">Coming soon</p>
              <p className="text-white/70 text-sm mb-6">
                Ad-free with AI-powered features
              </p>
              <ul className="space-y-3 text-sm text-white/80">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  Everything in Free
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  No ads, ever
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  AI-powered improvements
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  More features on the way...
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
