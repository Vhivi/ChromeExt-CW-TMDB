
export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.[jt]sx?$': ['babel-jest', { configFile: './babel.config.mjs' }],
  },
  transformIgnorePatterns: ['/node_modules/'],
};
