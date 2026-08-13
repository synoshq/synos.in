import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [react(), dts({ rollupTypes: false, include: ['src'] })],
  build: {
    // One CSS file out, so consumers import '@synos/brand-kit/styles.css' once.
    cssCodeSplit: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SynOSBrandKit',
      fileName: (format) => (format === 'es' ? 'brand-kit.js' : 'brand-kit.umd.cjs'),
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        assetFileNames: 'brand-kit.css',
        globals: { react: 'React', 'react-dom': 'ReactDOM', 'react/jsx-runtime': 'jsxRuntime' },
      },
    },
  },
})
