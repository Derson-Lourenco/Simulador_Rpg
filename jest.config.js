// jest.config.js
module.exports = {
  testEnvironment: 'jsdom', // ou outro ambiente adequado
  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  moduleFileExtensions: ['js', 'json'],
};
