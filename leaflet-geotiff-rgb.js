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
        var maxVal = 255;
        for(let i=0; i<3; i++){
            tMax = Math.max(raster.data[i]);
            if(tMax>maxVal){
                maxVal=tMax;
            }
            console.log("max value for band"+i+":"+tMax);
        }
        maxVal=1800;
        function scale(val){
            return(Math.round((val/maxVal*255)));
        }
        for (let i = 0, j = 0; i < rasterImageData.data.length; i += 4, j += 1) {            
            rasterImageData.data[i] = scale(raster.data[0][j]); // R value
            rasterImageData.data[i + 1] = scale(raster.data[isGrayscale ? 0 : 1][j]); // G value
            rasterImageData.data[i + 2] = scale(raster.data[isGrayscale ? 0 : 2][j]); // B value
            rasterImageData.data[i + 3] = isGrayscale || !raster.data[3] ? 255 : raster.data[3][j]; // A value
        }
        console.log(rasterImageData);
        var imageData = this.parent.transform(rasterImageData, args);
        console.log("imageData:",imageData);
        ctx.putImageData(imageData, args.xStart, args.yStart);
    }
});

L.LeafletGeotiff.rgb = function(options) {
    return new L.LeafletGeotiff.RGB(options);
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = L.LeafletGeotiff;
}
