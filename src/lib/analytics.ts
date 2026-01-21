/**
 * Analytics utility for tracking user interactions and page views
 * Useful for understanding how users interact with your landing page during development
 * 
 * To use with Google Analytics, add your GA4 measurement ID to VITE_GA_MEASUREMENT_ID
 * To use with Plausible, add your domain to VITE_PLAUSIBLE_DOMAIN
 * To use with custom analytics, implement the trackEvent function
 */

let analyticsInitialized = false;
let gaScriptLoaded = false;

// Initialize analytics scripts
export const initializeAnalytics = () => {
  if (typeof window === 'undefined' || analyticsInitialized) return;
  
  analyticsInitialized = true;

  // Initialize Google Analytics 4
  const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (gaMeasurementId) {
    // Check if GA script was already injected in HTML (via Vite plugin)
    // If gtag already exists, it means the script was injected in <head>
    if ((window as any).gtag && (window as any).dataLayer) {
      // Script already loaded from HTML, just ensure dataLayer exists
      window.dataLayer = window.dataLayer || [];
      console.log('[Analytics] Google Analytics 4 already loaded from HTML head');
    } else {
      // Fallback: Load GA4 script dynamically if not in HTML
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      (window as any).gtag = gtag;
      
      // Set initial config immediately (will be processed when script loads)
      gtag('js', new Date());
      gtag('config', gaMeasurementId, {
        page_path: window.location.pathname,
        send_page_view: true,
      });

      // Load GA4 script
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`;
      
      // Wait for script to load
      script1.onload = () => {
        gaScriptLoaded = true;
        console.log('[Analytics] Google Analytics 4 script loaded successfully');
      };
      
      script1.onerror = () => {
        console.error('[Analytics] Failed to load Google Analytics 4 script. This may be due to ad blockers or network issues.');
      };
      
      document.head.appendChild(script1);
      console.log('[Analytics] Google Analytics 4 initialized dynamically with ID:', gaMeasurementId);
    }
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
  const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  
  // Google Analytics 4
  if (gaMeasurementId && typeof window !== 'undefined') {
    // Ensure dataLayer exists
    window.dataLayer = window.dataLayer || [];
    
    // Use gtag if available, otherwise queue in dataLayer
    if ((window as any).gtag) {
      (window as any).gtag('config', gaMeasurementId, {
        page_path: path,
        page_location: window.location.href,
      });
    } else {
      // Queue the config if gtag isn't ready yet
      window.dataLayer.push({
        event: 'config',
        'config': gaMeasurementId,
        page_path: path,
        page_location: window.location.href,
      });
    }
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
const trackEventInternal = (
  eventName: string,
  eventParams?: Record<string, unknown>
) => {
  const gaMeasurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  
  // Google Analytics 4
  if (gaMeasurementId && typeof window !== 'undefined') {
    // Ensure dataLayer exists
    window.dataLayer = window.dataLayer || [];
    
    // Use gtag if available, otherwise queue in dataLayer
    if ((window as any).gtag) {
      (window as any).gtag('event', eventName, eventParams || {});
    } else {
      // Queue the event if gtag isn't ready yet
      window.dataLayer.push({
        event: eventName,
        ...(eventParams || {}),
      });
    }
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

// Export trackEvent for direct use
export const trackEvent = trackEventInternal;

// Common event tracking helpers
export const analytics = {
  // Generic event tracking (for custom events)
  trackEvent: (eventName: string, eventParams?: Record<string, unknown>) => {
    trackEventInternal(eventName, eventParams);
  },

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

  // Floating CTA view
  trackFloatingCTAView: () => {
    trackEvent('floating_cta_view');
  },

  // Floating CTA dismiss
  trackFloatingCTADismiss: () => {
    trackEvent('floating_cta_dismiss');
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
