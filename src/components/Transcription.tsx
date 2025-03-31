'use client';
import { useTranscription } from '@/hooks/useTranscription';
import { useEffect, useRef } from 'react';

export default function Transcription() {
  const {
    transcripts,
    isListening,
    error,
    startTranscription,
    stopTranscription,
  } = useTranscription();

  const transcriptEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new transcripts arrive
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [transcripts]);

  return (
    <div className="flex flex-col gap-4 max-w-2xl mx-auto p-4 border rounded-lg shadow-sm">
      <h1 className="text-2xl font-bold text-blue-600">Real-time Transcription</h1>
      
      {error && (
        <div className="p-2 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="flex gap-2">
        <button
          onClick={() => startTranscription()}
          disabled={isListening}
          className={`px-4 py-2 rounded-md ${
            isListening
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isListening ? 'Listening...' : 'Start Listening'}
        </button>
        
        <button
          onClick={stopTranscription}
          disabled={!isListening}
          className={`px-4 py-2 rounded-md ${
            !isListening
              ? 'bg-gray-200 cursor-not-allowed'
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          Stop
        </button>
      </div>

      <div className="h-64 overflow-y-auto p-3 border rounded-md bg-gray-50">
        {transcripts.length === 0 ? (
          <p className="text-gray-500 text-center my-8">
            Transcripts will appear here when you start speaking...
          </p>
        ) : (
          transcripts.map((t, i) => (
            <div
              key={`${t.timestamp}-${i}`}
              className={`mb-2 p-2 rounded ${
                t.type === 'final' ? 'bg-blue-50' : 'bg-gray-100'
              }`}
            >
              <p className={t.type === 'final' ? 'font-medium' : 'italic'}>
                {t.transcript}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(t.timestamp).toLocaleTimeString()}
              </p>
            </div>
          ))
        )}
        <div ref={transcriptEndRef} />
      </div>
    </div>
  );
}