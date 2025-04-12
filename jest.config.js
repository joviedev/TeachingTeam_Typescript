module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
      '^react-router-dom$': '<rootDir>/node_modules/react-router-dom',
    },
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
  };
  