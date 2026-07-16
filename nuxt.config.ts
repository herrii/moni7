import { defineNuxtConfig } from 'nuxt/config'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2026-07-16',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@vite-pwa/nuxt'
  ],

  css: [
    '~/assets/css/main.css'
  ],

  // PWA configuration
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Moni7 Personal Finance',
      short_name: 'Moni7',
      description: 'Offline-first mobile personal finance tracker',
      theme_color: '#3b82f6',
      background_color: '#f8fafc',
      display: 'standalone',
      orientation: 'portrait',
      icons: [
        {
          src: '/icon-192.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/icon-512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    workbox: {
      navigateFallback: '/'
    },
    devOptions: {
      enabled: true,
      type: 'module'
    }
  },

  // Alias imports configuration from ARCHITECTURE.md
  alias: {
    '@/components': './app/components',
    '@/services': './app/services',
    '@/models': './app/models',
    '@/database': './app/database',
    '@/helpers': './app/helpers',
    '@/constants': './app/constants',
    '@/config': './app/config',
    '@/composables': './app/composables',
    '@/types': './app/types'
  }
})
