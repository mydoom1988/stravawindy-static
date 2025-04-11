import polyline from 'https://cdn.skypack.dev/@mapbox/polyline';

const map = L.map('map').setView([55.95, 22.25], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Nustatome koordinates, kurioms imame vėjo duomenis (čia – Mažeikiai)
const lat = 55.95;
const lon = 22.25;

// Užklausa į WeatherAPI, kad gautume dabartinį vėjo kampą, kryptį ir greitį
fetch(`https://api.weatherapi.com/v1/current.json?key=df11f87260d1408c81663054251104&q=${lat},${lon}`)
  .then(res => res.json())
  .then(weather => {
    const windDir = weather.current.wind_degree;
    const windTxt = weather.current.wind_dir;
    const speed = weather.current.wind_kph;
    
    // Sukuriame statinę rodyklę su Leaflet divIcon
    const arrowIcon = L.divIcon({
      className: '', // nereikia jokių CSS klasių su animacija
      html: `<div style="font-size: 30px; transform: rotate(${windDir}deg);">🧭</div>`,
      iconSize: [60, 60],
      iconAnchor: [15, 15]
    });
    
    // Pridedame markerį su rodykle į žemėlapį
    L.marker([lat, lon], { icon: arrowIcon }).addTo(map);
    
    // Pridedame informacinį langelį virš žemėlapio (naudojame Leaflet control)
    const infoControl = L.control({ position: 'topright' });
    infoControl.onAdd = function() {
      const div = L.DomUtil.create('div', 'info');
      div.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
      div.style.padding = '8px';
      div.style.fontFamily = 'Arial, sans-serif';
      div.style.fontSize = '14px';
      div.style.border = '1px solid #ccc';
      div.innerHTML = `<strong>Vėjo kryptis:</strong> ${windDir}° (${windTxt})<br>
                       <strong>Vėjo greitis:</strong> ${speed} km/h`;
      return div;
    };
    infoControl.addTo(map);
  })
  .catch(err => {
    console.error("Klaida gaunant vėjo duomenis:", err);
  });
