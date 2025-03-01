/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "light", // Add light theme to your list
      "dark",  // Add dark theme to your list
      "forest", // Ensure the "forest" theme is listed here
      "cupcake", // If you're planning to use the "cupcake" theme
      "synthwave",
      "luxury",
      "cyberpunk",
      "retro",
      "aqua",
      "dracula",
      // ... add more themes as you like
    ],
  },
}
