/**
 * Analytics utility for tracking user interactions and page views
 * Useful for understanding how users interact with your landing page during development
 * 
 * To use with Google Analytics, add your GA4 measurement ID to VITE_GA_MEASUREMENT_ID
 * To use with Plausible, add your domain to VITE_PLAUSIBLE_DOMAIN
 * To use with custom analytics, implement the trackEvent function
 */

let analyticsInitialized = false;

// Initialize analytics scripts
export const initializeAnalytics = () => {
  if (typeof window === 'undefined' || analyticsInitialized) return;
  
  analyticsInitialized = true;

  // Initialize Google Analytics 4
  const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (gaMeasurementId) {
    // Load GA4 script
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
    document.head.appendChild(script1);

    // Initialize gtag
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    (window as any).gtag = gtag;
    gtag('js', new Date());
    gtag('config', gaMeasurementId, {
      page_path: window.location.pathname,
    });
    
    console.log('[Analytics] Google Analytics 4 initialized');
  }

  // Initialize Plausible Analytics
  const plausibleDomain = import.meta.env.VITE_PLAUSIBLE_DOMAIN;
  if (plausibleDomain) {
    const script2 = document.createElement('script');
    script2.defer = true;
    script2.setAttribute('data-domain', plausibleDomain);
    script2.src = 'https://plausible.io/js/script.js';
    document.head.appendChild(script2);
    
    console.log('[Analytics] Plausible Analytics initialized');
  }

  // If no analytics configured, log to console
  if (!gaMeasurementId && !plausibleDomain) {
    console.warn('[Analytics] No analytics provider configured. Set VITE_GA_MEASUREMENT_ID or VITE_PLAUSIBLE_DOMAIN');
  }
};

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

  // Pricing plan view
  trackPricingView: (planName: string) => {
    trackEvent('pricing_view', { plan_name: planName });
  },

  // Pricing plan click
  trackPricingClick: (planName: string, location: string) => {
    trackEvent('pricing_click', { plan_name: planName, location });
  },

  // Support/Contact form submission
  trackSupportSubmit: (formType: string) => {
    trackEvent('support_submit', { form_type: formType });
  },

  // Video/Media play
  trackMediaPlay: (mediaType: string, mediaName: string) => {
    trackEvent('media_play', { media_type: mediaType, media_name: mediaName });
  },

  // Download/Install attempt
  trackDownload: (platform: string, source: string) => {
    trackEvent('download', { platform, source });
  },

  // Time on page (tracked via scroll depth)
  trackEngagement: (metric: string, value: number) => {
    trackEvent('engagement', { metric, value });
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
