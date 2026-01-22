import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { ThemeProvider as CustomThemeProvider } from "@/contexts/ThemeContext";
import { useThemeStyles } from "@/hooks/use-theme-styles";
import { useI18nLang } from "@/hooks/use-i18n-lang";
import { useEffect } from "react";
import { trackPageView, setupScrollTracking } from "@/lib/analytics";
import Index from "./pages/Index";
import Feedback from "./pages/Feedback";
import Support from "./pages/Support";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Component to apply theme styles
const ThemeStyles = () => {
  useThemeStyles();
  return null;
};

// Component to update HTML lang attribute
const I18nLang = () => {
  useI18nLang();
  return null;
};

// Component to handle analytics
const Analytics = () => {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change
    trackPageView(location.pathname);
  }, [location]);

  useEffect(() => {
    // Setup scroll tracking
    const cleanup = setupScrollTracking();
    return cleanup;
  }, []);

  return null;
};

const App = () => (
  <ThemeProvider 
    attribute="class" 
    defaultTheme="system" 
    enableSystem 
    disableTransitionOnChange
    storageKey="theme-preference"
  >
    <CustomThemeProvider>
      <ThemeStyles />
      <I18nLang />
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Analytics />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/support" element={<Support />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </CustomThemeProvider>
  </ThemeProvider>
);

export default App;
