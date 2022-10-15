/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
    },
    extend: {
      height: {
        'screen-2/4': '50vh',
      },
      colors: {
        'night-blue': '#212135',
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio')],
};
