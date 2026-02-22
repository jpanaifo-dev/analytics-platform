"use client"

import { EpidemiologySidebar } from "@/components/epidemiology/epidemiology-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/site-header"
import { NotificacionForm } from "@/components/notificacion-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NotificarPage() {
  return (
    <SidebarProvider>
      <EpidemiologySidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex items-center gap-4">
            <h1 className="text-base font-semibold md:text-base">
              Notificación Individual
            </h1>
          </div>
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base">Registro semanal de notificación individual</CardTitle>
            </CardHeader>
            <CardContent>
              <NotificacionForm />
            </CardContent>
          </Card>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
