/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'luvion-gray': '#E0E5EC',
        'luvion-green': '#A3FF12',
        'luvion-cyan': '#22D3EE',
      },
      boxShadow: {
        'soft-out': '6px 6px 12px #bec3c9, -6px -6px 12px #ffffff',
        'soft-in': 'inset 4px 4px 8px #bec3c9, inset -4px -4px 8px #ffffff',
        'led-glow': '0 0 5px #A3FF12, 0 0 10px #A3FF12',
      }
    },
  },
  plugins: [],
};
