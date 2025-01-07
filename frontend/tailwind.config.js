/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        trackMateTheme: {
          primary: "#1E3A8A", // Dark Blue
          secondary: "#F97316", // Orange
          accent: "#3B82F6", // Light Blue Accent
          neutral: "#1A202C", // Dark Neutral
          "base-100": "#1F2937", // Lighter background for better text contrast
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
};
