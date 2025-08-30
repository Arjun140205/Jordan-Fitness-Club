import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  build: {
    rollupOptions: {
      external: ['react-icons'],
      output: {
        globals: {
          'react-icons': 'ReactIcons',
          'react-icons/ri': 'ReactIconsRI'
        }
      }
    },
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  optimizeDeps: {
    include: ['react-icons']
  }
})
