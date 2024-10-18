// Creating the map object
let myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5 
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Layer groups for nuclear plants, cancer data, and breast cancer data
let nuclearLayer = L.layerGroup();
let cancerLayer = L.layerGroup();
let breastCancerLayer = L.layerGroup();

// Fetch nuclear power plant data
fetch('http://127.0.0.1:5000/api/v1.0/plant_details')
  .then(response => response.json())
  .then(data => {
    data.forEach(plant => {
      let lat = parseFloat(plant.latitude);
      let lon = parseFloat(plant.longitude);
      let plantName = plant.name;

      if (!isNaN(lat) && !isNaN(lon)) {
        L.circleMarker([lat, lon], {
          radius: 7,
          fillColor: "limegreen",
          color: "#000",
          weight: 1,
          fillOpacity: 0.8
        })
        .bindPopup("<strong>Nuclear Power Plant:</strong> " + plantName)
        .addTo(nuclearLayer);
      }
    });
  });

// Functions to get colors based on cancer rates
function getColor(count) {
  return count > 1800 ? '#800026' :
         count > 1400 ? '#BD0026' :
         count > 1000 ? '#E31A1C' :
         count > 600  ? '#FC4E2A' :
         count > 200  ? '#FD8D3C' :
                        '#FFFFFF';
}

function getBreastCancerColor(count) {
  return count > 500 ? '#8B008B' :
         count > 300 ? '#FF69B4' :
         count > 200 ? '#FF1493' :
         count > 100 ? '#FFB6C1' :
         count > 50  ? '#FFC0CB' :
                        '#FFF0F5';
}

// Helper function to normalize county names
function normalizeName(name) {
  return name.toLowerCase().replace('county', '').trim();
}

// Fetch cancer data and apply to map as a choropleth
fetch('http://127.0.0.1:5000/api/v1.0/cancer_data')
  .then(response => response.json())
  .then(data => {
    let cancerRatesByCounty = {};
    data.forEach(item => {
      let normalizedCounty = normalizeName(item.county);
      cancerRatesByCounty[normalizedCounty] = {
        county: item.county,
        //state: item.state,
        average_annual_count: parseFloat(item.average_annual_count)
      };
    });

    fetch('gz_2010_us_050_00_5m.json')
      .then(response => response.json())
      .then(geoData => {
        L.geoJson(geoData, {
          style: function(feature) {
            let geoCountyName = normalizeName(feature.properties.NAME);
            let countyData = cancerRatesByCounty[geoCountyName];
            let cancerRate = countyData ? countyData.average_annual_count : 0;
            return {
              fillColor: getColor(cancerRate),
              weight: 2,
              opacity: 1,
              color: 'white',
              dashArray: '3',
              fillOpacity: 0.7
            };
          },
          onEachFeature: function(feature, layer) {
            let geoCountyName = normalizeName(feature.properties.NAME);
            let countyData = cancerRatesByCounty[geoCountyName];
            let cancerRate = countyData ? countyData.average_annual_count : "No data";
            let countyName = countyData ? countyData.county : "Unknown";
            layer.bindPopup(`<strong>${countyName}</strong><br>Average Annual Count: ${cancerRate}`);
          }
        }).addTo(cancerLayer);
      })
  })


// Fetch breast cancer data and apply to map
fetch('http://127.0.0.1:5000/api/v1.0/breast_data')
  .then(response => response.json())
  .then(data => {
    let breastCancerRatesByCounty = {};
    data.forEach(item => {
      let normalizedCounty = normalizeName(item.county);
      breastCancerRatesByCounty[normalizedCounty] = {
        county: item.county,
        //state: item.state,
        average_annual_count: parseFloat(item.average_annual_count)
      };
    });

    fetch('gz_2010_us_050_00_5m.json')
      .then(response => response.json())
      .then(geoData => {
        L.geoJson(geoData, {
          style: function(feature) {
            let geoCountyName = normalizeName(feature.properties.NAME);
            let countyData = breastCancerRatesByCounty[geoCountyName];
            let cancerRate = countyData ? countyData.average_annual_count : 0;
            return {
              fillColor: getBreastCancerColor(cancerRate),
              weight: 2,
              opacity: 1,
              color: 'white',
              dashArray: '3',
              fillOpacity: 0.7
            };
          },
          onEachFeature: function(feature, layer) {
            let geoCountyName = normalizeName(feature.properties.NAME);
            let countyData = breastCancerRatesByCounty[geoCountyName];
            let cancerRate = countyData ? countyData.average_annual_count : "No data";
            let countyName = countyData ? countyData.county : "Unknown";
            layer.bindPopup(`<strong>${countyName}</strong><br>Average Annual Breast Cancer Count: ${cancerRate}`);
          }
        }).addTo(breastCancerLayer);
        breastCancerLayer.addTo(myMap);
      }) 
  })
  


// Set up the legend for general cancer rates
let cancerLegend = L.control({ position: "bottomright" });
cancerLegend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");

    // Define the limits and the corresponding colors from the getColor() function
    let limits = [0, 200, 600, 1000, 1400, 1800];
    let colors = ['#FFFFFF', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026', '#800026'];
    let labels = [];

    // Add the minimum and maximum for display
    let legendInfo = "<h4>General Cancer Rates</h4>" +
        "<div class=\"labels\">" +
        "<div class=\"min\">" + limits[0] + "</div>" +
        "<div class=\"max\">" + limits[limits.length - 1] + "+</div>" +
        "</div>";

    div.innerHTML = legendInfo;

    // Create a label for each color and limit
    limits.forEach(function(limit, index) {
        labels.push("<li style=\"background-color: " + colors[index] + "\"></li> " + limit);
    });

    // Add the labels to the legend div
    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
};
cancerLegend.addTo(myMap);

// Set up the legend for breast cancer rates
let breastCancerLegend = L.control({ position: "bottomleft" });
breastCancerLegend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
    let limits = [0, 50, 100, 200, 300, 500];
    let colors = ['#FFF0F5', '#FFC0CB', '#FFB6C1', '#FF1493', '#FF69B4', '#8B008B'];
    let labels = [];

    // Add the minimum and maximum for display
    let legendInfo = "<h4>Breast Cancer Rates</h4>" +
        "<div class=\"labels\">" +
        "<div class=\"min\">" + limits[0] + "</div>" +
        "<div class=\"max\">" + limits[limits.length - 1] + "+</div>" +
        "</div>";

    div.innerHTML = legendInfo;

    // Create a label for each color and limit
    limits.forEach(function(limit, index) {
        labels.push("<li style=\"background-color: " + colors[index] + "\"></li> " + limit);
    });

    // Add the labels to the legend div
    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
};
breastCancerLegend.addTo(myMap);

// Add layers to the map with layer controls
let baseMaps = { "OpenStreetMap": myMap };
let overlayMaps = {
  "Nuclear Sites": nuclearLayer,
  "General Cancer Rates": cancerLayer,
  "Breast Cancer Rates": breastCancerLayer
};

// Adding the layer control to the map
L.control.layers(baseMaps, overlayMaps).addTo(myMap);

// Add layers to the map
nuclearLayer.addTo(myMap);
cancerLayer.addTo(myMap);
breastCancerLayer.addTo(myMap);