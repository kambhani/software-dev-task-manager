"use strict";

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  // or 'media' or 'class'
  theme: {
    flex: {
      '100': '1 0 0'
    },
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
};