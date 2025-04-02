'use client'
import { ReactNode } from 'react'
import { AppSidebar } from "@/components/dashboard/app-sidebar"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, CircleX } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [showExtensionAlert, setShowExtensionAlert] = useState(true)
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
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
        <header className="fixed w-full flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b-1 backdrop-blur-md">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
          <DashboardHeader />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 mt-20">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}