// Laukiame, kol puslapis pilnai užsikraus
document.addEventListener("DOMContentLoaded", () => {

  // Inicijuojame Leaflet žemėlapį, centruojame į Mažeikius
  const map = L.map('map').setView([55.95, 22.25], 10);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Koordinatės, kurioms imsime vėjo duomenis (čia – Mažeikiai)
  const lat = 55.95;
  const lon = 22.25;

  // Užklausa į WeatherAPI, kad gautume dabartinį vėjo kampą, kryptį ir greitį  
  fetch(`https://api.weatherapi.com/v1/current.json?key=df11f87260d1408c81663054251104&q=${lat},${lon}`)
    .then(res => res.json())
    .then(weather => {
      const windDir = weather.current.wind_degree;
      const windTxt = weather.current.wind_dir;
      const windSpeed = weather.current.wind_kph;

      // Sukuriame rodyklę kaip divIcon; panaudojame emoji "➤"
      const arrowIcon = L.divIcon({
        className: '',
        html: `<div class="wind-arrow" style="transform: rotate(${windDir}deg);">➤</div>`,
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      });

      // Pridedame markerį su rodykle į žemėlapį
      L.marker([lat, lon], { icon: arrowIcon }).addTo(map)
        .bindPopup(`Vėjo kryptis: ${windDir}° (${windTxt})<br>Greitis: ${windSpeed} km/h`)
        .openPopup();
    })
    .catch(err => {
      console.error("Klaida gaunant vėjo duomenis:", err);
    });
});
