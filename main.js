
window.windyInit = function (options) {
  window.windyAPI = new window.WindyAPI(options);

  window.windyAPI.on("load", () => {
    console.log("✅ Windy API sėkmingai įkeltas");
    const map = window.windyAPI.map;
    map.setView([55.95, 22.25], 8); // Mažeikiai
  });
};

window.windyInit({
  key: 'pB51Zbb2Lz3JQ3j2lsidiIB6d2wlYny3',
  lat: 55.95,
  lon: 22.25,
  zoom: 8
});
