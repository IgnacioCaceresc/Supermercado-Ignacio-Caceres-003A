/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        caserita: {
          red: '#E11D48',
          amber: '#F59E0B',
          emerald: '#10B981',
          dark: '#0F172A'
        }
      }
    },
  },
  plugins: [],
}

