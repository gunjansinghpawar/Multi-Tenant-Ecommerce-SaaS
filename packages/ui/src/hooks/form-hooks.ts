import * as React from "react"
import { UseFormReturn } from "react-hook-form"

// Hook to track unsaved changes and warn user before leaving
export function useUnsavedChangesWarning(
  form: UseFormReturn<any>,
  warningMessage: string = "You have unsaved changes. Are you sure you want to leave?"
) {
  const isDirty = form.formState.isDirty

  React.useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = warningMessage
        return warningMessage
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [isDirty, warningMessage])

  return { isDirty }
}

// Hook to auto-save form data after a debounce delay
export function useAutosave<TFieldValues extends Record<string, any>>(
  form: UseFormReturn<TFieldValues>,
  onSave: (data: TFieldValues) => Promise<void> | void,
  delay: number = 1000
) {
  const [isSaving, setIsSaving] = React.useState(false)
  const [lastSavedAt, setLastSavedAt] = React.useState<Date | null>(null)
  
  // Watch all form values
  const values = form.watch()
  const isDirty = form.formState.isDirty

  React.useEffect(() => {
    if (!isDirty) return

    const timeoutId = setTimeout(async () => {
      setIsSaving(true)
      try {
        // Run validation before saving
        const isValid = await form.trigger()
        if (isValid) {
          await onSave(values as TFieldValues)
          setLastSavedAt(new Date())
          // Reset dirty state to current values
          form.reset(values, { keepValues: true })
        }
      } catch (error) {
        console.error("Autosave failed", error)
      } finally {
        setIsSaving(false)
      }
    }, delay)

    return () => clearTimeout(timeoutId)
  }, [values, isDirty, delay, onSave, form])

  return { isSaving, lastSavedAt }
}
