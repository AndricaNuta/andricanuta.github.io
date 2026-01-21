import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import AppStoreBadge from "./AppStoreBadge";
import { X } from "lucide-react";
import { analytics } from "@/lib/analytics";

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  const handleDismiss = useCallback((e: React.MouseEvent | React.PointerEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    analytics.trackEvent('floating_cta_dismiss');
    setIsDismissed(true);
    setIsVisible(false);
  }, []);

  useEffect(() => {
    // Show after user scrolls past hero section
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      if (window.scrollY > heroHeight * 0.7 && !isDismissed && !isVisible) {
        setIsVisible(true);
        analytics.trackEvent('floating_cta_view');
      } else if (window.scrollY <= heroHeight * 0.7) {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed, isVisible]);

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
          <div className="relative bg-card border border-border rounded-2xl shadow-2xl p-3 mx-4 max-w-sm">
            <div className="pr-8">
              <p className="text-sm font-semibold text-foreground mb-1.5">
                Download CurrenSee Free
              </p>
              <p className="text-xs text-muted-foreground mb-2.5">
                Never overpay abroad again
              </p>
              <AppStoreBadge 
                href="https://apps.apple.com/ro/app/currensee-scan/id6753315641?l=ro"
                className="w-full justify-center !px-3 !py-1.5 !gap-1.5"
                compact
                source="floating-cta"
              />
            </div>
            <button
              type="button"
              onMouseDown={handleDismiss}
              onClick={handleDismiss}
              onPointerDown={handleDismiss}
              onTouchStart={handleDismiss}
              className="absolute top-1 right-1 p-2 rounded-full hover:bg-muted active:bg-muted/80 transition-colors cursor-pointer touch-manipulation"
              aria-label="Dismiss"
              style={{ zIndex: 1000 }}
            >
              <X className="w-4 h-4 text-muted-foreground pointer-events-none" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCTA;
