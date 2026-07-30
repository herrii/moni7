/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/components/**/*.{js,vue,ts}",
    "./app/layouts/**/*.vue",
    "./app/pages/**/*.vue",
    "./app/plugins/**/*.{js,ts}",
    "./app/app.vue",
    "./app/error.vue"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#e0f7fa',
          100: '#b2ebf2',
          200: '#80deea',
          300: '#4dd0e1',
          400: '#26c6da',
          500: '#00abc8', // Moni Primary Cyan
          600: '#0097a7',
          700: '#00838f',
          800: '#006064',
          900: '#004d40',
        },
        income: '#10b981', // Emerald 500
        expense: '#f97316', // Orange 500
        danger: '#ef4444', // Red 500
        neutral: {
          dark: '#1e293b', // Slate 800
          light: '#f8fafc', // Slate 50
          border: '#e2e8f0', // Slate 200
        }
      },
      boxShadow: {
        'soft-sm': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'soft-md': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'soft-lg': '0 10px 30px rgba(0, 0, 0, 0.12)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      }
    },
  },
  plugins: [],
}
