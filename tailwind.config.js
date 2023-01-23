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
        'footer': '#584235',
        'gradient1': 'rgba(255, 136, 62, 1)',
        'gradient2': 'rgba(255, 98, 0, 0.35)',
      }
    },
    fontFamily: {
      'title': ['Anton'],
      'paragraph': ['Inter'],
      'logo': ['Poppins'],
    },
    screens: {
      'xs': '500px',
      // => @media (min-width: 500px) { ... }

      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'xm': '850px',
      // => @media (min-width: 850px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px'
    },
  },
  plugins: [],
}
