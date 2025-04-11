// main.js – rodo Leaflet žemėlapį, įdeda vėjo sluoksnį bei generuoja rodykles visam žemėlapiui,
// kurių kryptis nustatyta pagal WeatherAPI pateiktą vėjo kampą

console.log("main.js įkeltas");

// Nustatome žemėlapio pradinę lokaciją (Mažeikiai)
const lat = 55.95;
const lon = 22.25;

// Inicijuojame Leaflet žemėlapį
const map = L.map('map').setView([lat, lon], 10);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Įdedame OpenWeather vėjo sluoksnį
L.tileLayer('https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=7cf63a209363df3dacda32d3d09a7963', {
  opacity: 0.4
}).addTo(map);

// Funkcija, kuri sukuria grid overlay su rodyklėmis
function createWindOverlay(windDegree) {
  // Paimame žemėlapio konteinerio matmenis
  const container = map.getContainer();
  const rect = container.getBoundingClientRect();

  // Sukuriame overlay divą, kuris padengs visą žemėlapį
  const overlay = document.createElement("div");
  overlay.style.position = "absolute";
  overlay.style.top = "0";
  overlay.style.left = "0";
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.pointerEvents = "none"; // leidžia pelytės įvykiams pereiti prie žemėlapio
  container.appendChild(overlay);

  // Nustatome rodyklių skaičių: kas 100px
  const spacing = 100;
  const cols = Math.ceil(rect.width / spacing);
  const rows = Math.ceil(rect.height / spacing);

  // Ištrina ankstesnius overlay, jei tokių yra (papildoma logika gali būti įgyvendinta)
  overlay.innerHTML = "";

  // Generuojame grid'ą su rodyklėmis
  for (let col = 0; col < cols; col++) {
    for (let row = 0; row < rows; row++) {
      const arrow = document.createElement("div");
      arrow.className = "wind-arrow";
      // Naudojame emoji "➤" kaip rodyklę (arba "↑" jei norim, kad rodytų į viršų)
      arrow.textContent = "➤";
      // Rodyklės rotacija pagal vėjo kampą
      // Jei norime, kad rodyklė rodytų iš kur pučia (tai yra vėjo kryptis),
      // tada jei windDegree yra 250, reiškia vėjas pučia iš 250° – rodyklė turėtų būti pasukta atitinkamai
      arrow.style.transform = `rotate(${windDegree}deg)`;

      // Apskaičiuojam poziciją (centruojame rodyklę)
      arrow.style.left = (col * spacing + (spacing - 30) / 2) + "px";
      arrow.style.top = (row * spacing + (spacing - 30) / 2) + "px";

      overlay.appendChild(arrow);
    }
  }
}

// Užklausa į WeatherAPI, kad gautume vėjo duomenis
fetch(`https://api.weatherapi.com/v1/current.json?key=df11f87260d1408c81663054251104&q=${lat},${lon}`)
  .then(res => res.json())
