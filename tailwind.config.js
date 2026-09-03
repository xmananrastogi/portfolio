/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background:      "#000000",
        surface:         "#0a0a0a",
        "surface-raised":"#111111",
        "text-primary":  "#f5f5f5",
        "text-secondary":"#a0a0a0",
        muted:           "#555555",
        accent:          "#3b82f6",   // electric blue
        "accent-hover":  "#2563eb",
        border:          "rgba(255,255,255,0.07)",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'aurora':     'aurora-shift 8s ease infinite',
        'breathe':    'breathe 5s ease-in-out infinite',
        'pulse-dot':  'pulse-dot 2s ease-in-out infinite',
        'fade-up':    'fade-up 0.6s ease both',
      },
    },
  },
  plugins: [],
}