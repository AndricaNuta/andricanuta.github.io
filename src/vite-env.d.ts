/// <reference types="vite/client" />

// Analytics type declarations
interface Window {
  dataLayer?: any[];
  gtag?: (...args: any[]) => void;
  plausible?: (eventName: string, options?: { u?: string; props?: Record<string, any> }) => void;
}
