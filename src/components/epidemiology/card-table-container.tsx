import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ReactNode } from "react"
import { LucideIcon } from "lucide-react"

interface CardTableContainerProps {
  title: string
  icon?: LucideIcon
  children: ReactNode
  className?: string
}

export function CardTableContainer({ title, icon: Icon, children, className }: CardTableContainerProps) {
  return (
    <Card className={className}>
      <CardHeader className="pb-2 border-b">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          {Icon && <Icon className="h-5 w-5" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2">
    <div className="p-2">
      {children}
    </div>
      </CardContent>
    </Card>
  )
}
