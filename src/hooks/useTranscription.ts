import { useState, useEffect, useCallback,useRef } from 'react';
import { TranscriptionEvent, TranscriptionState } from '@/types/transcription';

export const useTranscription = () => {
  const [state, setState] = useState<TranscriptionState>({
    transcripts: [],
    isListening: false,
    error: null,
    sessionId: null,
  });

  const controllerRef = useRef<AbortController | null>(null);

  const startTranscription = useCallback(async (language = 'en-US') => {
    try {
      setState(prev => ({
        ...prev,
        isListening: true,
        error: null,
        sessionId: Date.now().toString(),
      }));

      controllerRef.current = new AbortController();
      
      const response = await fetch(
        `http://localhost:5000/transcribe?language=${language}`,
        {
          method: 'POST',
          signal: controllerRef.current.signal,
        }
      );

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      if (!response.body) throw new Error('ReadableStream not supported');

      const reader = response.body
        .pipeThrough(new TextDecoderStream())
        .getReader();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const events = value
          .trim()
          .split('\n\n')
          .filter(line => line.startsWith('data:'))
          .map(line => JSON.parse(line.replace('data:', '')) as TranscriptionEvent);

        setState(prev => ({
          ...prev,
          transcripts: [...prev.transcripts, ...events],
        }));
      }
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        setState(prev => ({
          ...prev,
          error: (err as Error).message,
          isListening: false,
        }));
      }
    }
  }, []);

  const stopTranscription = useCallback(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    setState(prev => ({ ...prev, isListening: false }));
  }, []);

  useEffect(() => {
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, []);

  return {
    ...state,
    startTranscription,
    stopTranscription,
  };
};