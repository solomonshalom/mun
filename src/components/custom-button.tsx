import type { ButtonHTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: "default" | "outline" | "ghost"
  icon?: ReactNode
}

const CustomButton = ({ children, className, variant = "default", icon, ...props }: CustomButtonProps) => {
  return (
    <button
      className={cn(
        "bg-black/50 backdrop-blur-sm border border-white/10 text-white rounded-none py-3 px-4 flex items-center justify-center gap-2 hover:bg-black/70 hover:border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all duration-200",
        variant === "outline" && "bg-transparent border-white/20",
        variant === "ghost" && "bg-transparent border-transparent shadow-none hover:bg-white/10",
        className,
      )}
      {...props}
    >
      {icon && <span className="flex items-center justify-center">{icon}</span>}
      {children}
    </button>
  )
}

export default CustomButton

