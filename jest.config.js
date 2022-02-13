module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,
  silent: true,
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: ['<rootDir>/dist'],
  setupFilesAfterEnv: ['<rootDir>/jestImports.ts'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  coverageProvider: 'v8',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/node_modules/',
    '!<rootDir>/src/**/index.tsx'
  ]
};
