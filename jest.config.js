/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // testTimeout: 30000
  setupFilesAfterEnv: ['./jest.setup.js'],
  verbose: true,
  forceExit: true
}
