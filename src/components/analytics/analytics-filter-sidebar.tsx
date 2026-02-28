"use client"

import * as React from "react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import {
    BarChart3,
    Map as MapIcon,
    LayoutGrid,
    Grid3X3,
    ChevronDown,
    Activity,
    Calendar,
    Layers,
    Users,
    Percent
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarSeparator,
} from "@/components/ui/sidebar"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

export function AnalyticsFilterSidebar() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const t = useTranslations("Analytics")

    // Helper to update search params
    const updateQuery = React.useCallback(
        (key: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            if (value) {
                params.set(key, value)
            } else {
                params.delete(key)
            }
            router.push(`${pathname}?${params.toString()}`)
        },
        [router, pathname, searchParams]
    )

    const measure = searchParams.get("measure") || "dalys"
    const year = searchParams.get("year") || "2024"
    const age = searchParams.get("age") || "all"
    const sex = searchParams.get("sex") || "both"
    const metric = searchParams.get("metric") || "rate"
    const cause = searchParams.get("cause") || "all"

    const views = [
        { title: "Mapa", url: "/dashboard/analytics", icon: MapIcon },
        { title: "Grid/Bar", url: "/dashboard/analytics/grid", icon: BarChart3 },
        { title: "Heatmap", url: "/dashboard/analytics/heatmap", icon: Grid3X3 },
    ]

    return (
        <Sidebar variant="sidebar" className="border-r border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <SidebarHeader className="border-b px-6 py-4">
                <div className="flex items-center gap-2">
                    <Activity className="h-6 w-6 text-primary" />
                    <span className="text-lg font-bold tracking-tight">Analytics Pro</span>
                </div>
            </SidebarHeader>
            <SidebarContent className="p-4 gap-6">

                {/* View Selection */}
                <SidebarGroup>
                    <SidebarGroupLabel className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                        Vista
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="gap-1">
                            {views.map((view) => {
                                const isActive = pathname.endsWith(view.url) || (pathname === view.url && view.url.endsWith("analytics"))
                                return (
                                    <SidebarMenuItem key={view.url}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                            className="transition-all duration-200"
                                        >
                                            <a href={view.url} className="flex items-center gap-3">
                                                <view.icon className={`h-4 w-4 ${isActive ? 'text-primary' : ''}`} />
                                                <span className="font-medium">{view.title}</span>
                                            </a>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                <SidebarSeparator />

                {/* Filters */}
                <div className="space-y-6 px-2">

                    {/* Measure Select */}
                    <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase text-muted-foreground/70 flex items-center gap-2">
                            <Layers className="h-3 w-3" /> Medida
                        </Label>
                        <Select value={measure} onValueChange={(v) => updateQuery("measure", v)}>
                            <SelectTrigger className="w-full bg-accent/30 border-none hover:bg-accent/50 transition-colors">
                                <SelectValue placeholder="Seleccionar medida" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="dalys">DALYs (Años de vida perdidos)</SelectItem>
                                <SelectItem value="deaths">Muertes</SelectItem>
                                <SelectItem value="ylds">Años con discapacidad</SelectItem>
                                <SelectItem value="ylls">Años de vida perdidos</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Year Range */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label className="text-xs font-bold uppercase text-muted-foreground/70 flex items-center gap-2">
                                <Calendar className="h-3 w-3" /> Año: <span className="text-primary">{year}</span>
                            </Label>
                        </div>
                        <Slider
                            value={[parseInt(year)]}
                            min={1990}
                            max={2024}
                            step={1}
                            onValueChange={([v]) => updateQuery("year", v.toString())}
                            className="py-4"
                        />
                    </div>

                    <SidebarSeparator className="opacity-50" />

                    {/* Age Group */}
                    <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase text-muted-foreground/70 flex items-center gap-2">
                            <Users className="h-3 w-3" /> Edad
                        </Label>
                        <Select value={age} onValueChange={(v) => updateQuery("age", v)}>
                            <SelectTrigger className="w-full bg-accent/30 border-none">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas las edades</SelectItem>
                                <SelectItem value="under5">&lt; 5 años</SelectItem>
                                <SelectItem value="5-14">5-14 años</SelectItem>
                                <SelectItem value="15-49">15-49 años</SelectItem>
                                <SelectItem value="50-69">50-69 años</SelectItem>
                                <SelectItem value="70plus">70+ años</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Sex */}
                    <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase text-muted-foreground/70">Sexo</Label>
                        <div className="grid grid-cols-3 gap-1">
                            {['both', 'male', 'female'].map((s) => (
                                <Button
                                    key={s}
                                    variant={sex === s ? "default" : "ghost"}
                                    size="sm"
                                    className={`capitalize text-[10px] h-8 ${sex === s ? 'bg-primary text-primary-foreground' : 'bg-transparent border-none'}`}
                                    onClick={() => updateQuery("sex", s)}
                                >
                                    {s === 'both' ? 'Ambos' : s === 'male' ? 'Hombres' : 'Mujeres'}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Metric */}
                    <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase text-muted-foreground/70 flex items-center gap-2">
                            <Percent className="h-3 w-3" /> Métrica
                        </Label>
                        <Select value={metric} onValueChange={(v) => updateQuery("metric", v)}>
                            <SelectTrigger className="w-full bg-accent/30 border-none">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="number">Número</SelectItem>
                                <SelectItem value="rate">Tasa (por 100k)</SelectItem>
                                <SelectItem value="percent">Porcentaje</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Cause */}
                    <div className="space-y-2">
                        <Label className="text-xs font-bold uppercase text-muted-foreground/70">Causa / Enfermedad</Label>
                        <Select value={cause} onValueChange={(v) => updateQuery("cause", v)}>
                            <SelectTrigger className="w-full bg-accent/30 border-none">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas las causas</SelectItem>
                                <SelectItem value="communicable">Enfermedades Transmisibles</SelectItem>
                                <SelectItem value="non-communicable">Enfermedades No Transmisibles</SelectItem>
                                <SelectItem value="injuries">Lesiones</SelectItem>
                                <SelectItem value="dengue">Dengue</SelectItem>
                                <SelectItem value="malaria">Malaria</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                </div>
            </SidebarContent>
        </Sidebar>
    )
}
