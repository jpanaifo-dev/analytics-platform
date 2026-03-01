"use client"

import * as React from "react"
import { usePathname, useRouter } from "@/navigation"
import { useSearchParams } from "next/navigation"
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

import { useTranslations } from "next-intl"

export function AnalyticsFilterSidebar() {
    const pathname = usePathname()
    const router = useRouter()
    const searchParams = useSearchParams()
    const { setOpen } = useSidebar()
    const t = useTranslations("Analytics")

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
        { id: "single", label: t("tabs.single") },
        { id: "explore", label: t("tabs.explore") },
        { id: "compare", label: t("tabs.compare") },
    ]

    const chartViews = [
        { id: "map", icon: MapIcon, label: t("views.map"), path: "/analytics" },
        { id: "treemap", icon: LayoutGrid, label: t("views.treemap"), path: "/analytics/treemap" },
        { id: "arrow", icon: ArrowRightLeft, label: t("views.arrow"), path: "/analytics/arrow" },
        { id: "pyramid", icon: Box, label: t("views.pyramid"), path: "/analytics/pyramid" },
        { id: "patterns", icon: Network, label: t("views.patterns"), path: "/analytics/patterns" },
        { id: "risk", icon: BarChart, label: t("views.risk"), path: "/analytics/risk" },
        { id: "overlap", icon: Layers, label: t("views.overlap"), path: "/analytics/overlap" },
        { id: "heatmap", icon: Grid3X3, label: t("views.heatmap"), path: "/analytics/heatmap" },
        { id: "plot", icon: ScatterChart, label: t("views.plot"), path: "/analytics/plot" },
        { id: "line", icon: LineChart, label: t("views.line"), path: "/analytics/line" },
        { id: "decomposition", icon: BarChart, label: t("views.decomposition"), path: "/analytics/decomposition" },
    ]

    return (
        <Sidebar className="w-[336px] border-r">
            <SidebarContent className="flex-row h-full overflow-hidden p-0 gap-0">
                {/* Leftmost View Icons Strip */}
                <div className="w-14 border-r flex flex-col items-center py-4 shrink-0">
                    <div className="mb-4 flex flex-col items-center gap-1">
                        <Menu className="h-5 w-5 text-slate-400 dark:text-slate-200" />
                        <span className="text-[8px] font-bold text-slate-400 dark:text-slate-200 uppercase">{t("view")}</span>
                    </div>
                    <div className="flex flex-col gap-2 w-full px-2">
                        {chartViews.map((v) => {
                            const isActive = pathname === v.path || (pathname.includes("/analytics") && pathname === v.path)
                            return (
                                <Button
                                    key={v.id}
                                    variant={isActive ? "default" : "ghost"}
                                    size="icon"
                                    className={cn(
                                        "w-10 h-10 rounded-lg transition-all",
                                        isActive ? "bg-[#003d33] hover:bg-[#002d26] text-white dark:text-white" : "text-slate-500 dark:text-slate-200"
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
                <div className="flex-1 flex flex-col min-w-0">
                    <SidebarHeader className="p-0 border-b">
                        <div className="px-4 py-2 border-b">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t("analysisView")}</span>
                        </div>
                        <div className="flex w-full">
                            {viewTabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    className={cn(
                                        "flex-1 py-3 text-sm font-medium border-b-2 transition-all",
                                        activeTab === tab.id
                                            ? "border-[#003d33] text-primary bg-teal-50/50"
                                            : "border-transparent text-slate-500 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900/50"
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
                                <span>{t("filters.level")}</span>
                                <span className="">{t("filters.level")} {level}</span>
                            </div>
                            <Slider
                                value={[parseInt(level)]}
                                max={4}
                                step={1}
                                className="py-2"
                                onValueChange={(v) => updateQuery("level", v[0].toString())}
                            />
                            <div className="flex justify-between text-[9px] text-slate-400 dark:text-slate-200 font-medium px-1">
                                <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span>
                            </div>
                        </div>

                        {/* Measure Segmented */}
                        <div className="space-y-3">
                            <label className="text-[11px] font-bold uppercase text-slate-400">{t("filters.measure")}</label>
                            <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-md">
                                {["ylds", "dalys", "deaths"].map((m) => (
                                    <button
                                        key={m}
                                        className={cn(
                                            "py-1.5 text-[11px] font-bold rounded transition-all",
                                            measure === m
                                                ? "bg-white dark:bg-slate-800 text-primary shadow-sm"
                                                : "text-slate-500 dark:text-slate-200 hover:text-slate-700 dark:hover:text-slate-500"
                                        )}
                                        onClick={() => updateQuery("measure", m)}
                                    >
                                        {t(`measures.${m}Short`)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Location Select */}
                        <div className="space-y-3">
                            <label className="text-[11px] font-bold uppercase text-slate-400">{t("filters.location")}</label>
                            <Select value={location.toLowerCase()} onValueChange={(v) => updateQuery("location", v)}>
                                <SelectTrigger className="h-9 text-xs border-slate-200 bg-white dark:bg-slate-900">
                                    <SelectValue placeholder={t("filters.location")} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="loreto">{t("locations.loreto")}</SelectItem>
                                    <SelectItem value="maynas">{t("locations.maynas")}</SelectItem>
                                    <SelectItem value="alto-amazonas">{t("locations.alto-amazonas")}</SelectItem>
                                    <SelectItem value="loreto-prov">{t("locations.loreto-prov")}</SelectItem>
                                    <SelectItem value="mariscal-ramon-castilla">{t("locations.mariscal-ramon-castilla")}</SelectItem>
                                    <SelectItem value="requena">{t("locations.requena")}</SelectItem>
                                    <SelectItem value="ucayali-loreto">{t("locations.ucayali-loreto")}</SelectItem>
                                    <SelectItem value="datem-del-maranon">{t("locations.datem-del-maranon")}</SelectItem>
                                    <SelectItem value="putumayo">{t("locations.putumayo")}</SelectItem>
                                </SelectContent>
                            </Select>
                            <div className="flex items-center gap-1 text-[10px] text-blue-800 font-medium cursor-pointer hover:underline">
                                <Search className="h-3 w-3" />
                                <span>{t("advanced")}</span>
                            </div>
                        </div>

                        {/* Year Slider */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between text-[11px] font-bold uppercase text-slate-400">
                                <span>{t("filters.year")}</span>
                                <span className="">{year}</span>
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
                            <label className="text-[11px] font-bold uppercase text-slate-400">{t("filters.age")}</label>
                            <div className="grid grid-cols-2 gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-md">
                                {["all ages", "standard", "15-49", "70+"].map((a) => (
                                    <button
                                        key={a}
                                        className={cn(
                                            "py-1.5 text-[11px] font-bold rounded transition-all capitalize",
                                            age === a
                                                ? "bg-white dark:bg-slate-800 text-primary shadow-sm"
                                                : "text-slate-500 hover:text-slate-700"
                                        )}
                                        onClick={() => updateQuery("age", a)}
                                    >
                                        {t(`ages.${a}`)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sex Segmented */}
                        <div className="space-y-3">
                            <label className="text-[11px] font-bold uppercase text-slate-400">{t("filters.sex")}</label>
                            <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-md">
                                {["male", "female", "both"].map((s) => (
                                    <button
                                        key={s}
                                        className={cn(
                                            "py-1.5 text-[11px] font-bold rounded transition-all capitalize",
                                            sex === s
                                                ? "bg-white dark:bg-slate-800 text-primary shadow-sm"
                                                : "text-slate-500 hover:text-slate-700"
                                        )}
                                        onClick={() => updateQuery("sex", s)}
                                    >
                                        {t(`sexes.${s}`)}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Metric Segmented */}
                        <div className="space-y-3">
                            <label className="text-[11px] font-bold uppercase text-slate-400">{t("filters.metric")}</label>
                            <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-md">
                                {[
                                    { label: "#", val: "number" },
                                    { label: t("metrics.rate"), val: "rate" },
                                    { label: "%", val: "percent" }
                                ].map((m) => (
                                    <button
                                        key={m.val}
                                        className={cn(
                                            "py-1.5 text-[11px] font-bold rounded transition-all",
                                            metric === m.val
                                                ? "bg-white dark:bg-slate-800 text-primary shadow-sm"
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
                            <button className="text-[11px] text-blue-800 font-bold underline hover:no-underline">{t("tour")}</button>
                        </div>
                    </SidebarContent>
                </div>
            </SidebarContent>
        </Sidebar>
    )
}
