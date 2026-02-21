"use client"

import * as React from "react"
import {
  LayoutDashboard,
  FileSearch,
  Map,
  Brain,
  Activity,
  FileText,
  BarChart3,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Dr. Juan Pérez",
    email: "j.perez@minsa.gob.pe",
    avatar: "",
  },
  teams: [
    {
      name: "MINSA",
      logo: Activity,
      plan: "Dirección de Epidemiología",
    },
  ],
  navMain: [
    {
      title: "Sala Situacional",
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "Resumen",
          url: "/dashboard",
        },
        {
          title: "Alertas Activas",
          url: "/dashboard/alertas",
        },
      ],
    },
    {
      title: "Vigilancia",
      url: "/dashboard/vigilancia",
      icon: FileSearch,
      items: [
        {
          title: "Lista de Casos",
          url: "/dashboard/vigilancia",
        },
        {
          title: "Nueva Notificación",
          url: "/dashboard/vigilancia/notificar",
        },
        {
          title: "Buscar CIE-10",
          url: "/dashboard/vigilancia/buscar",
        },
      ],
    },
    {
      title: "Análisis Espacial",
      url: "/dashboard/espacial",
      icon: Map,
      items: [
        {
          title: "Mapa de Calor",
          url: "/dashboard/espacial",
        },
        {
          title: "Distribucion por EESS",
          url: "/dashboard/espacial/establecimientos",
        },
      ],
    },
    {
      title: "Predicción",
      url: "/dashboard/prediccion",
      icon: Brain,
      items: [
        {
          title: "Proyecciones",
          url: "/dashboard/prediccion",
        },
        {
          title: "Modelos IA",
          url: "/dashboard/prediccion/modelos",
        },
      ],
    },
    {
      title: "Mapas",
      url: "/dashboard/mapas",
      icon: Map,
      items: [
        {
          title: "Distribución Geográfica",
          url: "/dashboard/mapas",
        },
        {
          title: "Por Provincia",
          url: "/dashboard/mapas?vista=provincia",
        },
      ],
    },
    {
      title: "Reportes",
      url: "/dashboard/reportes",
      icon: FileText,
      items: [
        {
          title: "Generar Reportes",
          url: "/dashboard/reportes",
        },
        {
          title: "Historial",
          url: "/dashboard/reportes?tab=historial",
        },
      ],
    },
  ],
}

export function EpidemiologySidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} label="Vigilancia" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
