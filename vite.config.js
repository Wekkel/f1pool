import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Max F1 Competitie — Jaargang XXIV',
        short_name: 'F1 Pool',
        description: 'F1 pool competitie stand & statistieken',
        theme_color: '#6366F1',
        background_color: '#15151E',
        display: 'standalone',
        start_url: '/f1-pool/',
        scope: '/f1-pool/',
        icons: [
          {
            src: 'icon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
  base: '/f1-pool/',
})
