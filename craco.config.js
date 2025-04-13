const path = require('path');
 
module.exports = {

  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    }
  },
 
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