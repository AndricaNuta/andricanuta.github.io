import { motion } from "framer-motion";
import PhoneMockup from "./PhoneMockup";
import AppStoreBadge from "./AppStoreBadge";
import appScreenshot from "@/assets/app-screenshot-scan.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-subtle">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Scan prices.
              <br />
              <span className="text-gradient">Convert instantly.</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed">
              Stop doing mental math abroad. CurrenSee instantly converts prices when you point your camera at any menu, receipt, or price tag.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <AppStoreBadge href="#" />
              <p className="text-sm text-muted-foreground">
                Free to download • 100% private
              </p>
            </div>
          </motion.div>

          {/* Phone mockup */}
          <div className="relative flex justify-center lg:justify-end">
            <PhoneMockup
              imageSrc={appScreenshot}
              alt="CurrenSee app scanning a restaurant menu"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
