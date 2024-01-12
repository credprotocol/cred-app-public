const theme = require("tailwindcss/defaultTheme");

/**  @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Sohne", ...theme.fontFamily.sans],
      },

      backgroundImage: {
        // BLUE GRADIENTS
        "dark-blue": "linear-gradient(180deg, #0D1042 46.82%, #00033D 98.53%)",

        // GREEN GRADIENTS
        "gradient-green":
          "linear-gradient(180deg, rgba(96, 255, 93, 0.2) 0%, rgba(96, 255, 93, 0) 100%)",
      },

      colors: {
        cred: {
          purple: "#5c55f1",
          "light-purple": "#627EEA",
          "dark-purple": "rgba(87, 123, 232, 0.4)",
          "purple-bar": "#4D4F80",
          border: "#1B1E51",
          // gray
          "dark-gray": "#414362",
          "light-gray": "#C7C6D8",
          gray: "#A7A7B1",
          "gray.700": "#404355",

          // BLUE
          "dark-blue": "#080A2B",
          blue: "#0D1042",
          "light-blue": "#5D78FF",
          "light-gray-blue": "#4589DE",
          "light-blue-opacity-0.2": "rgba(93, 120, 255, 0.2)",
          "soft-blue": "#335EEB",
          "blue-chart": "#60CAFF",

          // GREEN
          green: "#00C04B",
          "green-chart": "#60FF90",
          "green-red": "linear-gradient(90deg, #45aa77 50%, #aa1527 50%)",

          // RED
          "low-credit": "#FF535E",
          "low-credit-opacity-0.1": "rgba(255, 83, 94, 0.1)",

          // PURPLE FOR CREDIT FACTORS
          "fair-credit": "#BD5DFC",
          "fair-credit-opacity-0.1": "rgba(189, 93, 252, 0.1)",

          // LIGHT BLUE FOR CREDIT FACTORS
          "good-credit": "#5D91FC",
          "good-credit-opacity-0.1": "rgba(93, 145, 252, 0.1)",

          // TURQUOISE FOR CREDIT FACTORS
          "very-good-credit": "#5EE5F6",
          "very-good-credit-opacity-0.1": "rgba(94, 229, 246, 0.1)",

          // GREEN FOR CREDIT FACTORS
          "excellent-credit": "#38E75F",
          "excellent-credit-opacity-0.1": "rgba(56, 231, 95, 0.1)",

          // PINK
          pink: "#FF00AA",
          "pink-opacity-0.1": "rgba(255, 0, 122, 0.1)",

          // YELLOW
          yellow: "#F3D25E",
          "yellow-opacity-0.1": "rgba(243, 210, 94, 0.1)",
        },
      },
    },
  },
  plugins: [],
};
