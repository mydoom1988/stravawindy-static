
import polyline from 'https://cdn.skypack.dev/@mapbox/polyline';

console.log("main.js įkeltas");

const map = L.map('map').setView([55.95, 22.25], 10);

// OpenStreetMap fonas
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// OpenWeather vizualus vėjo sluoksnis
L.tileLayer('https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=7cf63a209363df3dacda32d3d09a7963', {
  opacity: 0.4
}).addTo(map);

// Vėjo analizės info laukelis
const windInfo = document.createElement("div");
windInfo.style.padding = "5px";
windInfo.style.fontFamily = "sans-serif";
windInfo.style.backgroundColor = "#f9f9f9";
windInfo.style.borderTop = "1px solid #ccc";
document.body.appendChild(windInfo);

// DEMO polyline (Mažeikių maršrutas)
const demoPolyline = 'c~nnH_itbBf@h@dAtAbBbEjCzChAhBhApBhC|DrBdDl@lA';
const coords = polyline.decode(demoPolyline);

// Rodo maršrutą
const routeLayer = L.polyline(coords, { color: 'red' }).addTo(map);
map.fitBounds(routeLayer.getBounds());

// Apskaičiuojam maršruto kryptį
const [lat1, lon1] = coords[0];
const [lat2, lon2] = coords[1];

const bearing = ((Math.atan2(
  Math.sin((lon2 - lon1) * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180),
  Math.cos(lat1 * Math.PI / 180) * Math.sin(lat2 * Math.PI / 180) -
  Math.sin(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
  Math.cos((lon2 - lon1) * Math.PI / 180)
) * 180 / Math.PI + 360) % 360).toFixed(0);

// Užklausa į WeatherAPI
fetch(`https://api.weatherapi.com/v1/current.json?key=df11f87260d1408c81663054251104&q=${lat1},${lon1}`)
  .then(res => res.json())
  .then(weather => {
    const windDir = weather.current.wind_degree;
    const windTxt = weather.current.wind_dir;
    const diff = Math.abs(windDir - bearing);
    const effective = diff > 180 ? 360 - diff : diff;

    const verdict = effective < 45 ? "💨 Palankus vėjas"
                  : effective > 135 ? "🥵 Priešinis vėjas"
                  : "🌬️ Šoninis vėjas";

    windInfo.innerHTML = `
      <strong>${verdict}</strong><br>
      Maršruto kryptis: ${bearing}°<br>
      Vėjo kryptis: ${windDir}° (${windTxt})
    `;
  })
  .catch(err => {
    windInfo.textContent = "Nepavyko gauti vėjo duomenų 😕";
    console.error("Vėjo API klaida:", err);
  });
