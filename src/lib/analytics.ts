/**
 * Analytics utility for tracking user interactions and page views
 * Useful for understanding how users interact with your landing page during development
 * 
 * To use with Google Analytics, add your GA4 measurement ID to VITE_GA_MEASUREMENT_ID
 * To use with Plausible, add your domain to VITE_PLAUSIBLE_DOMAIN
 * To use with custom analytics, implement the trackEvent function
 */

// Track page views
export const trackPageView = (path: string) => {
  // Google Analytics 4
  if (import.meta.env.VITE_GA_MEASUREMENT_ID && typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID, {
      page_path: path,
    });
  }

  // Plausible Analytics
  if (import.meta.env.VITE_PLAUSIBLE_DOMAIN && typeof window !== 'undefined' && (window as any).plausible) {
    (window as any).plausible('pageview', { u: path });
  }

  // Custom analytics - implement your own tracking here
  if (typeof window !== 'undefined') {
    console.log('[Analytics] Page view:', path);
    // Add your custom tracking code here
  }
};

// Track custom events
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  // Google Analytics 4
  if (import.meta.env.VITE_GA_MEASUREMENT_ID && typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventParams);
  }

  // Plausible Analytics
  if (import.meta.env.VITE_PLAUSIBLE_DOMAIN && typeof window !== 'undefined' && (window as any).plausible) {
    (window as any).plausible(eventName, { props: eventParams });
  }

  // Custom analytics
  if (typeof window !== 'undefined') {
    console.log('[Analytics] Event:', eventName, eventParams);
    // Add your custom tracking code here
  }
};

// Common event tracking helpers
export const analytics = {
  // App Store badge clicks
  trackAppStoreClick: (source: string) => {
    trackEvent('app_store_click', { source });
  },

  // Section views (for scroll tracking)
  trackSectionView: (sectionName: string) => {
    trackEvent('section_view', { section_name: sectionName });
  },

  // CTA clicks
  trackCTAClick: (ctaName: string, location: string) => {
    trackEvent('cta_click', { cta_name: ctaName, location });
  },

  // Email signup
  trackEmailSignup: (source: string) => {
    trackEvent('email_signup', { source });
  },

  // Feedback submission
  trackFeedbackSubmit: (type: string) => {
    trackEvent('feedback_submit', { feedback_type: type });
  },

  // Feature interest
  trackFeatureInterest: (featureName: string) => {
    trackEvent('feature_interest', { feature_name: featureName });
  },
};

// Intersection Observer for scroll tracking
export const setupScrollTracking = () => {
  if (typeof window === 'undefined') return;

  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        if (sectionId) {
          analytics.trackSectionView(sectionId);
        }
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });

  return () => {
    sections.forEach((section) => {
      observer.unobserve(section);
    });
  };
};
