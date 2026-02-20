import { LayoutWrapper } from "@/components/layout-wrapper"


export default function Page() {
  return (
    <LayoutWrapper sectionTitle="Dashboard">
      <h2 className="text-2xl font-semibold">Welcome to your dashboard</h2>
      <p className="text-muted-foreground">
        This is your dashboard where you can manage your projects, view analytics, and customize your settings.
      </p>
    </LayoutWrapper>
  )
}
