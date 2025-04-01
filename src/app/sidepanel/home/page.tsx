"use client"

import { useState } from "react"
import Link from "next/link"
import SidePanel from "@/components/sidepanel/SidePanel"
import { useAuth } from "@/Context/AuthContext"
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
import { Card, CardContent } from "@/components/ui/card"

export default function Page() {
  const { user, logOut, loading } = useAuth() as {
    user: { displayName: string; email: string } | null
    logOut: () => void
    signIn: () => void
    loading: boolean
  }

  const [showExtensionAlert, setShowExtensionAlert] = useState(true)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Get user initials for the avatar
  const getUserInitials = () => {
    if (!user?.displayName) return "?"
    const nameParts = user.displayName.split(" ")
    if (nameParts.length >= 2) {
      return `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase()
    }
    return user.displayName.substring(0, 2).toUpperCase()
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Extension Installation Alert */}
      {showExtensionAlert && (
        <Alert className="rounded-none border-b bg-green-100 flex items-center">
          <AlertCircle color="green" className="h-4 w-4 text-green-500" />
          <AlertDescription className="flex items-center justify-between w-full">
            <span>Enhance your experience by installing our <Link href="/extension" className="underline text-green-600 hover:text-green-800">
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
          <h1 className="text-xl font-semibold">Lingomeet</h1>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-9 w-9 bg-primary text-primary-foreground hover:opacity-90 cursor-pointer">
                <span className="font-medium w-full h-full flex items-center justify-center text-sm bg-green-500">{getUserInitials()}</span>
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
              <DropdownMenuItem onClick={logOut}>
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
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">Welcome back, {user?.displayName}!</h2>
              <p className="text-muted-foreground">Access your addon features and settings below.</p>
            </CardContent>
          </Card>

          <SidePanel />
        </div>
      </main>
    </div>
  )
}

