
import polyline from 'https://cdn.skypack.dev/@mapbox/polyline';

const map = L.map('map').setView([55.95, 22.25], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Vėjo sluoksnis
L.tileLayer('https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=7cf63a209363df3dacda32d3d09a7963', {
  opacity: 0.4
}).addTo(map);

const select = document.getElementById("activitySelect");
const windInfo = document.createElement("div");
windInfo.style.padding = "5px";
windInfo.style.fontFamily = "sans-serif";
document.getElementById("controls").appendChild(windInfo);

fetch("/api/strava-activities")
  .then(res => res.json())
  .then(activities => {
    select.innerHTML = '<option value="">Pasirink maršrutą</option>' +
      activities.map(a => `<option value="${a.id}">${a.name}</option>`).join('');
  });

let routeLayer = null;

select.addEventListener("change", async () => {
  const id = select.value;
  if (!id) return;

  const data = await fetch("/api/strava-route?id=" + id).then(r => r.json());
  const coords = polyline.decode(data.polyline);

  if (routeLayer) map.removeLayer(routeLayer);
  routeLayer = L.polyline(coords, { color: 'red' }).addTo(map);
  map.fitBounds(routeLayer.getBounds());

  const [lat1, lon1] = coords[0];
  const [lat2, lon2] = coords[1];

  const bearing = ((Math.atan2(
    Math.sin((lon2 - lon1) * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180),
    Math.cos(lat1 * Math.PI / 180) * Math.sin(lat2 * Math.PI / 180) -
    Math.sin(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.cos((lon2 - lon1) * Math.PI / 180)
  ) * 180 / Math.PI + 360) % 360).toFixed(0);

  const weatherRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat1}&lon=${lon1}&appid=7cf63a209363df3dacda32d3d09a7963`);
  const weather = await weatherRes.json();
  const windDir = weather.wind.deg;
  const diff = Math.abs(windDir - bearing);
  const effective = diff > 180 ? 360 - diff : diff;

  const verdict = effective < 45 ? "💨 Palankus vėjas"
                : effective > 135 ? "🥵 Priešinis vėjas"
                : "🌬️ Šoninis vėjas";

  windInfo.textContent = `Vėjo kryptis: ${windDir}°, Maršruto kryptis: ${bearing}° → ${verdict}`;
});
