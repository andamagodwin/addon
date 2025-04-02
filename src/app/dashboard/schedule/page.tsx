'use client'

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"

import { useState } from "react"

export default function Page () {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [title,setTitle] = useState<string>("")
    const [description,setDescription]= useState<string>("")

    function handleScheduleMeeting () {
        console.log("meeting schedule successfully")
        console.log({title,description,date})
    }



    return (
        <div className="flex">
            <div>
                <h1>Schedule a Lecture right here</h1>
                <div className="grid gap-4 py-4 w-[50vw]">
                    <div className="space-y-2">
                      <label htmlFor="title">Lecture Title</label>
                      <Input id="title" placeholder={title} onChange={(e)=>{setTitle(e.target.value)}} />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label>Date</label>
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          className="rounded-md border"
                        />
                      </div>
                      
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="start-time">Start Time</label>
                          <Input id="start-time" type="time" />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="end-time">End Time</label>
                          <Input id="end-time" type="time" />
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="participants">Participants</label>
                          <Input 
                            id="participants" 
                            placeholder="Enter emails separated by commas" 
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="description">Description</label>
                      <textarea
                        id="description"
                        rows={3}
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder={`lecture ${description}`}
                        onChange={(e)=>{setDescription(e.target.value)}}
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    className="bg-[#04a59b] cursor-pointer hover:bg-[#04a59ac5]"
                    onClick={handleScheduleMeeting}
                  >
                    Save
                  </Button>
                </div>
                </div>
                

            </div>
            <div>
                <h1>You current Lectures</h1>
            </div>
        </div>
        
    )
}