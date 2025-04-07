'use client';

import { TranscriptPanel } from '@/components/sidepanel/transcript-panel';
import { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { RealtimeSession } from 'speechmatics';

export const RealtimeTranscription = forwardRef(function RealtimeTranscription(
  { onStart }: { onStart?: () => void },
  ref
) {
  const [session, setSession] = useState<RealtimeSession | null>(null);
  const [transcription, setTranscription] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const tcRef = useRef(transcription);

  const listDevices = () => {
    console.log('clicked');
    if (!navigator.mediaDevices?.enumerateDevices) {
      console.log('enumerateDevices() not supported.');
    } else {
      navigator.mediaDevices.enumerateDevices().then((devices) => {
        devices = devices.filter((d) => d.kind === 'audioinput');
        console.log(devices);
      });
    }
  };

  const stopTranscript = () => {
    // Stop MediaRecorder
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }

    // Stop stream tracks
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }

    // Stop session
    if (session) {
      session.stop();
      setSession(null);
    }
  };

  const startTranscript = async () => {
    let s: RealtimeSession;

    if (!session) {
      const { key_value } = await fetch('/api/key').then((res) => res.json());
      s = new RealtimeSession({ apiKey: key_value });
      setSession(s);
    } else {
      s = session;
    }

    s.addListener('RecognitionStarted', () => console.log('RecognitionStarted'));
    s.addListener('Error', (error) => console.log('session error', error));
    s.addListener('AddTranscript', (message) => {
      const updatedT = `${tcRef.current ?? ''} ${message.metadata.transcript}`;
      setTranscription(updatedT);
    });
    s.addListener('AddPartialTranscript', (message) => console.log('AddPartialTranscript', message));
    s.addListener('EndOfTranscript', () => console.log('EndOfTranscript'));

    await s.start({
      transcription_config: { language: 'en', output_locale: 'en-GB' },
    });

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    streamRef.current = stream;

    const mediaRecorder = new MediaRecorder(stream, {
      mimeType: 'audio/webm;codecs=opus',
      audioBitsPerSecond: 16000,
    });

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start(1000);

    mediaRecorder.ondataavailable = (event) => {
      if (s.isConnected()) {
        try {
          s.sendAudio(event.data);
        } catch (err) {
          console.error('Failed to send audio:', err);
        }
      }
    };

    if (onStart) onStart();
  };

  useImperativeHandle(ref, () => ({
    startTranscript,
    stopTranscript,
  }));

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <button onClick={listDevices}>Select device</button>
      <button onClick={startTranscript}>START</button>
      <button onClick={stopTranscript}>STOP</button>
      <TranscriptPanel transcription={transcription} />
    </div>
  );
});
