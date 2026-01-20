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
                Ready to travel smarter?
              </h2>
              <p className="text-white/80 text-lg mb-8 max-w-md mx-auto lg:mx-0">
                Download now for free. No account needed, just point and convert.
              </p>
              <AppStoreBadge href="https://apps.apple.com/ro/app/currensee-scan/id6753315641?l=ro" />
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
