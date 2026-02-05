/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          primary: '#007AFF',
          bg: '#F5F5F7',
          window: 'rgba(255, 255, 255, 0.7)',
        },
        dark: {
          primary: '#00FF41',
          bg: '#0D1117',
          window: 'rgba(13, 17, 23, 0.8)',
        },
      },
      backdropBlur: {
        glass: '20px',
      },
    },
  },
  plugins: [],
}
