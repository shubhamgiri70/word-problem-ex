import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Get __filename and __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("Vite config running from:", __dirname);

// Vite configuration for React
export default defineConfig({
  plugins: [react()],
});
