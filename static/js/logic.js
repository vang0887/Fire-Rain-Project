// Store our API endpoint inside queryUrl
//fires over 1,000 acres
var queryUrl = "https://opendata.arcgis.com/datasets/e4d020cb51304d5194860d4464da7ba7_0.geojson?where=UPPER(FIPS_NAME)%20like%20'%25CEDAR%25'"
// Perform a GET request to the query URL
d3.json(queryUrl, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  console.log(data);
  createFeatures(data.features);
});

function createFeatures(fireData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the name of the fire, date of the fire, and the number acres the fire burned
  function onEachFeature(feature, layer) {
    layer.bindPopup("<h3>" + feature.FID +
      "</h3>");
  }

  // Create a GeoJSON layer containing the features array on the fireData object
  // Run the onEachFeature function once for each piece of data in the array
  var fires = L.geoJSON(fireData, {
    onEachFeature: onEachFeature
  });

  // Sending our fires layer to the createMap function
  createMap(fires);
}

function createMap(fires) {

  // Define streetmap and darkmap layers
  var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });

  var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  });

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    Fires: fires
  };

  // Create our map, giving it the streetmap and fires layers to display on load
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 2,
    layers: [streetmap, fires]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
}
