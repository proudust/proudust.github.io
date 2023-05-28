/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{ts,tsx}',
    './src/layouts/**/*.{ts,tsx}',
    './src/pages/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
    },
    screens: {
      sm: '640px',
      lg: '1024px',
    },
  },
  plugins: [require('daisyui')],
};
