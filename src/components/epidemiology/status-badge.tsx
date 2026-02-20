import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { NivelAlerta, ClasificacionCaso, CondicionPaciente } from "@/types/epidemiology"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "text-foreground",
        success: "border-transparent bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
        warning: "border-transparent bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
        danger: "border-transparent bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
        info: "border-transparent bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
        emergencia: "border-transparent bg-red-600 text-white animate-pulse",
        alerta: "border-transparent bg-orange-500 text-white",
        advertencia: "border-transparent bg-yellow-500 text-white",
        infoAlert: "border-transparent bg-blue-500 text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

interface BadgeNivelAlertaProps {
  nivel: NivelAlerta
  className?: string
}

export function BadgeNivelAlerta({ nivel, className }: BadgeNivelAlertaProps) {
  const getVariant = (): BadgeProps["variant"] => {
    switch (nivel) {
      case 'EMERGENCIA':
        return 'emergencia'
      case 'ALERTA':
        return 'alerta'
      case 'ADVERTENCIA':
        return 'advertencia'
      case 'INFO':
        return 'infoAlert'
      default:
        return 'outline'
    }
  }

  return (
    <Badge variant={getVariant()} className={className}>
      {nivel}
    </Badge>
  )
}

interface BadgeClasificacionProps {
  clasificacion: ClasificacionCaso
  className?: string
}

export function BadgeClasificacion({ clasificacion, className }: BadgeClasificacionProps) {
  const getVariant = (): BadgeProps["variant"] => {
    switch (clasificacion) {
      case 'CONFIRMADO':
        return 'danger'
      case 'PROBABLE':
        return 'warning'
      case 'SOSPECHOSO':
        return 'info'
      case 'DESCARTADO':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  return (
    <Badge variant={getVariant()} className={className}>
      {clasificacion}
    </Badge>
  )
}

interface BadgeCondicionProps {
  condicion: CondicionPaciente
  className?: string
}

export function BadgeCondicion({ condicion, className }: BadgeCondicionProps) {
  const getVariant = (): BadgeProps["variant"] => {
    switch (condicion) {
      case 'VIVO':
        return 'success'
      case 'FALLECIDO':
        return 'destructive'
      case 'TRASLADADO':
        return 'info'
      case 'DESCONOCIDO':
        return 'secondary'
      default:
        return 'outline'
    }
  }

  const getLabel = () => {
    switch (condicion) {
      case 'VIVO':
        return 'Vivo'
      case 'FALLECIDO':
        return 'Fallecido'
      case 'TRASLADADO':
        return 'Trasladado'
      case 'DESCONOCIDO':
        return 'Desconocido'
      default:
        return condicion
    }
  }

  return (
    <Badge variant={getVariant()} className={className}>
      {getLabel()}
    </Badge>
  )
}
