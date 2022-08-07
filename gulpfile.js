/* eslint-disable @typescript-eslint/no-var-requires */
const gulp = require("gulp");
const del = require("del");
const sass = require("gulp-sass")(require("sass"));
const path = require("path");
const postcss = require("gulp-postcss");
const postcssBase64 = require("postcss-base64");
const postcssImport = require("postcss-import");
const postcssPresetEnv = require("postcss-preset-env");
const ts = require("gulp-typescript");
const tsconfig = require("./tsconfig.json");
const babel = require("gulp-babel");
const rollup = require("rollup");
const rollupConfig = require("./rollup.config.js");
const through = require("through2");

console.log(rollupConfig);
function clean() {
	return del("./lib/**");
}

function buildStyle() {
	return gulp
		.src("./src/**/*.scss", {
			base: "./src/",
			ignore: ["**/tests/**/*"]
		})
		.pipe(
			sass({
				paths: [path.join(__dirname, "src")],
				relativeUrls: true
			})
		)
		.pipe(postcss([
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
		]))
		.pipe(gulp.dest("lib/es"))
		.pipe(gulp.dest("lib/cjs"));
}

function buildEs() {
	const tsProject = ts({
		...tsconfig.compilerOptions
	});
	return gulp
		.src(["src/**/*.{tsx,ts}"], {
			ignore: ["**/tests/**/*"]
		})
		.pipe(tsProject)
		.pipe(
			babel({
				plugins: ["./babel-transform-sass-to-css"]
			})
		)
		.pipe(gulp.dest("lib/es/"));
}
function buildCjs() {
	return gulp
		.src("./lib/es/**/*.js")
		.pipe(babel({
			plugins: ["@babel/plugin-transform-modules-commonjs"]
		}))
		.pipe(gulp.dest("./lib/cjs"));
}

function buildDeclaration() {
	const tsProject = ts({
		...tsconfig.compilerOptions,
		declaration: true,
		emitDeclarationOnly: true
	});
	return gulp
		.src("src/**/*.{tsx,ts}", {
			ignore: ["**/tests/**/*"]
		})
		.pipe(tsProject)
		.pipe(gulp.dest("lib/es/"))
		.pipe(gulp.dest("lib/cjs/"));
}

async function umdRollup() {
	const umdConfig = rollupConfig[1];
	const umd = await rollup.rollup(umdConfig);
	await umd.write(umdConfig.output);
}
async function buildCjsBundles() {
	const bundleConfig = rollupConfig[0];
	const bundle = await rollup.rollup(bundleConfig);
	await bundle.write(bundleConfig.output);
}
async function buildEsmBundles() {
	const bundleConfig = rollupConfig[2];
	const bundle = await rollup.rollup(bundleConfig);
	await bundle.write(bundleConfig.output);
}
function copyMetaFiles() {
	return gulp.src(["./README.md"]).pipe(gulp.dest("./lib/"));
}

function generatePackageJSON() {
	return gulp
		.src("./package.json")
		.pipe(
			through.obj((file, enc, cb) => {
				const rawJSON = file.contents.toString();
				const parsed = JSON.parse(rawJSON);
				delete parsed.scripts;
				delete parsed.devDependencies;
				const stringified = JSON.stringify(parsed, null, 2);
				file.contents = Buffer.from(stringified);
				cb(null, file);
			})
		)
		.pipe(gulp.dest("./lib/"));
}

exports.default = gulp.series(
	clean,
	buildEs,
	buildCjs,
	gulp.parallel(buildDeclaration, buildStyle),
	copyMetaFiles,
	generatePackageJSON,
	gulp.parallel(umdRollup, buildCjsBundles, buildEsmBundles)
);