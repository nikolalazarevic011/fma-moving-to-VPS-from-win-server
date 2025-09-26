/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./utils/**/*.js",
  ],
  theme: {
    extend: {
      height: {
        // Enables any arbitrary value
        590: "590px",
      },
      borderWidth: {
        1: "1px",
        2: "2px",
        3: "3px",
        4: "4px",
        5: "5px",
        6: "6px",
        8: "8px",
        10: "10px",
        12: "12px",
      },
      colors: {
        primary: "#002063",
        primaryLight: "#248acc",
        primaryDark: "#002b4e",
        secondary: "#fbe6ba", //gold color
        secondaryDark: "#da9b18",
        headingRed: "#F12006",
        background: "#ffffff",
        menuHighlightBlue: "#1fffff",
        headingOrange: "#ff6a00",
      },
      fontFamily: {
        heading: ["Aboreto", "cursive"],
        body: ["Poppins", "sans-serif"],
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
      },
      spacing: {
        "0.5rem": "0.5rem",
        "1rem": "1rem",
        "1.5rem": "1.5rem",
        "2rem": "2rem",
        "2.5rem": "2.5rem",
        "3rem": "3rem",
        "3.5rem": "3.5rem",
        "4rem": "4rem",
        "4.5rem": "4.5rem",
        "5rem": "5rem",
        "-0.5rem": "-0.5rem",
        "-1rem": "-1rem",
        "-1.5rem": "-1.5rem",
        "-2rem": "-2rem",
        "-2.5rem": "-2.5rem",
        "-3rem": "-3rem",
        "-3.5rem": "-3.5rem",
        "-4rem": "-4rem",
        "-4.5rem": "-4.5rem",
        "-5rem": "-5rem",
      },
    },
  },
  plugins: [],
};
