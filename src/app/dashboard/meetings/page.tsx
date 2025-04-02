'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar } from '@/components/ui/calendar'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

export default function Page() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Sample meetings data
  const meetings = [
    {
      id: 1,
      title: 'Quarterly Strategy Review',
      time: '10:00 AM - 11:30 AM',
      date: '2023-11-15',
      participants: 5,
      organizer: 'Alex Johnson',
      status: 'upcoming',
    },
    {
      id: 2,
      title: 'Product Launch Planning',
      time: '2:00 PM - 3:30 PM',
      date: '2023-11-16',
      participants: 8,
      organizer: 'Sarah Williams',
      status: 'upcoming',
    },
    {
      id: 3,
      title: 'Team Standup',
      time: '9:30 AM - 10:00 AM',
      date: '2023-11-14',
      participants: 12,
      organizer: 'Michael Chen',
      status: 'completed',
    },
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header with New Meeting Button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Lecture Spaces</h1>
          <p className="text-muted-foreground">
            Schedule, join, and review your Lectures
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
              <PlusIcon className="mr-2 h-4 w-4" />
              New Lecture
            </Button>
          </DialogTrigger>
          
          <DialogContent className="h-[98vh] sm:max-w-[600px] ">
            <DialogHeader>
              <DialogTitle>Schedule New Meeting</DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label htmlFor="title">Meeting Title</label>
                <Input id="title" placeholder="Enter meeting title" />
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
                  placeholder="Meeting agenda and objectives"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                Schedule Meeting
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Meetings Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {meetings.map((meeting) => (
          <Card key={meeting.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{meeting.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {meeting.time} • {meeting.date}
                  </CardDescription>
                </div>
                <Badge 
                  variant={meeting.status === 'completed' ? 'secondary' : 'default'}
                  className="ml-2"
                >
                  {meeting.status === 'completed' ? 'Completed' : 'Upcoming'}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src={`/avatars/${meeting.organizer.split(' ')[0].toLowerCase()}.jpg`} />
                  <AvatarFallback>
                    {meeting.organizer.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium">{meeting.organizer}</span>
                <span className="text-sm text-muted-foreground">
                  • {meeting.participants} participants
                </span>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" size="sm">
                Details
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Join
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  )
}