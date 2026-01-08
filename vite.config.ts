import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    VitePWA({
      injectRegister: null,
      registerType: "autoUpdate",
      includeAssets: ["robots.txt"],
      manifest: {
        name: "lomus-jb",
        short_name: "lomus-jb",
        description: "lomus-jb",
        start_url: "/",
        scope: "/",
        display: "standalone",
        theme_color: "#050a14",
        background_color: "#050a14",
        icons: [
          {
            src: "/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/icons/icon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webmanifest,txt}"],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith("/ports/"),
            handler: "CacheFirst",
            options: {
              cacheName: "ports-images",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
          {
            urlPattern: ({ url }) => url.pathname.startsWith("/books/"),
            handler: "CacheFirst",
            options: {
              cacheName: "books-pdfs-v2",
              cacheableResponse: {
                statuses: [200],
                headers: {
                  "Content-Type": "application/pdf",
                },
              },
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
        ],
      },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
