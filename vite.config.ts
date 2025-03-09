
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react-swc");
const path = require("path");
// Import the componentTagger using require syntax instead of ES modules
let componentTagger;
try {
  componentTagger = require("lovable-tagger").componentTagger;
} catch (e) {
  // If importing fails, provide a fallback
  componentTagger = () => null;
}

// https://vitejs.dev/config/
module.exports = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
