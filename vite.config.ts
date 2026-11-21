import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { pages } from './src/config/pages.ts'

const page = (p: string) => fileURLToPath(new URL(p, import.meta.url))

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const review = mode === 'review'
  const input: Record<string, string> = { main: page('./index.html') }
  // Unfinished secondary pages are built only for review, never for production.
  if (review || pages.upsideOfDown.published) input.upside = page('./upside-of-down/index.html')

  return {
    plugins: [react()],
    // Compile-time flag: production bundles drop draft text, internal notes and review-only UI.
    define: { __REVIEW__: JSON.stringify(review) },
    build: {
      outDir: review ? 'dist-review' : 'dist',
      rollupOptions: { input },
    },
    server: {
      fs: {
        // Keep Vite's defaults and block private source material from the dev server.
        deny: ['.env', '.env.*', '*.{crt,pem}', '**/.git/**', '**/private/**', '**/incoming/**'],
      },
    },
  }
})
