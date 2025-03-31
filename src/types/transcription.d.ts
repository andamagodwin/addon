export interface TranscriptionEvent {
    type: 'interim' | 'final' | 'error';
    transcript: string;
    timestamp: string;
  }
  
  export type TranscriptionState = {
    transcripts: TranscriptionEvent[];
    isListening: boolean;
    error: string | null;
    sessionId: string | null;
  };