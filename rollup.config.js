import autoprefixer from "autoprefixer"
import postcss from "rollup-plugin-postcss"
import typescript from "@rollup/plugin-typescript"

export default {
  external: ["react", "react-dom", "page-flip"],
  input: "src/index.ts",
  watch: {
    include: "src/**",
  },
  output: [
    {
      file: "build/index.js",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "build/index.es.js",
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    typescript(),
    postcss({
      plugins: [autoprefixer()],
      minimize: true,
    }),
  ],
}
