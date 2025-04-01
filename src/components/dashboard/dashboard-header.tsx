"use client"

import { Bell } from "lucide-react"


import { Button } from "@/components/ui/button"

export function DashboardHeader() {

  return (
    <header className="sticky w-full top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b bg-red-500 px-6">
      <div className="flex flex-1 items-center gap-4">
        <h1 className="text-xl font-semibold">EduTech AI</h1>
        
        <Button variant="outline" size="icon" className="ml-auto md:ml-0">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
        </Button>
        
      </div>
    </header>
  )
}

