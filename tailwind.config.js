/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // Looks inside all .js/.jsx/.ts/.tsx files in /src
    "./public/index.html",         // Optional: Include your main HTML file
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
