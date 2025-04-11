// Apibrėžiam windyInit funkciją – ją iškvies pats libBoot.js
window.windyInit = function (options) {
  console.log("✅ Windy API užkrauta");

  const windyAPI = new window.WindyAPI(options);

  windyAPI.on("load", () => {
    console.log("🌍 Žemėlapis pilnai įkeltas");

    // Prieiga prie žemėlapio ir Leaflet objektų
    const map = windyAPI.map;
    const L = window.L;

    // Pavyzdinis markeris Mažeikiuose
    const marker = L.marker([55.95, 22.25]).addTo(map);
    marker.bindPopup("Sveikas, Karoli!").openPopup();
  });
};

// Windy API automatiškai iškvies windyInit(config)
