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
        "cv-green": "#2DD37F",
        "signal-cyan": "#38BDF8",
        "biomed-red": "#F87171",
        "research-amber": "#F5B84B",
        accent: {
          primary: "#2DD37F",
          secondary: "#38BDF8",
        },
        glass: {
          bg: "rgba(16, 18, 20, 0.72)",
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
