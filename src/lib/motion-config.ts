/**
 * Framer Motion configuration for better Safari performance
 * and reduced motion support
 */

// Check for reduced motion preference
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Default transition configuration optimized for Safari
export const defaultTransition = {
  duration: 0.6,
  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number], // Custom cubic-bezier for smoother animations
};

// Reduced motion transition (instant for accessibility)
export const reducedMotionTransition = {
  duration: 0,
  ease: [0, 0, 0, 0] as [number, number, number, number],
};

// Get appropriate transition based on user preference
export const getTransition = (customDuration?: number) => {
  if (prefersReducedMotion()) {
    return reducedMotionTransition;
  }
  return customDuration 
    ? { ...defaultTransition, duration: customDuration }
    : defaultTransition;
};

// Safari smooth scroll polyfill
export const initSafariSmoothScroll = () => {
  if (typeof window === 'undefined') return;
  
  // Check if smooth scroll is supported
  const supportsSmoothScroll = 'scrollBehavior' in document.documentElement.style;
  
  // If not supported (Safari < 15.4), use polyfill
  if (!supportsSmoothScroll && prefersReducedMotion() === false) {
    // Use native smooth scrolling via JavaScript for anchor links
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href !== '#') {
          const targetElement = document.querySelector(href);
          if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
            });
          }
        }
      }
    });
  }
};
