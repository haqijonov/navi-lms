import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef(({ className, checked, ...props }, ref) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        ref={ref}
        {...props}
      />
      <div
        className={cn(
          "h-4 w-4 rounded border-2 border-input flex items-center justify-center transition-colors",
          checked ? "bg-primary border-primary" : "bg-background",
          className
        )}
      >
        {checked && <Check className="h-3 w-3 text-white" />}
      </div>
    </label>
  )
})
Checkbox.displayName = "Checkbox"

export { Checkbox }
