module.exports = {
	moduleNameMapper: {
		"\\.(css|scss)$": "<rootDir>/src/tests/mocks/style-mock.js",
		"^antd-mobile$": "<rootDir>/src/index.ts"
	},
	preset: "ts-jest",
	testEnvironment: "jsdom"
};