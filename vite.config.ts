import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { readFileSync, writeFileSync } from "fs";

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
  
  // Plugin to create 404.html with redirect script for GitHub Pages SPA routing
  plugins.push({
    name: 'create-404-html',
    closeBundle() {
      const distPath = path.resolve(__dirname, 'dist');
      const indexPath = path.join(distPath, 'index.html');
      
      try {
        // Read the built index.html
        const indexHtml = readFileSync(indexPath, 'utf-8');
        
        // Create 404.html with redirect script
        // This script redirects /support to /?/support, then index.html handles it
        const redirectScript = `
    <script>
      // Single Page Apps for GitHub Pages
      // Redirects unknown routes to index.html with path preserved in query string
      var pathSegmentsToKeep = 0;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>`;
        
        // Insert redirect script at the very beginning of head tag so it runs first
        // This ensures immediate redirect before any other scripts load
        const fourOhFourHtml = indexHtml.replace('<head>', '<head>' + redirectScript);
        
        // Write 404.html
        writeFileSync(path.join(distPath, '404.html'), fourOhFourHtml);
        console.log('✓ Created 404.html with redirect script for GitHub Pages');
      } catch (error) {
        console.error('Failed to create 404.html:', error);
      }
    },
  });
  
  // Plugin to inject path restoration script into index.html
  plugins.push({
    name: 'inject-spa-redirect-handler',
    transformIndexHtml: {
      enforce: 'post',
      transform(html: string) {
        // Script to restore path from query parameter before React Router loads
        const pathRestoreScript = `
    <script>
      // Restore path from query parameter (set by 404.html redirect)
      (function(l) {
        if (l.search[1] === '/') {
          var decoded = l.search.slice(1).split('&').map(function(s) {
            return s.replace(/~and~/g, '&');
          }).join('?');
          window.history.replaceState(null, null, l.pathname.slice(0, -1) + decoded + l.hash);
        }
      })(window.location);
    </script>`;
        
        // Insert before the root div or first script tag
        // We want this to run before React Router initializes
        const scriptTagMatch = html.match(/<script[^>]*>/);
        if (scriptTagMatch) {
          return html.replace(scriptTagMatch[0], pathRestoreScript + '\n    ' + scriptTagMatch[0]);
        }
        // Fallback: insert before closing body tag
        return html.replace('</body>', pathRestoreScript + '\n  </body>');
      },
    },
  });
  
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
