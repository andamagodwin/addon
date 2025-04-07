import { useState, useEffect } from "react";

export function TranscriptPanel({
  transcription_language,
  transcription,
}: {
  transcription?: string | null;
  transcription_language?: string | null;
}) {
  // Create an array using state to store the transcription
  const [transcriptionArray, setTranscriptionArray] = useState<string[]>([]);

  // Add the transcription to the array whenever it changes
  useEffect(() => {
    if (transcription) {
      setTranscriptionArray((prevArray) => [...prevArray, transcription]);
    }
  }, [transcription]);

  // Combine all transcriptions into a single string
  const combinedTranscription = transcriptionArray.join(" ");

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6 px-4">
      {/* Transcription Panel */}
      <div className="flex h-full w-full flex-col rounded-lg bg-gray-100 dark:bg-gray-800">
        <div className="bg-gray-100 p-6 dark:bg-gray-800">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Transcribing - {transcription_language ?? "English"}
          </h2>
        </div>
        <div className="flex h-full flex-col items-center justify-center gap-4 p-6">
          <p className="text-lg text-gray-500 dark:text-gray-400 md:text-xl lg:text-2xl">
            {combinedTranscription || "Not started..."}
          </p>
        </div>
      </div>
    </div>
  );
}