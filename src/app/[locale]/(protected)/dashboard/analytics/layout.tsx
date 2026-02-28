"use client"

import { ReactNode } from "react"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { SiteHeader } from "@/components/site-header"
import { AnalyticsFilterSidebar } from "@/components/analytics/analytics-filter-sidebar"
import { useTranslations } from "next-intl"

interface LayoutProps {
    children: ReactNode
}

export default function AnalyticsLayout({ children }: LayoutProps) {
    const t = useTranslations("Analytics")

    return (
        <SidebarProvider
            style={{ "--sidebar-width": "336px", "--sidebar-width-icon": "56px" } as React.CSSProperties}
            className="overflow-x-hidden"
        >
            <AnalyticsFilterSidebar />
            <SidebarInset className="bg-slate-50/50 shadow-inner">
                <SiteHeader sectionTitle={t("title")} />
                <div className="flex-1 flex flex-col overflow-hidden h-[calc(100vh-64px)]">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
