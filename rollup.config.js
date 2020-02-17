import babel from "rollup-plugin-babel";
const moduleFormat = "umd";

export default [
  {
    input: "src/leaflet-geotiff.js",
    output: [
      {
        dir: "dist",
        format: moduleFormat
      }
    ],
    plugins: [babel({ exclude: "node_modules/**" })]
  },
  {
    input: "src/leaflet-geotiff-plotty.js",
    output: [
      {
        dir: "dist",
        format: moduleFormat
      }
    ],
    plugins: [babel({ exclude: "node_modules/**" })],
    external: ["plotty"]
  },
  {
    input: "src/leaflet-geotiff-rgb.js",
    output: [
      {
        dir: "dist",
        format: moduleFormat
      }
    ],
    plugins: [babel({ exclude: "node_modules/**" })]
  },
  {
    input: "src/leaflet-geotiff-vector-arrows.js",
    output: [
      {
        dir: "dist",
        format: moduleFormat
      }
    ],
    plugins: [babel({ exclude: "node_modules/**" })]
  }
];
