$(document).ready(function() {
  // MAP
  const map = L.map("map").setView([-37, 150], 5);
  L.tileLayer(
    "http://{s}.sm.mapstack.stamen.com/(toner-lite,$fff[difference],$fff[@23],$fff[hsl-saturation@20])/{z}/{x}/{y}.png"
  ).addTo(map);

  const windSpeedUrl =
    "https://stuartmatthews.github.io/leaflet-geotiff/tif/wind_speed.tif";
  // "https://github.com/danwild/leaflet-geotiff-2/raw/master/demo/wind_speed.tif";

  const windDirUrl =
    "https://github.com/danwild/leaflet-geotiff-2/raw/master/demo/wind_direction.tif";

  const renderer = L.LeafletGeotiff.plotty({
    displayMin: 0,
    displayMax: 10,
    clampLow: false,
    clampHigh: false
  });
  var windSpeedLayer = L.leafletGeotiff(windSpeedUrl, {
    renderer: renderer
  }).addTo(map);

  $("#displayMin").on("change", event => {
    windSpeedLayer.options.renderer.setDisplayRange(
      +event.currentTarget.value,
      windSpeedLayer.options.renderer.options.displayMax
    );
  });
  $("#displayMax").on("change", event => {
    windSpeedLayer.options.renderer.setDisplayRange(
      windSpeedLayer.options.renderer.options.displayMin,
      +event.currentTarget.value
    );
  });

  $("#clampLow").on("change", event => {
    windSpeedLayer.options.renderer.setClamps(
      event.currentTarget.checked,
      windSpeedLayer.options.renderer.options.clampHigh
    );
  });

  $("#clampHigh").on("change", event => {
    windSpeedLayer.options.renderer.setClamps(
      windSpeedLayer.options.renderer.options.clampLow,
      event.currentTarget.checked
    );
  });

  $("#colorScale").on("change", event => {
    const colorScale = $("#colorScale option:selected").val();
    windSpeedLayer.options.renderer.setColorScale(colorScale);
  });

  let popup;
  map.on("click", function(e) {
    if (!popup) {
      popup = L.popup()
        .setLatLng([e.latlng.lat, e.latlng.lng])
        .openOn(map);
    } else {
      popup.setLatLng([e.latlng.lat, e.latlng.lng]);
    }
    const value = windSpeedLayer.getValueAtLatLng(+e.latlng.lat, +e.latlng.lng);
    popup
      .setContent(`Possible value at point (experimental/buggy): ${value}`)
      .openOn(map);
  });
});
