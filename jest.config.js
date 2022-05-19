const pkg = require('./package');

module.exports = {
  displayName: pkg.name,
  transform: {
    '^.+\\.(js|ts|tsx)?$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'css', 'ts', 'tsx', 'json'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  setupFiles: ['<rootDir>/jest.setupFiles.js'],
  testEnvironment: 'jsdom',
}
