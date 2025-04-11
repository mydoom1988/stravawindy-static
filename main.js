// Inicijuojame žemėlapį, centruojame į Mažeikius
const map = L.map('map').setView([56.3114, 22.3357], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Pridedame OpenWeather vėjo sluoksnį su pateiktu API raktu
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

// Pridedame markerį maršruto pradžioje ir pabaigoje
const startMarker = L.marker(routeCoordinates[0]).addTo(map).bindPopup("Pradžia: Mažeikiai").openPopup();
const endMarker = L.marker(routeCoordinates[routeCoordinates.length - 1]).addTo(map).bindPopup("Pabaiga: Mažeikiai");

// Funkcija, kuri atnaujina vėjo informaciją ant žemėlapio
function updateWindInfo() {
  fetch(`https://api.weatherapi.com/v1/current.json?key=7cf63a209363df3dacda32d3d09a7963&q=Mažeikiai`)
    .then(res => res.json())
    .then(weather => {
      const windDir = weather.current.wind_degree;
      const windSpeed = weather.current.wind_kph;
      const windDirection = weather.current.wind_dir;

      // Atnaujiname popup su vėjo informacija
      startMarker.setPopupContent(`Vėjo kryptis: ${windDir}° (${windDirection}), Greitis: ${windSpeed} km/h`);
      startMarker.openPopup();
    })
    .catch(err => {
      console.error("Klaida gaunant vėjo duomenis:", err);
    });
}

// Paleidžiame vėjo informacijos atnaujinimą kas 5 minutes
updateWindInfo();
setInterval(updateWindInfo, 300000);  // Atnaujiname kas 5 minutes
