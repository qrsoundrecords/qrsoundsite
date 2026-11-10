import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  // BASE_PATH lets the same build run on a domain root (Vercel, local) or on a
  // sub-path (GitHub Pages project site: /qrsoundsite/). The CI workflow sets
  // BASE_PATH=/qrsoundsite/ — locally it defaults to "/".
  base: process.env.BASE_PATH || "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three", "@react-three/fiber", "@react-three/drei"],
          router: ["react-router-dom"],
          motion: ["framer-motion"],
        },
      },
    },
  },
});
