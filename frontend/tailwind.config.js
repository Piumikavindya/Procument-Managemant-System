/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'NeutralSilver': '#F5F7FA',
        'NeutralDGrey': '#4D4D4D',
        'brandPrimary': '#2194F3',
        'NeutralGrey': '#717171',
        'Gray900': '#717171', // Changed from 'gray900'
        'NeutralBlack': '#263238',
        'FooterFont': '#F5F7FA'
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/forms'),
  ],
  
};
