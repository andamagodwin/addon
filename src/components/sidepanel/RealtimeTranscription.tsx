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
    <div className="flex flex-col items-center justify-center gap-1  -mt-32">
      <div className='flex justify-evenly align-middle w-full'>
        <button
          onClick={listDevices}
          className="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition duration-200"
        >
          Select Device
        </button>
        <button
          onClick={startTranscript}
          className="px-6 py-3 bg-green-500 text-white font-medium rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition duration-200"
        >
          Start
        </button>
        <button
          onClick={stopTranscript}
          className="px-6 py-3 bg-red-500 text-white font-medium rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition duration-200"
        >
          Stop
        </button>
      </div>
      
      <TranscriptPanel transcription={transcription} />
    </div>
  );
});
