import { defineConfig } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import json from "@rollup/plugin-json";
import alias from "@rollup/plugin-alias";
import path from "node:path";
import css from "rollup-plugin-css-only";
// @ts-ignore
import clear from "rollup-plugin-clear";

const config = defineConfig({
	input: ["./src/debugCSS.ts", "./src/debug-CSS.ts", "./src/background.ts", "./src/debugCSS.css"],

	output: [
		{
			format: "commonjs",
			indent: false,
			// sourcemap: "inline",
			dir: "./build",
			plugins: [terser()],
		},
	],
	cache: true,
	plugins: [
		// alias({
		// 	entries: [
		// 		{ find: "~", replacement: path.resolve("./discord-bot/src") },
		// 		{ find: "~fivemDb", replacement: path.resolve("./discord-bot/src/db/fivem") },
		// 		{ find: "~schema", replacement: path.resolve("./discord-bot/src/db") },
		// 	],
		// }),
		css({
			output: (styles) => {
				return "debugCSS.min.css";
			},
			// minimize: true,
			include: ["**/*.css"],
		}),
		typescript({
			tsconfig: "./tsconfig.json",
			exclude: ["**/*.css"],
		}),
		json(),
		commonjs({
			extensions: [".js", ".ts"],
		}),
		nodeResolve({
			moduleDirectories: ["node_modules"],
			extensions: [".js", ".ts", ".json"],
			preferBuiltins: true,
		}),
		clear({
			targets: ["build"],
			watch: true,
		}),
	],
});

export default config;
