import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          animations: ['framer-motion'],
        },
        // Ensure assets are properly hashed for caching
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      }
    },
    plugins: [react()],
    base: "/",
    chunkSizeWarningLimit: 600,
    // Enable asset optimization
    assetsInlineLimit: 4096, // 4kb - files smaller than this will be inlined as base64
    cssCodeSplit: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Generate preload directives for critical assets
    reportCompressedSize: true,
  },
  // Add preload directives for critical assets
  experimental: {
    renderBuiltUrl(filename, { hostType }) {
      if (hostType === 'js' && filename.includes('GraphicImages')) {
        return { type: 'asset', value: filename }
      }
      return { type: 'asset', value: filename }
    }
  }
})