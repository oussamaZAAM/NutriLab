/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-orange':'#FF9351',
        'gradient1': 'rgba(255, 136, 62, 1)',
        'gradient2': 'rgba(255, 98, 0, 0.35)',
      }
    },
    fontFamily: {
      'title': ['Anton']
    }
  },
  plugins: [],
}
