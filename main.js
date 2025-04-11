// Inicijuojame žemėlapį, centruojame į Mažeikius
const map = L.map('map').setView([56.3114, 22.3357], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Maršruto koordinates
const routeCoordinates = [
  [56.3114, 22.3357], // Mažeikiai
  [56.3168, 22.3741], // Leckava
  [56.3023, 22.3165], // Buknaičiai
  [56.3114, 22.3357]  // Grįžtama į Mažeikiai
];

// Nubraižome maršrutą
const routeLayer = L.polyline(routeCoordinates, { color: 'red', weight: 5 }).addTo(map);
map.fitBounds(routeLayer.getBounds());

// Funkcija, kuri nubraižo vėjo krypties rodykles
function displayWindArrows() {
  routeCoordinates.forEach(coord => {
    fetch(`https://api.weatherapi.com/v1/current.json?key=7cf63a209363df3dacda32d3d09a7963&q=${coord[0]},${coord[1]}`)
      .then(res => res.json())
      .then(weather => {
        const windDir = weather.current.wind_degree;
        const icon = L.divIcon({
          className: 'wind-arrow',
          html: `<div style="transform: rotate(${windDir}deg);">&#10148;</div>`,
          iconSize: [40, 40]
        });
        L.marker(coord, { icon: icon }).addTo(map);
      })
      .catch(err => console.error("Klaida gaunant vėjo duomenis:", err));
  });
}

// Periodiškai atnaujiname vėjo rodykles
displayWindArrows();
setInterval(displayWindArrows, 300000); // Atnaujiname kas 5 minutes
