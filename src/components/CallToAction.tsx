import { motion } from "framer-motion";
import AppStoreBadge from "./AppStoreBadge";
import appConverter from "@/assets/app-screenshot-converter.png";
import appWatchlist from "@/assets/app-screenshot-watchlist.png";

const CallToAction = () => {
  return (
    <section className="py-16 lg:py-24 bg-background overflow-hidden relative">
      <div className="container mx-auto px-6">
        <div className="relative bg-gradient-hero rounded-3xl p-10 md:p-20 overflow-hidden shadow-2xl">
          {/* Enhanced decorative elements - Optimized for Safari */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse-soft blur-optimized" style={{ willChange: 'filter, opacity', transform: 'translateZ(0)' }} />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full blur-2xl animate-pulse-soft blur-optimized" style={{ animationDelay: '1s', willChange: 'filter, opacity', transform: 'translateZ(0)' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl blur-optimized" style={{ willChange: 'filter', transform: 'translateZ(0)' }} />
          
          {/* Brand pattern overlay */}
          <div className="absolute inset-0 opacity-[0.05]" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />

          <div className="relative grid lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <motion.div
              className="text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ willChange: 'transform, opacity' }}
            >
              <motion.div
                className="inline-block mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ willChange: 'transform, opacity' }}
              >
                <span className="text-sm font-semibold text-white/80 uppercase tracking-wider">
                  Ready to Start?
                </span>
              </motion.div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                Start saving money on your next trip
              </h2>
              <p className="text-white/90 text-xl md:text-2xl mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed font-normal md:font-normal">
                Download free now—no account, no credit card, just instant currency conversion. Join smart travelers who never overpay abroad.
              </p>
              <div className="flex flex-col gap-6 mb-8">
                <AppStoreBadge href="https://apps.apple.com/ro/app/currensee-scan/id6753315641?l=ro" source="cta" />
                <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm justify-center lg:justify-start">
                  <div className="flex items-center gap-2">
                    <span>⚡</span>
                    <span>Instant setup</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🔒</span>
                    <span>100% private</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✨</span>
                    <span>No ads interrupting</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Phone mockups */}
            <motion.div
              className="hidden lg:flex justify-center items-end gap-4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              style={{ willChange: 'transform, opacity' }}
            >
              <div className="relative -mb-16 transform -rotate-6">
                <div className="w-[180px] rounded-[2rem] bg-white/10 p-2 shadow-xl">
                  <img
                    src={appConverter}
                    alt="CurrenSee converter screen"
                    className="rounded-[1.5rem] w-full"
                  />
                </div>
              </div>
              <div className="relative -mb-8 transform rotate-3 z-10">
                <div className="w-[200px] rounded-[2rem] bg-white/10 p-2 shadow-xl">
                  <img
                    src={appWatchlist}
                    alt="CurrenSee watchlist screen"
                    className="rounded-[1.5rem] w-full"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
