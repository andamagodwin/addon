'use client'
import { useState, useEffect, useRef } from 'react'

export default function SpeechToText() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [finalTranscript, setFinalTranscript] = useState('')
  const recognitionRef = useRef(null)

  useEffect(() => {
    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      console.error('Speech recognition not supported in this browser')
      return
    }

    recognitionRef.current = new SpeechRecognition()
    recognitionRef.current.continuous = true
    recognitionRef.current.interimResults = true
    recognitionRef.current.lang = 'en-US'

    recognitionRef.current.onresult = (event) => {
      let interim = ''
      let final = ''

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          final += transcript
        } else {
          interim += transcript
        }
      }

      setFinalTranscript(prev => prev + ' ' + final)
      setTranscript(interim)
    }

    recognitionRef.current.onerror = (event) => {
      console.error('Speech recognition error', event.error)
      setIsListening(false)
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    } else {
      setFinalTranscript('')
      setTranscript('')
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  // Format the transcript with basic punctuation
  const formattedTranscript = (finalTranscript + ' ' + transcript)
    .replace(/\s+([,.!?])/g, '$1')  // Remove space before punctuation
    .replace(/([,.!?])(\w)/g, '$1 $2')  // Add space after punctuation
    .replace(/\bi\b/g, 'I')  // Capitalize I
    .trim()

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg">
        <div className="flex justify-center mb-6">
          <button
            onClick={toggleListening}
            className={`px-6 py-3 rounded-full text-white font-medium transition-colors ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isListening ? 'Stop' : 'Start Speaking'}
          </button>
        </div>

        <div className="h-64 overflow-y-auto p-4 border border-gray-200 rounded-lg bg-gray-50">
          {formattedTranscript ? (
            <p className="text-gray-800 whitespace-pre-wrap">
              {formattedTranscript}
              {isListening && (
                <span className="inline-block w-1 h-6 bg-blue-500 animate-pulse align-middle ml-1"></span>
              )}
            </p>
          ) : (
            <p className="text-gray-500 text-center mt-8">
              {isListening ? 'Listening... Speak now!' : 'Press the button to start'}
            </p>
          )}
        </div>

        <div className="mt-4 text-sm text-gray-500">
          <p>Status: {isListening ? 'Active 🎤' : 'Ready'}</p>
          <p>Browser: {window.SpeechRecognition ? 'Supported' : 'Not Supported'}</p>
        </div>
      </div>
    </div>
  )
}