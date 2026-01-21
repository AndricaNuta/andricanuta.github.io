import { motion } from "framer-motion";
import { Camera, Sparkles, Globe, CheckCircle2 } from "lucide-react";
import PhoneMockup from "./PhoneMockup";
import AppStoreBadge from "./AppStoreBadge";
import appScreenshot from "@/assets/app-screenshot-scan.png";

const steps = [
  {
    number: "01",
    icon: Camera,
    title: "Point & Scan",
    description: "Open CurrenSee and point your camera at any price tag, menu, or receipt. The app automatically detects prices using advanced OCR technology.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    number: "02",
    icon: Sparkles,
    title: "Instant Conversion",
    description: "Get real-time currency conversion in your preferred currency. See the converted price instantly—no waiting, no manual entry needed.",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    number: "03",
    icon: Globe,
    title: "Smart Translation",
    description: "Not just numbers—translate price labels and descriptions too. Understand exactly what you're buying in any language.",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    number: "04",
    icon: CheckCircle2,
    title: "Save & Compare",
    description: "Save prices as you shop to compare later. Perfect for finding the best deals or planning your travel budget.",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
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
              Simple Process
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            How it works
          </h2>
          <p className="text-muted-foreground text-xl leading-relaxed font-normal md:font-normal">
            Four simple steps to never overpay abroad again
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className="relative"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <div className="flex gap-6 items-start">
                  {/* Step number and icon */}
                  <div className="relative flex-shrink-0">
                    <div className={`w-16 h-16 rounded-2xl ${step.bgColor} flex items-center justify-center relative`}>
                      <step.icon className={`w-8 h-8 ${step.color}`} />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                      {step.number.slice(-1)}
                    </div>
                    {/* Connector line */}
                    {index < steps.length - 1 && (
                      <div className="absolute left-1/2 top-16 w-0.5 h-12 bg-gradient-to-b from-primary/30 to-transparent transform -translate-x-1/2" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Phone mockup */}
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              <PhoneMockup
                imageSrc={appScreenshot}
                alt="CurrenSee app in action"
              />
              {/* Floating glow effect */}
              <div className="absolute inset-0 -z-10 bg-primary/20 rounded-[3rem] blur-3xl scale-110 animate-pulse-soft" />
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-lg text-muted-foreground mb-4">
            Ready to try it yourself?
          </p>
          <AppStoreBadge href="https://apps.apple.com/ro/app/currensee-scan/id6753315641?l=ro" source="how-it-works" />
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
