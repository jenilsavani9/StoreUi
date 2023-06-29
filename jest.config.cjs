module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx'],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage',
  coverageReporters: ['text', 'lcov'],
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!axios)'],
  // Add any other Jest configuration options you need

  // Babel configuration
  transformIgnorePatterns: [
    'node_modules/(?!(axios)/)',
  ],
  transform: {
    '^.+\\.jsx?$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.js?$': '<rootDir>/node_modules/babel-jest',
  },
  // Add any other Babel configuration options you need
};
