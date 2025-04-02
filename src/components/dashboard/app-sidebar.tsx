"use client"

import type * as React from "react"
import { BarChart3, BookOpen, Calendar, FileAudio, Home, MessageSquare, Settings, Video, VoteIcon } from "lucide-react"

import { NavMain } from "./nav-main"
// import { NavUser } from "./nav-user"
import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from "@/components/ui/sidebar"
import Image from "next/image"

// This is sample data.
const data = {
  user: {
    name: "Alex Johnson",
    email: "alex@edutech.com",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  
  navMain: [
    {
      title: "Home",
      url: "/dashboard/home",
      icon: Home,
    },
    {
      title: "My Lectures",
      url: "/dashboard/meetings",
      icon: Video,
    },
    {
      title: "AI Notes",
      url: "/notes",
      icon: BookOpen,
    },
    {
      title: "Resources",
      url: "/resources",
      icon: FileAudio,
    },
    {
      title: "Analytics",
      url: "/dashboard/analytics",
      icon: BarChart3,
    },
    {
      title: "Polls",
      url: "/polls",
      icon: VoteIcon,
    },
    {
      title: "AI Chatbot",
      url: "/chatbot",
      icon: MessageSquare,
    },
    {
      title: "Audiobooks",
      url: "/audiobooks",
      icon: FileAudio,
    },
    {
      title: "Schedule",
      url: "/dashboard/schedule",
      icon: Calendar,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex items-center justify-center p-4">
        <div className="flex items-center gap-2">
          <Image src="/logo-color-png.png" alt="logo" width={40} height={40} />
          
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      {/* <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  )
}

