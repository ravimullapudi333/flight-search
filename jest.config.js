module.exports = {
  roots: ['<rootDir>/src'],
  setupFiles: ['<rootDir>/test-setup.js'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '^.+\\.(png|svg|jpe?g|gif)$': 'file-loader'
  },
  testMatch: ['/**/__tests__/*.(test|spec).{ts,tsx,js,jsx}'],
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx}', '!<rootDir>/src/**/index.{js,jsx}'],
  collectCoverage: true,
  // https://istanbul.js.org/docs/advanced/alternative-reporters
  coverageReporters: ['lcov', 'clover', 'text-summary', 'text', 'html'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10
    }
  },
  verbose: false
};
