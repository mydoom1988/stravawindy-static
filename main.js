import polyline from 'https://cdn.skypack.dev/@mapbox/polyline';

// Inicializuojame žemėlapį ir nustatome centrą į Mažeikius
const map = L.map('map').setView([55.95, 22.25], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Pridedame OpenWeather wind tile sluoksnį (vizualiai)
L.tileLayer('https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=7cf63a209363df3dacda32d3d09a7963', {
  opacity: 0.4
}).addTo(map);

// Užkrauname demo maršrutą – demo polyline (šitas kodas rodo, kaip vėliau galima integruoti tikrus Strava duomenis)
const demoPolyline = 'c~nnH_itbBf@h@dAtAbBbEjCzChAhBhApBhC|DrBdDl@lA';
const coords = polyline.decode(demoPolyline);
const routeLayer = L.polyline(coords, { color: 'red' }).addTo(map);
map.fitBounds(routeLayer.getBounds());

// Užklausa į WeatherAPI, kad gautume vėjo duomenis ties pirma veiklos tašku (Mažeikiai)
const lat = 55.95, lon = 22.25;
fetch(`https://api.weatherapi.com/v1/current.json?key=df11f87260d1408c81663054251104&q=${lat},${lon}`)
  .then(res => res.json())
  .then(weather => {
    const windDir = weather.current.wind_degree;
    const windTxt = weather.current.wind_dir;
    const windSpeed = weather.current.wind_kph;

    // Įrašo vėjo duomenis virš žemėlapio (controls div)
    const windInfoDiv = document.getElementById("windInfo");
    windInfoDiv.innerHTML = `<strong>Vėjo informacija:</strong><br>
                             Kryptis: ${windDir}° (${windTxt})<br>
                             Greitis: ${windSpeed} km/h`;

    // Paprasta rodyklė su CSS: sukama pagal vėjo kampą
    const arrowIcon = L.divIcon({
      className: 'wind-arrow',
      html: `<div style="font-size: 30px; color: blue; transform: rotate(${windDir}deg);">&#10148;</div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 20]
    });

    // Pridedame rodyklę į žemėlapį, į centrą (Mažeikiai)
    L.marker([lat, lon], { icon: arrowIcon }).addTo(map);
  })
  .catch(err => {
    console.error("Klaida gaunant vėjo duomenis:", err);
    const windInfoDiv = document.getElementById("windInfo");
    windInfoDiv.textContent = "Nepavyko gauti vėjo duomenų 😕";
  });
