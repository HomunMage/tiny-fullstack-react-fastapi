/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import Pages from 'vite-plugin-pages';

type BackendUrlMode = 'development' | 'production';

const backendUrls: Record<BackendUrlMode, string> = {
    development: 'http://localhost:5000',     // Docker Compose
    production: 'http://backend.local'        // K8s preview
};

export default defineConfig(({ mode }) => {
    const safeMode = mode as BackendUrlMode;
    const backendUrl = backendUrls[safeMode] || backendUrls.production;

    return {
        plugins: [
            react(),
            Pages({
              dirs: ['src/pages'],
            }),
        ],
        server: {
            host: '0.0.0.0',
            port: 3000,
            allowedHosts: [
                'localhost',
                '127.0.0.1',
                'yourdomain.com',
            ],
        },
        test: {
            globals: true,
            environment: "jsdom",
            setupFiles: "./setupTests.ts",
        },
        define: {
            'import.meta.env.VITE_BACKEND_URL': JSON.stringify(backendUrl)
        }
    }
})