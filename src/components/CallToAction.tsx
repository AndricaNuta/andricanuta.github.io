import { motion } from "framer-motion";
import AppStoreBadge from "./AppStoreBadge";
import appConverter from "@/assets/app-screenshot-converter.png";
import appWatchlist from "@/assets/app-screenshot-watchlist.png";

const CallToAction = () => {
  return (
    <section className="py-20 lg:py-32 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="relative bg-gradient-hero rounded-3xl p-8 md:p-16 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-2xl" />

          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <motion.div
              className="text-center lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Start saving money on your next trip
              </h2>
              <p className="text-white/90 text-lg md:text-xl mb-6 max-w-md mx-auto lg:mx-0 leading-relaxed">
                Download free now—no account, no credit card, just instant currency conversion. Join smart travelers who never overpay abroad.
              </p>
              <div className="flex flex-col gap-4 mb-6">
                <AppStoreBadge href="https://apps.apple.com/ro/app/currensee-scan/id6753315641?l=ro" />
                <p className="text-white/70 text-sm">
                  ⚡ Instant setup • 🔒 100% private • ✨ No ads interrupting your experience
                </p>
              </div>
            </motion.div>

            {/* Phone mockups */}
            <motion.div
              className="hidden lg:flex justify-center items-end gap-4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
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
