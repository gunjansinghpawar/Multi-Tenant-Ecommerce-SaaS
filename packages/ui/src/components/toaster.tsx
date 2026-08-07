"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast"
import { useToast } from "../hooks/use-toast"
import { CheckCircle2, AlertCircle, AlertTriangle, Info } from "lucide-react"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        const variant = props.variant || 'default'
        
        let Icon = null
        if (variant === 'success') Icon = <CheckCircle2 className="h-5 w-5 text-emerald-500" />
        else if (variant === 'destructive') Icon = <AlertCircle className="h-5 w-5 text-destructive" />
        else if (variant === 'warning') Icon = <AlertTriangle className="h-5 w-5 text-amber-500" />
        else if (variant === 'info') Icon = <Info className="h-5 w-5 text-blue-500" />

        return (
          <Toast key={id} {...props}>
            <div className="flex gap-3">
              {Icon && <div className="mt-0.5 flex-shrink-0">{Icon}</div>}
              <div className="grid gap-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
