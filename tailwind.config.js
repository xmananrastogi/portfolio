/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#08090A",
        surface: "#101214",
        "surface-raised": "#15181C",
        "text-primary": "#F4F5F5",
        "text-secondary": "#A7ADB2",
        muted: "#6E7681",
        accent: "#F97316",
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}