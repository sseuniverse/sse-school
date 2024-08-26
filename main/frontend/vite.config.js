import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "dep-pre-bundle",
      configureDepPreBundle: (depPreBundleConfig) => {
        depPreBundleConfig.ignoreModules.push(
          "date-fns/_lib/format/longFormatters"
        );
      },
    },
  ],
  optimizeDeps: {
    exclude: ["date-fns", "worker-loader"],
  },
  build: {
    rollupOptions: {
      // plugins: [require.resolve("worker-loader")],
    },
  },
});
