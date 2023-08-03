import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    hmr: {
      clientPort: 5173,
    },
    port: 5173,
    watch: {
      usePolling: true,
    },
  },
});
