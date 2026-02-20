import { cn } from "@/lib/utils"
import { KpiEpidemiologico } from "@/types/epidemiology"
import { TrendingUp, TrendingDown, Minus, Activity, Users, AlertTriangle, Shield } from "lucide-react"

interface KpiCardProps {
  kpi: KpiEpidemiologico
  className?: string
}

export function KpiCard({ kpi, className }: KpiCardProps) {
  const getIcono = () => {
    switch (kpi.icono) {
      case 'activity':
        return <Activity className="h-5 w-5" />
      case 'users':
        return <Users className="h-5 w-5" />
      case 'alert':
        return <AlertTriangle className="h-5 w-5" />
      case 'shield':
        return <Shield className="h-5 w-5" />
      default:
        return <Activity className="h-5 w-5" />
    }
  }

  const getTendenciaColor = () => {
    switch (kpi.tendencia) {
      case 'SUBE':
        return 'text-red-600 dark:text-red-400'
      case 'BAJA':
        return 'text-green-600 dark:text-green-400'
      default:
        return 'text-muted-foreground'
    }
  }

  const getTendenciaIcon = () => {
    switch (kpi.tendencia) {
      case 'SUBE':
        return <TrendingUp className="h-4 w-4" />
      case 'BAJA':
        return <TrendingDown className="h-4 w-4" />
      default:
        return <Minus className="h-4 w-4" />
    }
  }

  const calcularCambio = () => {
    if (!kpi.valorAnterior) return null
    const cambio = ((kpi.valor - kpi.valorAnterior) / kpi.valorAnterior) * 100
    return `${cambio > 0 ? '+' : ''}${cambio.toFixed(1)}%`
  }

  return (
    <div
      className={cn(
        "rounded-lg border bg-card p-4 shadow-sm transition-colors hover:bg-accent/50",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {kpi.indicador}
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold tracking-tight">
              {kpi.valor.toLocaleString('es-PE')}
            </span>
            <span className="text-xs text-muted-foreground">
              {kpi.unidad}
            </span>
          </div>
        </div>
        <div className="rounded-md bg-primary/10 p-2 text-primary">
          {getIcono()}
        </div>
      </div>
      
      {kpi.valorAnterior && (
        <div className="mt-3 flex items-center gap-2 text-xs">
          <span className={cn("flex items-center gap-1 font-medium", getTendenciaColor())}>
            {getTendenciaIcon()}
            {calcularCambio()}
          </span>
          <span className="text-muted-foreground">
            vs semana anterior
          </span>
        </div>
      )}
    </div>
  )
}

interface KpiGridProps {
  kpis: KpiEpidemiologico[]
  className?: string
}

export function KpiGrid({ kpis, className }: KpiGridProps) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-4", className)}>
      {kpis.map((kpi, index) => (
        <KpiCard key={index} kpi={kpi} />
      ))}
    </div>
  )
}
