import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import AppStoreBadge from "./AppStoreBadge";
import { X } from "lucide-react";

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Show after user scrolls past hero section
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      if (window.scrollY > heroHeight * 0.7 && !isDismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 lg:hidden"
        >
          <div className="relative bg-card border border-border rounded-2xl shadow-2xl p-4 mx-4 max-w-sm">
            <button
              onClick={() => {
                setIsDismissed(true);
                setIsVisible(false);
              }}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-muted transition-colors"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
            <div className="pr-8">
              <p className="text-sm font-semibold text-foreground mb-2">
                Download CurrenSee Free
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                Never overpay abroad again
              </p>
              <AppStoreBadge 
                href="https://apps.apple.com/ro/app/currensee-scan/id6753315641?l=ro"
                className="w-full justify-center"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCTA;
