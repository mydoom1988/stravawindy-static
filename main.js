// Inicijuojame žemėlapį, centruojame į Mažeikius
const map = L.map('map').setView([55.95, 22.25], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Pridedame OpenWeather vėjo sluoksnį
L.tileLayer('https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=7cf63a209363df3dacda32d3d09a7963', {
  opacity: 0.5
}).addTo(map);

// Demo maršruto koordinates Mažeikių rajone
const demoRouteCoordinates = [
    [56.319, 22.335],   // Mažeikiai
    [56.3062, 22.35],   // Intermediate point 1
    [56.2935, 22.3667], // Intermediate point 2
    [56.2900, 22.4167], // Intermediate point 3
    [56.2865, 22.4667], // Intermediate point 4
    [56.2935, 22.5167], // Leckava
    [56.2835, 22.5344], // Intermediate point between Leckava and Buknaičiai
    [56.2800, 22.5432], // Intermediate point near Buknaičiai
    [56.2765, 22.5521]  // Buknaičiai
];

// Nubraižome maršrutą – raudona linija
const routeLayer = L.polyline(demoRouteCoordinates, { color: 'red', weight: 4 }).addTo(map);
map.fitBounds(routeLayer.getBounds());

// Pridedame markerį maršruto pradžios taškui
L.marker(demoRouteCoordinates[0]).addTo(map)
  .bindPopup("Demo maršruto pradžia")
  .openPopup();
