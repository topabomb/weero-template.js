import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { cleandir } from "rollup-plugin-cleandir";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
export default [
  {
    input: ["src/index.ts"],
    output: [
      {
        format: "cjs",
        file: "./dist/index.js",
        banner: "#!/usr/bin/env node",
        inlineDynamicImports: true,
      },
    ],
    plugins: [
      cleandir("./dist"),

      nodeResolve({
        extensions: [".ts", ".mjs", ".js", ".json", ".node"],
        exportConditions: ["node"],
        preferBuiltins: false,
      }),
      typescript({ compilerOptions: { module: "ESNext" } }), //override tsonfig.json->compilerOptions.module=CommonJS
      commonjs({ requireReturnsDefault: "auto" }),
      json(),
    ],
  },
];
