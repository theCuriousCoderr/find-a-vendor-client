/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "300px",
        "400": "400px",
        "500": "500px",
        "600": "600px",
        "700": "700px",
      },
      colors: {
        peach: "#ff7070",
        lavender: "#5C1B86"
      }
    },
  },
  plugins: [],
}