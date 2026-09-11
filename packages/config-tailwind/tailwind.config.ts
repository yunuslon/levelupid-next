/** @type {import('tailwindcss').Config} */
export default {
  content: [
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary, #3b82f6)',
        secondary: 'var(--color-secondary, #1f2937)',
      },
      fontFamily: {
        sans: 'var(--font-family, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto)',
      },
    },
  },
  plugins: [],
}
