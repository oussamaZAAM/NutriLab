/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-orange": "#FF9351",
        footer: "#584235",
        gradient1: "rgba(255, 136, 62, 1)",
        gradient2: "rgba(255, 98, 0, 0.35)",
        profile1: "#191919",
        profile2: "#4B4B4B",
        profilehover: "#635953"
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        rotate_normal: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        rotate_reverse: {
          "0%": { transform: "rotate(360deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        rotate2: {
          "0%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(60deg)" },
          "50%": { transform: "rotate(120deg)" },
          "75%": { transform: "rotate(180deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        rotate2_reverse: {
          "0%": { transform: "rotate(360deg)" },
          "25%": { transform: "rotate(180deg)" },
          "50%": { transform: "rotate(120deg)" },
          "75%": { transform: "rotate(60deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        rotate3: {
          "0%": { transform: "rotate(0deg)" },
          "20%": { transform: "rotate(270deg)" },
          "50%": { transform: "rotate(90deg)" },
          "70%": { transform: "rotate(270deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        translate_right: {
          "0%": { transform: "translateX(0px) rotate(33deg)" },
          "95%": { transform: "translateX(50px) rotate(33deg)" },
          "100%": { transform: "translateX(0px) rotate(33deg)" },
        },
        translate_bottom: {
          "0%": { transform: "translateY(0px)" },
          "95%": { transform: "translateY(100px)" },
          "100%": { transform: "translateY(0px)" },
        },
        lswipe: {
          "0%": { transform: "translateX(-73px)" },
          "10%": { transform: "scaleX(2.2) translateX(-27px)" },

          "100%": { transform: "translateX(0px)" },
        },
        rswiper: {
          "0%": { transform: "translateX(100px) scaleX(2.2)" },
          "100%": { transform: "translateX(0px)" },
        },
      },
      animation: {
        wiggle: "wiggle 200ms ease-in-out",
        rotate_normal: "rotate_normal 10000ms linear infinite",
        rotate_reverse: "rotate_reverse 10000ms linear infinite",
        rotate2: "rotate2 10000ms linear infinite",
        rotate2_reverse: "rotate2_reverse 10000ms linear infinite",
        rotate3: "rotate3 10000ms cubic-bezier(.32,.79,.41,.82) infinite",
        translate_right: "translate_right 5000ms linear infinite",
        translate_bottom: "translate_bottom 3000ms linear infinite",
        lswipe: "lswipe 400ms ease-out",
        rswiper: "rswiper 400ms ease-out",
      },
    },
    fontFamily: {
      title: ["Anton"],
      paragraph: ["Inter"],
      logo: ["Poppins"],
    },
    screens: {
      xs: "500px",
      // => @media (min-width: 500px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      xm: "850px",
      // => @media (min-width: 850px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
    },
  },
  plugins: [],
  darkMode: "className",
};
