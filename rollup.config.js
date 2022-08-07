/* eslint-disable @typescript-eslint/no-var-requires */
const { cleandir } = require("rollup-plugin-cleandir");
const commonjs = require("@rollup/plugin-commonjs");
const nodeResolve = require("@rollup/plugin-node-resolve");
const postcss = require("rollup-plugin-postcss");
const typescript = require("rollup-plugin-typescript2");
const dts = require("rollup-plugin-dts");
const postcssBase64 = require("postcss-base64");
const postcssImport = require("postcss-import");
const postcssPresetEnv = require("postcss-preset-env");
const replace = require("@rollup/plugin-replace");
const img = require("@rollup/plugin-image");
const { terser } = require("rollup-plugin-terser");

const external = ["react", "react-dom"];

const globals = {
	react: "React",
	"react-dom": "ReactDom"
};

const plugins = [
	postcss({
		extensions: [".css", ".scss"],
		extract: "index.css",
		minimize: true,
		plugins: [
			postcssBase64({
				extensions: [".jpg", ".png", ".svg"],
				root: "src/components/*"
			}),
			postcssImport(),
			postcssPresetEnv({
				browsers: [
					"last 20 Chrome versions",
					"last 20 Firefox versions",
					"last 20 Opera versions",
					"Explorer >= 10",
					"Safari >= 8",
					"Android >= 5",
					"iOS >= 8"
				]
			})
		]
	}),
	commonjs(),
	img(),
	replace({
		preventAssignment: true,
		values: { "process.env.NODE_ENV": JSON.stringify("production") }
	}),
	terser({
		compress: { drop_console: false },
		format: { comments: false }
	}),
	nodeResolve.default(),
	typescript()
];
module.exports = [{
	external,
	input: "src/index.ts",
	output: {
		file: "lib/bundle/index.es.js",
		format: "es",
		globals
	},
	plugins: [...plugins, cleandir("./dist")]
}, {
	external,
	input: "src/index.ts",
	output: {
		file: "lib/bundle/index.cjs.js",
		format: "cjs",
		globals
	},
	plugins
}, {
	input: "src/index.umd.ts",
	output: {
		file: "lib/umd/index.umd.js",
		format: "umd",
		name: "liangUI"
	},
	plugins
}, {
	input: "src/index.ts",
	output: {
		file: "lib/bundle/index.d.ts",
		format: "esm"
	},
	plugins: [plugins[0], dts.default()]
}];