module.exports = {
	coverageDirectory: "coverage",
	coverageProvider: "v8",
	coverageThreshold: {
		global: {
			branches: 100,
			functions: 100,
			lines: 100,
			statements: 100
		}
	},
	moduleNameMapper: {
		"\\.(css|scss)$": "<rootDir>/src/tests/mocks/style-mock.js",
		"^antd-mobile$": "<rootDir>/src/index.ts"
	},
	preset: "ts-jest",
	testEnvironment: "jsdom"
};