/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        accent: {
          primary: "#00FF94",
          secondary: "#00B8FF",
        },
        glass: {
          bg: "rgba(20, 20, 20, 0.65)",
          border: "rgba(255, 255, 255, 0.08)",
        }
      },
      fontFamily: {
        mono: ['Fira Code', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        lg: "16px",
        md: "12px",
      },
    },
  },
  plugins: [],
}
