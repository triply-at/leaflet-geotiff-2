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
        const rasterImageData = ctx.createImageData(raster.width, raster.height);
        for (let i = 0, j = 0; i < rasterImageData.data.length; i += 4, j += 1) {
            rasterImageData.data[i] = raster.data[0][j]; // R value
            rasterImageData.data[i + 1] = raster.data[1][j]; // G value
            rasterImageData.data[i + 2] = raster.data[2][j]; // B value
            rasterImageData.data[i + 3] = 255; // A value
        }
        const imageData = this.parent.transform(rasterImageData, args);
        ctx.putImageData(imageData, args.xStart, args.yStart);
    },
});

L.LeafletGeotiff.rgb = function(options) {
    return new L.LeafletGeotiff.RGB(options);
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = L.LeafletGeotiff;
}
