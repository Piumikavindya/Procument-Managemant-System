// Combine the two Tailwind CSS configuration objects

const labelsClasses = [
  "indigo",
  "gray",
  "green",
  "blue",
  "red",
  "purple",
];

module.exports = {
  // Merging content arrays
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
    "./public/index.html", // Added from the second config
  ],
  theme: {
    // Merging theme objects
    extend: {
      colors: {
        'NeutralSilver': '#F5F7FA',
        'NeutralDGrey': '#4D4D4D',
        'brandPrimary': '#2194F3',
        'NeutralGrey': '#717171',
        'Gray900': '#717171', // Changed from 'gray900'
        'NeutralBlack': '#263238',
        'FooterFont': '#F5F7FA'
      },
      fontFamily: {
        sans: ["Open Sans"] // Added from the second config
      },
      gridTemplateColumns: {
        "1/5": "1fr 5fr" // Added from the first config
      }
    },
  },
  plugins: [
    // Merging plugins arrays
    require('flowbite/plugin'),
    require('@tailwindcss/forms'),
     // Added from the second config
  ],
  // Merging safelist arrays
  purge: {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      'node_modules/flowbite-react/lib/esm/**/*.js',
      "./public/index.html", // Added from the second config
    ],
    safelist: [
      ...labelsClasses.map((lbl) => `bg-${lbl}-500`),
      ...labelsClasses.map((lbl) => `bg-${lbl}-200`),
      ...labelsClasses.map((lbl) => `text-${lbl}-400`)
    ],
  },
  // Merging darkMode keys
  darkMode: false, // or 'media' or 'class', taken from the second config
  // Merging variants keys
  variants: {
    extend: {},
  },
};
