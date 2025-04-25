
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface ServiceBadgeProps {
  type: 'maintenance' | 'electrical' | 'plumbing' | 'painting' | 'hvac' | 'landscaping' | 'interior' | 'smart-home'
  className?: string
}

export const ServiceBadge = ({ type, className }: ServiceBadgeProps) => {
  const badgeStyles = {
    maintenance: "bg-blue-100 text-blue-800 border-blue-200",
    electrical: "bg-amber-100 text-amber-800 border-amber-200",
    plumbing: "bg-cyan-100 text-cyan-800 border-cyan-200",
    painting: "bg-purple-100 text-purple-800 border-purple-200",
    hvac: "bg-red-100 text-red-800 border-red-200",
    landscaping: "bg-green-100 text-green-800 border-green-200",
    interior: "bg-pink-100 text-pink-800 border-pink-200",
    'smart-home': "bg-indigo-100 text-indigo-800 border-indigo-200"
  }

  return (
    <Badge
      variant="outline"
      className={cn(
        "rounded-md font-medium",
        badgeStyles[type],
        className
      )}
    >
      {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
    </Badge>
  )
}
