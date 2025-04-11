import polyline from 'https://cdn.skypack.dev/@mapbox/polyline';

const map = L.map('map').setView([55.95, 22.25], 10);

// OpenStreetMap fonas
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// OpenWeather Wind Layer
L.tileLayer('https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=7cf63a209363df3dacda32d3d09a7963', {
  opacity: 0.4
}).addTo(map);

// Maršrutų pasirinkimas
const select = document.getElementById("activitySelect");

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
});
