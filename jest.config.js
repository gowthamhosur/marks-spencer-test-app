module.exports = {
    testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/"],
    setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
    testEnvironment: "jsdom",
    transform: {
      "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
    },
    moduleNameMapper: {
        "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules"
      }
  };