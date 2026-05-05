import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['axios'],
        },
      },
    },
  },
  server: {
    port: 5173,
    open: true,
    cors: true,
  },
})
