"use client"

import { useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Info } from "lucide-react"
import { RealtimeTranscription } from "../RealtimeTranscription"
import AnimatedLogo from "@/components/shared/animated-logo"




export default function TranscriptTab() {
  const transcriptionRef = useRef<{ startTranscript: () => void; stopTranscript: () => void } | null>(null);
  const [saveTranscription, setSaveTranscription] = useState(false)
  const [language, setLanguage] = useState("english")


  

  const handleStart = () => {
    console.log('Transcription started!');
  };

  const startTranscriptionFromParent = () => {
    transcriptionRef.current?.startTranscript();
  };

  const stopTranscriptionFromParent = () => {
    transcriptionRef.current?.stopTranscript();
  };

  const handleSaveTranscriptionChange = (checked: boolean) => {
    setSaveTranscription(checked)
    if (checked) {
      startTranscriptionFromParent();
    } else {
      stopTranscriptionFromParent();
    }
  }

  return (
    <Card className="w-full">
      <CardHeader className="border-b border-green-100 pb-6">
        <CardTitle className="text-green-700">Transcription Settings</CardTitle>
        <CardDescription>Configure how your transcriptions are handled</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between space-x-1">
          <div className="space-y-0.5">
            <Label htmlFor="save-transcription" className="font-medium text-green-700">
              Save my transcription
            </Label>
            <p className="text-sm text-muted-foreground">Enable to automatically save all transcriptions</p>
          </div>
          <Switch
            id="save-transcription"
            checked={saveTranscription}
            onCheckedChange={handleSaveTranscriptionChange}
            className="data-[state=checked]:bg-green-500"
          />
        </div>

        {saveTranscription && (
          <div className="space-y-3">
            <div>
              <Label htmlFor="language-selection" className="font-medium text-green-700">
                Transcription language
              </Label>
              <p className="text-sm text-muted-foreground mb-3">
                Select your preferred local language for transcriptions
              </p>
            </div>
            <RadioGroup
              value={language}
              onValueChange={setLanguage}
              className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="english" id="english" className="text-green-500 border-green-500" />
                <Label htmlFor="english">Luganda</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="spanish" id="spanish" className="text-green-500 border-green-500" />
                <Label htmlFor="spanish">Alur</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="french" id="french" className="text-green-500 border-green-500" />
                <Label htmlFor="french">Acholi</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="german" id="german" className="text-green-500 border-green-500" />
                <Label htmlFor="german">Luo</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="chinese" id="chinese" className="text-green-500 border-green-500" />
                <Label htmlFor="chinese">English</Label>
              </div>
              
            </RadioGroup>
          </div>
        )}

        <div className="flex items-start gap-2 p-3 rounded-md bg-green-50 border border-green-200">
          <Info className="h-5 w-5 text-green-500 mt-0.5" />
          <p className="text-sm text-green-700">
            Real-time transcription is currently under development. This feature will be improved in a future update.
          </p>
        </div>


        {saveTranscription && (
          <div className="w-full flex items-center justify-center align-middle">
            <AnimatedLogo/>
          </div>
          
        )}



        <div className="hidden">
        <RealtimeTranscription ref={transcriptionRef} onStart={handleStart} />
        </div>
        
        
      </CardContent>
    </Card>
  )
}

