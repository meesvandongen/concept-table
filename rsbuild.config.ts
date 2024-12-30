import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    title: "Concept Table",
    favicon: "./src/assets/idea.png",
    meta: {
      description:
        "A table based on the Universal Dictionary of Concepts",
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8788",
        changeOrigin: false,
      },
    },
  },
});
