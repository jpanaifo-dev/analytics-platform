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
        <SidebarProvider>
            <AnalyticsFilterSidebar />
            <SidebarInset className="bg-slate-50/50 shadow-inner">
                <SiteHeader sectionTitle={t("title")} />
                <div className="flex-1 flex flex-col p-4 md:p-6 overflow-hidden min-h-[calc(100vh-64px)]">
                    {children}
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
