# leaflet-geotiff-2 [![NPM version][npm-image]][npm-url] [![NPM Downloads][npm-downloads-image]][npm-url]

A [LeafletJS](http://www.leafletjs.com) plugin for displaying geoTIFF raster data. Data can drawn as colored rasters or directon arrows. The layer can be clipped using a polygon.

![Screenshot](/screenshots/example.png?raw=true)

## Instructions

### 1. Load modules

```javascript
import L from "leaflet";
import "geotiff";
import "leaflet-geotiff-2";

// optional renderers
import "leaflet-geotiff-2/dist/leaflet-geotiff-rgb";
import "leaflet-geotiff-2/dist/leaflet-geotiff-vector-arrows";
import "leaflet-geotiff-2/dist/leaflet-geotiff-plotty"; // requires plotty
```

### 2. Add a geoTIFF layer

Parameters:

```javascript
// GeoTIFF file URL. Currently only EPSG:4326 files are supported
const url =
  "https://stuartmatthews.github.io/leaflet-geotiff/tif/wind_speed.tif";
const options = {
  // See renderer sections below.
  // One of: L.LeafletGeotiff.rgb, L.LeafletGeotiff.plotty, L.LeafletGeotiff.vectorArrows
  renderer: null,
  // Optional array specifying the corners of the data, e.g. [[40.712216, -74.22655], [40.773941, -74.12544]].
  // If omitted the image bounds will be read from the geoTIFF file (ModelTiepoint).
  bounds: [],
  // Optional geoTIFF band to read
  band: 0,
  // Optional geoTIFF image to read
  image: 0,
  // Optional clipping polygon, provided as an array of [lat,lon] coordinates.
  // Note that this is the Leaflet [lat,lon] convention, not geoJSON [lon,lat].
  clip: undefined,
  // Optional leaflet pane to add the layer.
  pane: "overlayPane"
};

// create layer
var layer = L.leafletGeotiff(url, options).addTo(map);
```

---

## Renderer - Plotty

Useful for single-band raster data.

```javascript
const options = {
  // Optional. Minimum values to plot.
  displayMin: 0,
  // Optional. Maximum values to plot.
  displayMax: 1,
  // Optional. If true values outside `displayMin` to `displayMax` will be rendered as if they were valid values.
  clampLow: true,
  clampHigh: true,
  // Optional. Plotty color scale used to render the image.
  colorScale: "viridis"
};

const renderer = L.LeafletGeotiff.plotty(options);
```

Methods

| method            | params                                       | description             |
| ----------------- | -------------------------------------------- | ----------------------- |
| `setColorScale`   | (`colorScale: {String}`)                     | set layer color scale   |
| `setDisplayRange` | (`min: {Number}, max: {Number}`)             | set layer display range |
| `setClamps`       | (`clampLow: {Boolean}, clampLow: {Boolean}`) | set layer clamp options |

New color scales can be created using [plotty's](https://github.com/santilland/plotty) `addColorScale` method.

---

## Renderer - RGB

Useful for multi-band raster data (e.g. true color).

RGB renderer options must currently be added by extending `L.leafletGeotiff` options.

```javascript
const renderer = L.LeafletGeotiff.rgb();

const options = {
  // Optional, band index to use as R-band
  rBand: 0,
  // Optional, band index to use as G-band
  gBand: 1,
  // Optional, band index to use as B-band
  bBand: 2,
  // band index to use as alpha-band
  // NOTE: this can also be used in combination with transpValue, then referring to a
  // color band specifying a fixed value to be interpreted as transparent
  alphaBand: 0,
  // for all values equal to transpValue in the band alphaBand, the newly created alpha
  // channel will be set to 0 (transparent), all other pixel values will result in alpha 255 (opaque)
  transpValue: 0,
  renderer: renderer
};

// create layer
var layer = L.leafletGeotiff(url, options).addTo(map);
```

---

## Renderer - Vector Arrows

For plotting velocity (i.e. quiver plot)

```javascript
const options = {
  // Optional, size in pixels of direction arrows for vector data.
  arrowSize: 20
};

const renderer = L.LeafletGeotiff.vectorArrows(options);
```

---

## Advanced usage options

1. Data values can be extracted using the `getValueAtLatLng(lat,lng)` method\*
2. Custom renderer can be implemented by extending `L.LeafletGeotiffRenderer`.

\*note this seems buggy, experimental only (returns values when given postion outside of data domain).

## Build

```shell
npm install
npm run build
```

## What about the original leaflet-geotiff?

This repo is an attempt to pull together a bunch of community-driven improvements that
have been made in various forks of `leaflet-geotiff` over the years but have failed to
make it back into the `leaflet-geotiff` npm package.

## Dependencies

- [Leaflet >= 0.7.7](http://leafletjs.com)
- [geotiff.js](https://github.com/constantinius/geotiff.js)
- [plotty](https://github.com/santilland/plotty) (optional)

[npm-image]: https://badge.fury.io/js/leaflet-geotiff-2.svg
[npm-url]: https://www.npmjs.com/package/leaflet-geotiff-2
[npm-downloads-image]: https://img.shields.io/npm/dt/leaflet-geotiff-2.svg

## License

MIT License (MIT)
