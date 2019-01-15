// Depends on:
// https://github.com/santilland/plotty

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    var L = require('leaflet-geotiff');
}

L.LeafletGeotiff.RGB = L.LeafletGeotiffRenderer.extend({
    initialize: function() {
        this.name = 'Canvas Renderer';
    },

    render: function(raster, canvas, ctx, args) {
        var rasterImageData = ctx.createImageData(raster.width, raster.height);
        var isGrayscale = raster.data.length === 1;
        for (let i = 0, j = 0; i < rasterImageData.data.length; i += 4, j += 1) {
            rasterImageData.data[i] = raster.data[0][j]; // R value
            rasterImageData.data[i + 1] = raster.data[isGrayscale ? 0 : 1][j]; // G value
            rasterImageData.data[i + 2] = raster.data[isGrayscale ? 0 : 2][j]; // B value
            rasterImageData.data[i + 3] = 255; // A value
        }
        var imageData = this.parent.transform(rasterImageData, args);
        ctx.putImageData(imageData, args.xStart, args.yStart);
    },
});

L.LeafletGeotiff.rgb = function(options) {
    return new L.LeafletGeotiff.RGB(options);
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = L.LeafletGeotiff;
}
