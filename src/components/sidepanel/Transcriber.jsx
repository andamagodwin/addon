import { useState, useEffect } from "react";

export default function Transcriber() {
  const [transcript, setTranscript] = useState("");
  const [recording, setRecording] = useState(false);
  let mediaRecorder;
  let audioStream;

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioStream = stream;
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();

    const audioChunks = [];
    mediaRecorder.ondataavailable = (event) => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
      const formData = new FormData();
      formData.append("audio", audioBlob);

      const response = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      setTranscript(result.transcript || "No transcription available");
    };

    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder.stop();
    audioStream.getTracks().forEach((track) => track.stop());
    setRecording(false);
  };

  return (
    <div>
      <h1>Real-time Speech-to-Text</h1>
      <button onClick={recording ? stopRecording : startRecording}>
        {recording ? "Stop Recording" : "Start Recording"}
      </button>
      <p className="mt-4 text-red-500">Transcript: {transcript}</p>
    </div>
  );
}
