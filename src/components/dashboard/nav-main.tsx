'use client'

import { usePathname } from 'next/navigation'
import { 
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenu,
  SidebarGroupLabel,
  SidebarGroup
} from "@/components/ui/sidebar"
import Link from "next/link"
import type React from "react"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: React.ElementType
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const pathname = usePathname()
  
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          const isActive = pathname === item.url || 
                         (item.url !== '/' && pathname.startsWith(item.url))
          
          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                asChild 
                isActive={isActive} 
                tooltip={item.title}
              >
                <Link href={item.url}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}