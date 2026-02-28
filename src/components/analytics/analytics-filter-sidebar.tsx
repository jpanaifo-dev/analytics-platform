"use client"

import * as React from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
    useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Menu,
    ChevronRight,
    Search,
    Map as MapIcon,
    LayoutGrid,
    ArrowRightLeft,
    Box,
    BarChart,
    Layers,
    Grid3X3,
    ScatterChart,
    LineChart,
    Network
} from "lucide-react"

export function AnalyticsFilterSidebar() {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const { setOpen } = useSidebar()

    const [activeTab, setActiveTab] = React.useState("single")

    // Get current filter values from URL
    const measure = searchParams.get("measure") || "dalys"
    const year = searchParams.get("year") || "2024"
    const age = searchParams.get("age") || "all ages"
    const sex = searchParams.get("sex") || "both"
    const metric = searchParams.get("metric") || "rate"
    const category = searchParams.get("category") || "risk"
    const location = searchParams.get("location") || "Loreto"
    const level = searchParams.get("level") || "0"

    const updateQuery = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set(key, value)
        router.push(`${pathname}?${params.toString()}`)
    }

    const viewTabs = [
        { id: "single", label: "Single" },
        { id: "explore", label: "Explore" },
        { id: "compare", label: "Compare" },
    ]

    const chartViews = [
        { id: "map", icon: MapIcon, label: "Map", path: "/dashboard/analytics" },
        { id: "treemap", icon: LayoutGrid, label: "Treemap", path: "/dashboard/analytics/treemap" },
        { id: "arrow", icon: ArrowRightLeft, label: "Arrow", path: "/dashboard/analytics/arrow" },
        { id: "pyramid", icon: Box, label: "Pyramid", path: "/dashboard/analytics/pyramid" },
        { id: "patterns", icon: Network, label: "Patterns", path: "/dashboard/analytics/patterns" },
        { id: "risk", icon: BarChart, label: "Risk by cause", path: "/dashboard/analytics/risk" },
        { id: "overlap", icon: Layers, label: "Overlap Map", path: "/dashboard/analytics/overlap" },
        { id: "heatmap", icon: Grid3X3, label: "Heatmap", path: "/dashboard/analytics/heatmap" },
        { id: "plot", icon: ScatterChart, label: "Plot", path: "/dashboard/analytics/plot" },
        { id: "line", icon: LineChart, label: "Line", path: "/dashboard/analytics/line" },
        { id: "decomposition", icon: BarChart, label: "Decomposition", path: "/dashboard/analytics/decomposition" },
    ]

    return (
        <Sidebar collapsible="none" variant="none" className="w-[336px] border-r">
            <SidebarContent className="flex-row h-full overflow-hidden p-0 gap-0">
                {/* Leftmost View Icons Strip */}
                <div className="w-14 border-r flex flex-col items-center py-4 bg-slate-50 dark:bg-slate-900/50 shrink-0">
                    <div className="mb-4 flex flex-col items-center gap-1">
                        <Menu className="h-5 w-5 text-slate-400" />
                        <span className="text-[8px] font-bold text-slate-400 uppercase">View</span>
                    </div>
                    <div className="flex flex-col gap-2 w-full px-2">
                        {chartViews.map((v) => {
                            const isActive = pathname === v.path || (pathname === "/dashboard/analytics" && v.id === "map")
                            return (
                                <Button
                                    key={v.id}
                                    variant={isActive ? "default" : "ghost"}
                                    size="icon"
                                    className={cn(
                                        "w-10 h-10 rounded-lg transition-all",
                                        isActive ? "bg-[#003d33] hover:bg-[#002d26] text-white" : "text-slate-500"
                                    )}
                                    onClick={() => router.push(v.path)}
                                    title={v.label}
                                >
                                    <v.icon className="h-5 w-5" />
                                </Button>
                            )
                        })}
                    </div>
                </div>

                {/* Filters Content */}
                <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-slate-950">
                    <SidebarHeader className="p-0 border-b">
                        <div className="px-4 py-2 bg-slate-50/50 border-b">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Analysis View</span>
                        </div>
                        <div className="flex w-full">
                            {viewTabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    className={cn(
                                        "flex-1 py-3 text-sm font-medium border-b-2 transition-all",
                                        activeTab === tab.id
                                            ? "border-[#003d33] text-[#003d33] bg-teal-50/50"
                                            : "border-transparent text-slate-500 hover:bg-slate-50"
                                    )}
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </SidebarHeader>

                    <SidebarContent className="p-4 space-y-6 overflow-y-auto custom-scrollbar">
                        {/* Level Slider */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-[11px] font-bold uppercase text-slate-400">
                                <span>Level</span>
                                <span className="text-teal-700">Level {level}</span>
                            </div>
                            <Slider
                                value={[parseInt(level)]}
                                max={4}
                                step={1}
                                className="py-2"
                                onValueChange={(v) => updateQuery("level", v[0].toString())}
                            />
                            <div className="flex justify-between text-[9px] text-slate-400 font-medium px-1">
                                <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span>
                            </div>
                        </div>

                        {/* Measure Segmented */}
                        <div className="space-y-3">
                            <label className="text-[11px] font-bold uppercase text-slate-400">Measure</label>
                            <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-md">
                                {["YLDs", "DALYs", "Deaths"].map((m) => (
                                    <button
                                        key={m}
                                        className={cn(
                                            "py-1.5 text-[11px] font-bold rounded transition-all",
                                            measure === m.toLowerCase()
                                                ? "bg-white dark:bg-slate-800 text-[#003d33] shadow-sm"
                                                : "text-slate-500 hover:text-slate-700"
                                        )}
                                        onClick={() => updateQuery("measure", m.toLowerCase())}
                                    >
                                        {m}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Location Select */}
                        <div className="space-y-3">
                            <label className="text-[11px] font-bold uppercase text-slate-400">Location</label>
                            <Select value={location.toLowerCase()} onValueChange={(v) => updateQuery("location", v)}>
                                <SelectTrigger className="h-9 text-xs border-slate-200 bg-white dark:bg-slate-900">
                                    <SelectValue placeholder="Select location" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="loreto">Geresa Loreto (Total)</SelectItem>
                                    <SelectItem value="maynas">Provincia Maynas</SelectItem>
                                    <SelectItem value="alto-amazonas">Provincia Alto Amazonas</SelectItem>
                                    <SelectItem value="requena">Provincia Requena</SelectItem>
                                    <SelectItem value="ucayali-loreto">Provincia Ucayali</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="flex items-center gap-1 text-[10px] text-blue-800 font-medium cursor-pointer hover:underline">
                                <Search className="h-3 w-3" />
                                <span>Use advanced settings</span>
                            </div>
                        </div>

                        {/* Year Slider */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-[11px] font-bold uppercase text-slate-400">
                                <span>Year</span>
                                <span className="text-teal-700">{year}</span>
                            </div>
                            <Slider
                                value={[parseInt(year)]}
                                min={1990}
                                max={2024}
                                step={1}
                                className="py-2"
                                onValueChange={(v) => updateQuery("year", v[0].toString())}
                            />
                            <div className="flex justify-between text-[9px] text-slate-400 font-medium font-mono">
                                <span>1990</span>
                                <span>2007</span>
                                <span>2024</span>
                            </div>
                        </div>

                        {/* Age Segmented */}
                        <div className="space-y-3">
                            <label className="text-[11px] font-bold uppercase text-slate-400">Age</label>
                            <div className="grid grid-cols-2 gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-md">
                                {["All ages", "Standard", "15-49", "70+"].map((a) => (
                                    <button
                                        key={a}
                                        className={cn(
                                            "py-1.5 text-[11px] font-bold rounded transition-all",
                                            age === a.toLowerCase()
                                                ? "bg-white dark:bg-slate-800 text-[#003d33] shadow-sm"
                                                : "text-slate-500 hover:text-slate-700"
                                        )}
                                        onClick={() => updateQuery("age", a.toLowerCase())}
                                    >
                                        {a}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sex Segmented */}
                        <div className="space-y-3">
                            <label className="text-[11px] font-bold uppercase text-slate-400">Sex</label>
                            <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-md">
                                {["Male", "Female", "Both"].map((s) => (
                                    <button
                                        key={s}
                                        className={cn(
                                            "py-1.5 text-[11px] font-bold rounded transition-all",
                                            sex === s.toLowerCase()
                                                ? "bg-white dark:bg-slate-800 text-[#003d33] shadow-sm"
                                                : "text-slate-500 hover:text-slate-700"
                                        )}
                                        onClick={() => updateQuery("sex", s.toLowerCase())}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Metric Segmented */}
                        <div className="space-y-3">
                            <label className="text-[11px] font-bold uppercase text-slate-400">Metric</label>
                            <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-md">
                                {[
                                    { label: "#", val: "number" },
                                    { label: "Rate", val: "rate" },
                                    { label: "%", val: "percent" }
                                ].map((m) => (
                                    <button
                                        key={m.val}
                                        className={cn(
                                            "py-1.5 text-[11px] font-bold rounded transition-all",
                                            metric === m.val
                                                ? "bg-white dark:bg-slate-800 text-[#003d33] shadow-sm"
                                                : "text-slate-500 hover:text-slate-700"
                                        )}
                                        onClick={() => updateQuery("metric", m.val)}
                                    >
                                        {m.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4 border-t space-y-2">
                            <button className="text-[11px] text-blue-800 font-bold underline hover:no-underline">Take tour</button>
                        </div>
                    </SidebarContent>
                </div>
            </SidebarContent>
        </Sidebar>
    )
}
