
const map = L.map('map').setView([55.95, 22.25], 9);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Imituojam kelių vietų koordinates
const points = [
  { lat: 55.95, lon: 22.25 },
  { lat: 56.05, lon: 22.35 },
  { lat: 55.85, lon: 22.15 },
  { lat: 56.00, lon: 22.00 },
  { lat: 55.90, lon: 22.50 },
  { lat: 55.80, lon: 22.30 },
  { lat: 55.95, lon: 22.60 },
  { lat: 56.10, lon: 22.10 },
  { lat: 56.00, lon: 22.75 }
];

// Visiems taškams paimam vėjo kryptį ir rodome rodyklę
points.forEach(p => {
  fetch(`https://api.weatherapi.com/v1/current.json?key=df11f87260d1408c81663054251104&q=${p.lat},${p.lon}`)
    .then(res => res.json())
    .then(data => {
      const deg = data.current.wind_degree;
      const arrow = L.divIcon({
        className: '',
        html: `<div class="arrow" style="transform: rotate(${deg}deg);">🧭</div>`,
        iconSize: [30, 30]
      });
      L.marker([p.lat, p.lon], { icon: arrow }).addTo(map);
    })
    .catch(err => console.error("Vėjas nesigavo:", err));
});
