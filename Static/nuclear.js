// Creating the map object
let myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5 
});

// Adding the tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

fetch('http://127.0.0.1:5000/api/v1.0/plant_details')
  .then(response => response.json())
  .then(data => {
    // Log the data to see if it's being fetched correctly
    console.log("Fetched Plant Data: ", data);

    data.forEach(plant => {
      let lat = parseFloat(plant.latitude);
      let lon = parseFloat(plant.longitude);
      let plantName = plant.name;

      if (!isNaN(lat) && !isNaN(lon)) {
        L.circleMarker([lat, lon], {
          radius: 5,
          fillColor: "#ff7800",
          color: "#000",
          weight: 1,
          fillOpacity: 0.8
        })
        .bindPopup("<strong>Nuclear Power Plant:</strong> " + plantName)
        .addTo(myMap);
      }
    });
  });
 
  
  // Set up the legend (optional)
  let legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
    let legendInfo = "<h1>Nuclear Power Plants</h1>" +
      "<div class=\"labels\">" +
      "<div>Locations of nuclear power plants in the USA</div>" +
      "</div>";
    div.innerHTML = legendInfo;
    return div;
  };

  // Adding the legend to the map
  legend.addTo(myMap);

