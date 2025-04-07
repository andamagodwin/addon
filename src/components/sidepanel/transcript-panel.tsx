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
    <div className="flex h-screen w-full">
      {/* Transcription Panel */}
      <div className="flex w-full flex-col rounded-lg m-6 bg-gray-100 dark:bg-gray-800 overflow-scroll">
        <div className="bg-gray-100 p-2 dark:bg-gray-800">
        </div>
        <h5>{transcription_language}</h5>
        <div className="flex gap-4 p-2">
          <p className="text-lg text-gray-500 dark:text-gray-400 md:text-xl lg:text-2xl">
            {combinedTranscription || "Not started..."}
          </p>
        </div>
      </div>
    </div>
  );
}