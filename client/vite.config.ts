import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default (
  // @ts-ignore
  { mode },
) => {
  // Load environment variables from .env file
  process.env = loadEnv(mode, process.cwd());

  return defineConfig({
    plugins: [react()],
    server: {
      cors: { origin: process.env.VITE_BASE_URL ?? "http://localhost:8081" },
    },
    build: {
      manifest: true,
    },
  });
};
