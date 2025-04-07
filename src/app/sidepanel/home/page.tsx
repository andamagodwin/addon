"use client"

import { useState } from "react"
import Link from "next/link"
import SidePanel from "@/components/sidepanel/SidePanel"
import { useAuthContext } from "@/Context/AuthContext"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AlertCircle, Settings, User, LogOut, CircleX } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"
import { useSidePanel } from "@/Context/SidePanelContext"

export default function Page() {
  const {startActivity,isInitialized} = useSidePanel()
  const {auth, isLoading,logout} = useAuthContext()
  console.log("auth",auth)
  
  const handleStartActivity = async () => {
    try {
      await startActivity();
    } catch (error) {
      console.error('Failed to start activity:', error);
      alert('Failed to start activity. Please try again.');
    }

  }

  const [showExtensionAlert, setShowExtensionAlert] = useState(true)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }


  // Get user initials for the avatar
  const getUserInitials = () => {
    if (!auth.user?.name) return "?"
    const nameParts = auth.user.name.split(" ")
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
    }
    return auth.user.name.substring(0, 2).toUpperCase()
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Extension Installation Alert */}
      {showExtensionAlert && (
        <Alert className="rounded-none border-b bg-green-100 flex items-center">
          <AlertCircle color="green" className="h-4 w-4 text-green-500" />
          <AlertDescription className="flex items-center justify-between w-full">
            <span className="text-xs">Enhance your experience by installing our <Link href="/extension" className="underline text-green-600 hover:text-green-800">
              browser extension
              </Link></span>
            <div className="">
              <Button variant="ghost" size="sm" onClick={() => setShowExtensionAlert(false)} className="h-8 w-8 p-0">
                <CircleX color="green" className="h-4 w-4"/>
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {/* Header with User Menu */}
      <header className="border-b py-3 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* <h1 className="text-xl font-semibold">Lingomeet</h1> */}
          <div>
            <Image src="/logo-color-png.png" alt="Lingomeet Logo" width={40} height={40} />
          </div>
          <h5 className="text-sm font-semibold mb-1">Hi, {auth.user?.name}!</h5>
          {auth.user?.userType === "lecturer" && (
            <div>
              {isInitialized ? (
                <button className="text-sm font-semibold p-2 bg-green-500" onClick={handleStartActivity}>
                  Take Attendance
                </button>
              ) : (
                <button className="text-sm font-semibold p-2 bg-gray-400 cursor-not-allowed">
                  Initializing Side Panel...
                </button>
              )}
            </div>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-9 w-9 bg-primary text-primary-foreground hover:opacity-90 cursor-pointer">
                <span className="font-medium w-full h-full flex items-center justify-center text-sm bg-green-500">{getUserInitials()}</span>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span>{auth.user?.name}</span>
                  <span className="text-xs text-muted-foreground">{auth.user?.email}</span>
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

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <SidePanel />
        </div>
      </main>
    </div>
  )
}

