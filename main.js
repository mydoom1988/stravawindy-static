
console.log("main.js įkeltas");

// Vieta (Mažeikiai)
const lat = 55.95;
const lon = 22.25;

// Sukuriam laukelį
const windBox = document.createElement("div");
windBox.style.padding = "20px";
windBox.style.fontFamily = "Arial, sans-serif";
windBox.style.fontSize = "1.2em";
windBox.style.backgroundColor = "#f0f0f0";
windBox.style.border = "1px solid #ccc";
windBox.style.margin = "20px";
windBox.style.width = "fit-content";
windBox.textContent = "Kraunama vėjo informacija...";
document.body.appendChild(windBox);

// Užklausa į WeatherAPI
fetch(`https://api.weatherapi.com/v1/current.json?key=df11f87260d1408c81663054251104&q=${lat},${lon}`)
  .then(res => res.json())
  .then(weather => {
    const windDir = weather.current.wind_degree;
    const windTxt = weather.current.wind_dir;
    const speed = weather.current.wind_kph;

    windBox.innerHTML = `
      <strong>Vėjo kryptis:</strong> ${windDir}° (${windTxt})<br>
      <strong>Vėjo greitis:</strong> ${speed} km/h
    `;
  })
  .catch(err => {
    windBox.textContent = "Nepavyko gauti vėjo duomenų 😕";
    console.error("Klaida:", err);
  });
