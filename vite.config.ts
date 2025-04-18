import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(),
        splitVendorChunkPlugin()
    ],
    build: { chunkSizeWarningLimit: 1600, }, //remove warning size limit for build
    define: {
        'process.env': process.env,
    },
    server: {
        host: true,
    },
    base: './',
});
