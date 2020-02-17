import babel from "rollup-plugin-babel";
import multiInput from "rollup-plugin-multi-input";

const config = {
  input: ["src/*.js"],
  output: [
    {
      dir: "dist",
      format: "esm"
    }
  ],
  plugins: [babel(), multiInput()],
  external: ["plotty"]
};

export default config;
