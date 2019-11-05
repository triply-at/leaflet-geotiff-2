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
            // get max value per band
            /*// first return sorted array of unique values that are not NaN
            let srt = raster.data[i].filter(function(v, index, self){return (!isNaN(v) && self.indexOf(v)===index);}).sort();
            */
            //  first return sorted array of values that are not NaN
            let srt = raster.data[i].filter(function(v, index, self){return !isNaN(v);}).sort();
            if(srt[srt.length-1]>maxVal){
                maxVal=srt[srt.length-1];
            }
            console.log("min value for band" + i + ": " + srt[0] + ", max value for band" + i + ": " + srt[srt.length-1]);
        }
        function scale(val){
            return(Math.round((val/maxVal*255)));
        }
        for (let i = 0, j = 0; i < rasterImageData.data.length; i += 4, j += 1) {            
            rasterImageData.data[i] = scale(raster.data[0][j]); // R value
            rasterImageData.data[i + 1] = scale(raster.data[isGrayscale ? 0 : 1][j]); // G value
            rasterImageData.data[i + 2] = scale(raster.data[isGrayscale ? 0 : 2][j]); // B value
            rasterImageData.data[i + 3] = isGrayscale || !raster.data[3] ? 255 : raster.data[3][j]; // A value
        }
        var imageData = this.parent.transform(rasterImageData, args);
        ctx.putImageData(imageData, args.xStart, args.yStart);
        
        // debug output
        /* var dPlotCanvas = document.getElementById("debugCanvas");
        dPlotCanvas.width = raster.width;
        dPlotCanvas.height = raster.height;
        var dCtx = dPlotCanvas.getContext("2d");
        dCtx.clearRect(0, 0, dPlotCanvas.width, dPlotCanvas.height);
        //this._image.src = plotCanvas.toDataURL();
        dCtx.putImageData(imageData, 0,0);
        console.log("imageDataURL (debug version):", dPlotCanvas.toDataURL()); */
    }
});

L.LeafletGeotiff.rgb = function(options) {
    return new L.LeafletGeotiff.RGB(options);
};

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = L.LeafletGeotiff;
}
