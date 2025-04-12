const path = require('path');
 
module.exports = {
 
  // Optional: Jest customization
  jest: {

    configure: {

      moduleDirectories: ['node_modules', 'src'],

      testEnvironment: 'jsdom',

    },

  },
 
 
  // Optional: PostCSS for TailwindCSS
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
};