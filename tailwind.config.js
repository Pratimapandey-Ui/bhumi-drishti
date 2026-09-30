/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          navy: '#0A192F',
          blue: '#1E3A8A',
          gold: '#B45309',
          surface: '#F8FAFC',
          card: '#FFFFFF',
          border: '#E2E8F0',
        },
        risk: {
          low: '#10B981',
          medium: '#F59E0B',
          high: '#F97316',
          critical: '#EF4444',
        }
      },
    },
  },
  plugins: [],
}
