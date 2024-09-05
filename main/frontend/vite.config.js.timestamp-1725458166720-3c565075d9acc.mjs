// vite.config.js
import { defineConfig } from "file:///D:/next/sse-school-management/main/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///D:/next/sse-school-management/main/frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    {
      name: "dep-pre-bundle",
      configureDepPreBundle: (depPreBundleConfig) => {
        depPreBundleConfig.ignoreModules.push(
          "date-fns/_lib/format/longFormatters"
        );
      }
    }
  ],
  optimizeDeps: {
    exclude: ["date-fns", "worker-loader"]
  },
  build: {
    rollupOptions: {
      // plugins: [require.resolve("worker-loader")],
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxuZXh0XFxcXHNzZS1zY2hvb2wtbWFuYWdlbWVudFxcXFxtYWluXFxcXGZyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxuZXh0XFxcXHNzZS1zY2hvb2wtbWFuYWdlbWVudFxcXFxtYWluXFxcXGZyb250ZW5kXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9uZXh0L3NzZS1zY2hvb2wtbWFuYWdlbWVudC9tYWluL2Zyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCgpLFxuICAgIHtcbiAgICAgIG5hbWU6IFwiZGVwLXByZS1idW5kbGVcIixcbiAgICAgIGNvbmZpZ3VyZURlcFByZUJ1bmRsZTogKGRlcFByZUJ1bmRsZUNvbmZpZykgPT4ge1xuICAgICAgICBkZXBQcmVCdW5kbGVDb25maWcuaWdub3JlTW9kdWxlcy5wdXNoKFxuICAgICAgICAgIFwiZGF0ZS1mbnMvX2xpYi9mb3JtYXQvbG9uZ0Zvcm1hdHRlcnNcIlxuICAgICAgICApO1xuICAgICAgfSxcbiAgICB9LFxuICBdLFxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBleGNsdWRlOiBbXCJkYXRlLWZuc1wiLCBcIndvcmtlci1sb2FkZXJcIl0sXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgLy8gcGx1Z2luczogW3JlcXVpcmUucmVzb2x2ZShcIndvcmtlci1sb2FkZXJcIildLFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlQsU0FBUyxvQkFBb0I7QUFDMVYsT0FBTyxXQUFXO0FBR2xCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLE1BQU07QUFBQSxJQUNOO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTix1QkFBdUIsQ0FBQyx1QkFBdUI7QUFDN0MsMkJBQW1CLGNBQWM7QUFBQSxVQUMvQjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNaLFNBQVMsQ0FBQyxZQUFZLGVBQWU7QUFBQSxFQUN2QztBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBO0FBQUEsSUFFZjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
