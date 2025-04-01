"use client"

import { Bell, Search } from "lucide-react"


import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function DashboardHeader() {

  return (
    <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-4 border-b bg-background px-6">
      <SidebarTrigger className="-ml-2" />
      <div className="flex flex-1 items-center gap-4">
        <h1 className="text-xl font-semibold">EduTech AI</h1>
        <div className="relative ml-auto hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="w-64 rounded-full bg-muted pl-8 md:w-80" />
        </div>
        <Button variant="outline" size="icon" className="ml-auto md:ml-0">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
        </Button>
        
      </div>
    </header>
  )
}

