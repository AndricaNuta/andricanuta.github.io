import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }: { mode: string }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  const plugins: any[] = [react()];
  
  // Only add componentTagger in development mode
  if (mode === "development") {
    try {
      // Dynamic import for optional dev-only plugin
      // @ts-expect-error - lovable-tagger is an optional dev dependency
      const { componentTagger } = await import("lovable-tagger");
      if (componentTagger) {
        plugins.push(componentTagger());
      }
    } catch {
      // Plugin not available, continue without it
    }
  }
  
  // Get GA Measurement ID from environment
  const gaMeasurementId = env.VITE_GA_MEASUREMENT_ID;
  
  // Plugin to inject GA script into HTML head
  if (gaMeasurementId) {
    plugins.push({
      name: 'inject-ga-script',
      transformIndexHtml: {
        enforce: 'pre',
        transform(html: string) {
          const gaScript = `
    <!-- Google Analytics 4 -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${gaMeasurementId}');
    </script>`;
          return html.replace('</head>', `${gaScript}\n  </head>`);
        },
      },
    });
  }
  
  return {
    base: '/',
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
