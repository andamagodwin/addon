export interface TranscriptionResult {
    transcript: string;
    confidence: number;
    isFinal: boolean;
    languageCode: string;
  }
  
  export interface AudioMetadata {
    meetId: string;
    userId: string;
    timestamp: Date;
    duration: number;
  }
  
  export interface StoredAudio {
    audioUrl: string;
    metadata: AudioMetadata;
    transcription?: string;
  }