
console.log("main.js įkeltas");

const lat = 55.95;
const lon = 22.25;

const map = L.map('map').setView([lat, lon], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const infoBox = document.getElementById("info");

// Užklausa į WeatherAPI
fetch(`https://api.weatherapi.com/v1/current.json?key=df11f87260d1408c81663054251104&q=${lat},${lon}`)
  .then(res => res.json())
  .then(weather => {
    const windDir = weather.current.wind_degree;
    const windTxt = weather.current.wind_dir;
    const speed = weather.current.wind_kph;

    infoBox.innerHTML = `
      <strong>Vėjo kryptis:</strong> ${windDir}° (${windTxt})<br>
      <strong>Vėjo greitis:</strong> ${speed} km/h
    `;

    const arrow = L.divIcon({
      className: 'wind-arrow',
      html: `<div style="transform: rotate(${windDir}deg); font-size: 24px;">🧭</div>`,
      iconSize: [30, 30]
    });

    L.marker([lat, lon], { icon: arrow }).addTo(map);
  })
  .catch(err => {
    infoBox.textContent = "Nepavyko gauti vėjo duomenų 😕";
    console.error("Klaida:", err);
  });
