"use client"

import * as React from "react"
import {
  LayoutDashboard,
  FileSearch,
  Map,
  Brain,
  Activity,
  FileText,
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
import { useTranslations } from 'next-intl'

export function EpidemiologySidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const t = useTranslations('Sidebar')

  const user = {
    name: "Dr. Juan Pérez",
    email: "j.perez@minsa.gob.pe",
    avatar: "",
  }

  const teams = [
    {
      name: "MINSA",
      logo: Activity,
      plan: "Dirección de Epidemiología",
    },
  ]

  const navMain = [
    {
      title: t('salaSituacional'),
      url: "/dashboard",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: t('resumen'),
          url: "/dashboard",
        },
        {
          title: t('alertasActivas'),
          url: "/dashboard/alertas",
        },
      ],
    },
    {
      title: t('vigilancia'),
      url: "/dashboard/vigilancia",
      icon: FileSearch,
      items: [
        {
          title: t('listaCasos'),
          url: "/dashboard/vigilancia",
        },
        {
          title: t('nuevaNotificacion'),
          url: "/dashboard/vigilancia/notificar",
        },
        {
          title: t('buscarCie10'),
          url: "/dashboard/vigilancia/buscar",
        },
      ],
    },
    {
      title: t('analisisEspacial'),
      url: "/dashboard/espacial",
      icon: Map,
      items: [
        {
          title: t('mapaCalor'),
          url: "/dashboard/espacial",
        },
        {
          title: t('distribucionEess'),
          url: "/dashboard/espacial/establecimientos",
        },
      ],
    },
    {
      title: t('prediccion'),
      url: "/dashboard/prediccion",
      icon: Brain,
      items: [
        {
          title: t('proyecciones'),
          url: "/dashboard/prediccion",
        },
        {
          title: t('modelosIa'),
          url: "/dashboard/prediccion/modelos",
        },
      ],
    },
    {
      title: t('mapas'),
      url: "/dashboard/mapas",
      icon: Map,
      items: [
        {
          title: t('distribucionGeografica'),
          url: "/dashboard/mapas",
        },
        {
          title: t('porProvincia'),
          url: "/dashboard/mapas?vista=provincia",
        },
      ],
    },
    {
      title: t('reportes'),
      url: "/dashboard/reportes",
      icon: FileText,
      items: [
        {
          title: t('generarReportes'),
          url: "/dashboard/reportes",
        },
        {
          title: t('historial'),
          url: "/dashboard/reportes?tab=historial",
        },
      ],
    },
  ]

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} label={t('vigilancia')} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
