import { cleandir } from "rollup-plugin-cleandir";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import typescript from "rollup-plugin-typescript2";
import dts from "rollup-plugin-dts";
import postcssBase64 from "postcss-base64";
import postcssImport from "postcss-import";
import postcssPresetEnv from "postcss-preset-env";
import replace from "@rollup/plugin-replace";
import img from "@rollup/plugin-image";
import { terser } from "rollup-plugin-terser";
import analyze from "rollup-plugin-analyzer";

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
	nodeResolve(),
	typescript(),
	analyze()
];

export default [{
	external,
	input: "src/index.ts",
	output: {
		file: "dist/index.esm.js",
		format: "es",
		globals
	},
	plugins: [...plugins, cleandir("./dist")]
}, {
	external,
	input: "src/index.ts",
	output: {
		file: "dist/index.cjs.js",
		format: "cjs",
		globals
	},
	plugins
}, {
	input: "src/index.umd.ts",
	output: {
		file: "dist/index.umd.js",
		format: "umd",
		name: "liangUI"
	},
	plugins
}, {
	input: "src/index.ts",
	output: {
		file: "dist/index.d.ts",
		format: "esm"
	},
	plugins: [plugins[0], dts()]
}];