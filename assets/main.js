
import polyline from 'https://cdn.skypack.dev/@mapbox/polyline';

window.windyInit = function (options) {
  console.log("✅ Windy API ready");

  const root = document.getElementById("root");
  const map = window.windyAPI.map;
  const L = window.L;

  const select = document.getElementById("activitySelect");
  const windInfo = document.getElementById("windInfo");

  fetch("/api/strava-activities")
    .then(res => res.json())
    .then(activities => {
      select.innerHTML = '<option value="">Pasirink maršrutą</option>' +
        activities.map(a => `<option value="${a.id}">${a.name}</option>`).join('');
    });

  select.onchange = async () => {
    const id = select.value;
    if (!id) return;

    const data = await fetch("/api/strava-route?id=" + id).then(r => r.json());
    const coords = polyline.decode(data.polyline);

    const line = L.polyline(coords, { color: 'red' }).addTo(map);
    map.fitBounds(line.getBounds());

    const [lat1, lon1] = coords[0];
    const [lat2, lon2] = coords[1];
    const bearing = ((Math.atan2(
      Math.sin((lon2 - lon1) * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180),
      Math.cos(lat1 * Math.PI / 180) * Math.sin(lat2 * Math.PI / 180) -
      Math.sin(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.cos((lon2 - lon1) * Math.PI / 180)
    ) * 180 / Math.PI) + 360) % 360;

    const windDir = 270;
    const diff = Math.abs(windDir - bearing);
    const effective = diff > 180 ? 360 - diff : diff;

    windInfo.textContent = effective < 45 ? "💨 Palankus vėjas" :
                          effective > 135 ? "🥵 Priešinis vėjas" :
                                            "🌬️ Šoninis vėjas";
  };
};

window.windyInit({
  key: 'pB51Zbb2Lz3JQ3j2lsidiIB6d2wlYny3',
  lat: 55.95,
  lon: 22.25,
  zoom: 8
});
