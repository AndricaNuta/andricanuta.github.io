import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import AppStoreBadge from "./AppStoreBadge";
import { X } from "lucide-react";
import { analytics } from "@/lib/analytics";

const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleDismiss = useCallback((e?: React.MouseEvent | React.PointerEvent | React.TouchEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log('Dismissing FloatingCTA', { isDismissed, isVisible });
    // Update state immediately
    setIsDismissed(true);
    setIsVisible(false);
    // Analytics call non-blocking
    try {
      analytics.trackEvent('floating_cta_dismiss');
    } catch (err) {
      console.error('Analytics error:', err);
    }
  }, [isDismissed, isVisible]);

  // Add direct DOM event listener as fallback
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleClick = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('Direct DOM click handler fired');
      handleDismiss();
    };

    button.addEventListener('click', handleClick, true);
    button.addEventListener('mousedown', handleClick, true);
    button.addEventListener('pointerdown', handleClick, true);

    return () => {
      button.removeEventListener('click', handleClick, true);
      button.removeEventListener('mousedown', handleClick, true);
      button.removeEventListener('pointerdown', handleClick, true);
    };
  }, [handleDismiss, isVisible]);

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
    <AnimatePresence mode="wait">
      {isVisible && !isDismissed && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 lg:hidden"
        >
          <div className="relative bg-card border border-border rounded-2xl shadow-2xl p-3 mx-4 max-w-sm">
            <button
              ref={buttonRef}
              type="button"
              onMouseDown={(e) => {
                console.log('onMouseDown fired');
                handleDismiss(e);
              }}
              onClick={(e) => {
                console.log('onClick fired');
                handleDismiss(e);
              }}
              onPointerDown={(e) => {
                console.log('onPointerDown fired');
                handleDismiss(e);
              }}
              onTouchStart={(e) => {
                console.log('onTouchStart fired');
                handleDismiss(e);
              }}
              className="absolute -top-2 -right-2 p-2 rounded-full hover:bg-muted active:bg-muted/80 transition-colors cursor-pointer touch-manipulation bg-background border border-border shadow-lg z-[9999]"
              aria-label="Dismiss"
              style={{ 
                pointerEvents: 'auto',
                minWidth: '32px',
                minHeight: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X className="w-4 h-4 text-muted-foreground pointer-events-none" />
            </button>
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
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCTA;
