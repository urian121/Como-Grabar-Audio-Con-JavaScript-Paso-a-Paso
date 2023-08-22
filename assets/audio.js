const recordButton = document.getElementById("recordButton");
const recordingTimeDisplay = document.getElementById("recordingTime");
let mediaRecorder;
let audioChunks = [];
let startTime;
let timerInterval;

async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    mediaRecorder = new MediaRecorder(stream, {
      mimeType: "audio/webm",
    });

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      clearInterval(timerInterval);
      const audioBlob = new Blob(audioChunks, {
        type: "audio/webm",
      });

      recordingTimeDisplay.textContent = "Tiempo de grabación: 00:00";
      recordButton.classList.remove("text-danger", "bi-mic-mute-fill");
      recordButton.classList.add("bi-mic-fill");

      // Envía el audio grabado al servidor
      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");

      axios
        .post("save_audio.php", formData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error al enviar el audio al servidor:", error);
        });
    };

    mediaRecorder.start();
    startTime = Date.now();
    timerInterval = setInterval(updateRecordingTime, 1000);
    recordButton.classList.remove("bi-mic-fill");
    recordButton.classList.add("text-danger", "bi-mic-mute-fill");
    recordButton.classList.add("recording"); // Agregar la clase "recording"
  } catch (error) {
    console.error("Error al acceder al micrófono:", error);
  }
}

function stopRecording() {
  if (mediaRecorder && mediaRecorder.state === "recording") {
    clearInterval(timerInterval);
    mediaRecorder.stop();

    recordButton.classList.remove("recording");
  }
}

function updateRecordingTime() {
  const currentTimeMillis = Date.now() - startTime;
  const minutes = Math.floor(currentTimeMillis / 60000);
  const seconds = Math.floor((currentTimeMillis % 60000) / 1000);
  const formattedTime = `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
  recordingTimeDisplay.textContent = `Tiempo de grabación: ${formattedTime}`;
}

recordButton.addEventListener("click", () => {
  if (mediaRecorder && mediaRecorder.state === "recording") {
    stopRecording();
  } else {
    startRecording();
  }
});
