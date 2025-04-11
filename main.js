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
  [55.95, 22.25],
  [55.952, 22.253],
  [55.955, 22.256],
  [55.958, 22.260],
  [55.960, 22.265],
  [55.962, 22.270],
  [55.965, 22.275],
  [55.968, 22.280],
  [55.970, 22.285],
  [55.973, 22.290]
];

// Nubraižome maršrutą – raudona linija
const routeLayer = L.polyline(demoRouteCoordinates, { color: 'red', weight: 4 }).addTo(map);
map.fitBounds(routeLayer.getBounds());

// Pridedame markerį maršruto pradžios taškui
L.marker(demoRouteCoordinates[0]).addTo(map)
  .bindPopup("Demo maršruto pradžia")
  .openPopup();
