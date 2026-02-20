"use client"
import * as React from "react"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { File } from "lucide-react"

export function TeamSwitcher({
}: {
  teams: {
    name: string
    logo: React.ElementType
    plan: string
  }[]
}) {
  


  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          variant="outline"
          size="sm"
          className="w-full justify-start py-6 data-[state=open]:bg-secondary hover:bg-secondary"
        >
          <File className="h-4 w-4" />
           <div>
            <p>
              GERESA
            </p>
            <p className="text-xs text-muted-foreground">
              Control Epidemiológico
            </p>
           </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
