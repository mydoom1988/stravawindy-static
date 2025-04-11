
import polyline from 'https://cdn.skypack.dev/@mapbox/polyline';

const map = L.map('map').setView([55.95, 22.25], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Demo polyline užkrovimas rankiniu būdu
const demoPolyline = 'c~nnH_itbBf@h@dAtAbBbEjCzChAhBhApBhC|DrBdDl@lA';
const coords = polyline.decode(demoPolyline);

const routeLayer = L.polyline(coords, { color: 'red' }).addTo(map);
map.fitBounds(routeLayer.getBounds());
