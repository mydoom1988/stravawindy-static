
import polyline from 'https://cdn.skypack.dev/@mapbox/polyline';

const map = L.map('map').setView([55.95, 22.25], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

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
