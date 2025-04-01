"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Info } from "lucide-react"

export default function TranscriptTab() {
  const [saveTranscription, setSaveTranscription] = useState(false)
  const [language, setLanguage] = useState("english")

  return (
    <Card className="w-full">
      <CardHeader className="border-b border-green-100 pb-6">
        <CardTitle className="text-green-700">Transcription Settings</CardTitle>
        <CardDescription>Configure how your transcriptions are handled</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between space-x-2">
          <div className="space-y-0.5">
            <Label htmlFor="save-transcription" className="font-medium text-green-700">
              Save my transcription
            </Label>
            <p className="text-sm text-muted-foreground">Enable to automatically save all transcriptions</p>
          </div>
          <Switch
            id="save-transcription"
            checked={saveTranscription}
            onCheckedChange={setSaveTranscription}
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
                <Label htmlFor="english">English</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="spanish" id="spanish" className="text-green-500 border-green-500" />
                <Label htmlFor="spanish">Spanish</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="french" id="french" className="text-green-500 border-green-500" />
                <Label htmlFor="french">French</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="german" id="german" className="text-green-500 border-green-500" />
                <Label htmlFor="german">German</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="chinese" id="chinese" className="text-green-500 border-green-500" />
                <Label htmlFor="chinese">Chinese</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="japanese" id="japanese" className="text-green-500 border-green-500" />
                <Label htmlFor="japanese">Japanese</Label>
              </div>
            </RadioGroup>
          </div>
        )}

        <div className="flex items-start gap-2 p-3 rounded-md bg-green-50 border border-green-200">
          <Info className="h-5 w-5 text-green-500 mt-0.5" />
          <p className="text-sm text-green-700">
            Real-time transcription is not currently available. This feature will be implemented in a future update.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

