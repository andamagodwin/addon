"use client"

import {  LogOut, Settings, User } from "lucide-react"
import { useAuthContext } from "@/Context/AuthContext"

// import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Avatar } from "../ui/avatar"
// import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu"

export function DashboardHeader() {
  const { auth,logout} = useAuthContext()
  const user = auth?.user
  const getUserInitials = () => {
    if (!user?.displayName) return "?"
    const nameParts = user.displayName.split(" ")
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
    }
    return user.displayName.substring(0, 2).toUpperCase()
  }


  return (
    <header className="sticky w-full top-0 z-10 flex h-16 shrink-0 items-center gap-4 px-6">
      <div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-9 w-9 bg-primary text-primary-foreground hover:opacity-90 cursor-pointer">
                <span className="font-medium w-full h-full flex items-center justify-center text-sm bg-[#04a59b]">{getUserInitials()}</span>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span>{user?.displayName}</span>
                  <span className="text-xs text-muted-foreground">{user?.email}</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
      </div>
    </header>
  )
}

