import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import fs from 'fs';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    {
      writeBundle() {
        fs.renameSync(
          path.resolve(__dirname, 'dist/index.html'),
          path.resolve(__dirname, 'dist/product.html')
        );
        fs.renameSync(
          path.resolve(__dirname, 'dist/stylish.html'),
          path.resolve(__dirname, 'dist/index.html')
        );
      }
    }],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
      "#root": resolve(__dirname),
    },
  },
});