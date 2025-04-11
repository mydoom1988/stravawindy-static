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
  [56.3114, 22.3357], // Mažeikiai
  [56.3168, 22.3741], // Leckava
  [56.3023, 22.3165], // Buknaičiai
  [56.3114, 22.3357]  // Grįžtama į Mažeikius
];

// Nubraižome maršrutą – raudona linija
const routeLayer = L.polyline(demoRouteCoordinates, { color: 'red', weight: 4 }).addTo(map);
map.fitBounds(routeLayer.getBounds());

// Pridedame markerį maršruto pradžios taškui
L.marker(demoRouteCoordinates[0]).addTo(map)
  .bindPopup("Demo maršruto pradžia")
  .openPopup();
