const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  jest: {
    configure: {
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^react-router-dom$': '<rootDir>/node_modules/react-router-dom', // ✅ add this line
      },
      moduleDirectories: ['node_modules', 'src'],
    },
  },
};
