import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }: { mode: string }) => {
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
