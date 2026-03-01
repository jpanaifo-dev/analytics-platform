"use client"

import { useState } from "react"
import { EpidemiologySidebar } from "@/components/epidemiology/epidemiology-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/site-header"
import { ReportesModulo } from "@/components/epidemiology/reportes-modulo"

export default function ReportesPage() {
  return (
    <SidebarProvider defaultOpen={true}>
      <EpidemiologySidebar />
      <SidebarInset>
        <SiteHeader sectionTitle="Reportes - Plataforma de Vigilancia Epidemiológica" />
        <div className="p-4 md:p-6">
          <ReportesModulo />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
