// Inicijuojame žemėlapį, centruojame į Mažeikius
const map = L.map('map').setView([56.3114, 22.3357], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Pridedame OpenWeather vėjo sluoksnį
L.tileLayer('https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=7cf63a209363df3dacda32d3d09a7963', {
  opacity: 0.5
}).addTo(map);

// Apsibrėžiame demo maršruto koordinates nuo Mažeikių per Leckavą, Buknaičius ir atgal į Mažeikius
const routeCoordinates = [
  [56.3114, 22.3357], // Mažeikiai
  [56.3168, 22.3741], // Leckava
  [56.3023, 22.3165], // Buknaičiai
  [56.3114, 22.3357]  // Grįžtama į Mažeikius
];

// Nubraižome maršrutą naudojant raudoną liniją
const routeLayer = L.polyline(routeCoordinates, { color: 'red', weight: 5 }).addTo(map);
map.fitBounds(routeLayer.getBounds());

// Pridedame markerius maršruto pradžioje ir pabaigoje
L.marker(routeCoordinates[0]).addTo(map).bindPopup("Pradžia: Mažeikiai");
L.marker(routeCoordinates[routeCoordinates.length - 1]).addTo(map).bindPopup("Pabaiga: Mažeikiai");
