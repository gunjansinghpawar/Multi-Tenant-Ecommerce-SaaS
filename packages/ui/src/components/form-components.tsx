"use client"

import * as React from "react"
import { UseFormReturn, FormProvider } from "react-hook-form"
import { Button } from "./button"
import { Loader2, Save, Undo } from "lucide-react"
import { cn } from "@commercex/utils"

interface PremiumFormProps<TFieldValues extends Record<string, any>> {
  form: UseFormReturn<TFieldValues>
  onSubmit: (data: TFieldValues) => Promise<void> | void
  children: React.ReactNode
  className?: string
  showActions?: boolean
  submitLabel?: string
  loadingLabel?: string
  onReset?: () => void
  isSubmitting?: boolean
}

export function PremiumForm<TFieldValues extends Record<string, any>>({
  form,
  onSubmit,
  children,
  className,
  showActions = true,
  submitLabel = "Save Changes",
  loadingLabel = "Saving...",
  onReset,
  isSubmitting: externalIsSubmitting,
}: PremiumFormProps<TFieldValues>) {
  const isDirty = form.formState.isDirty
  const isSubmitting = externalIsSubmitting || form.formState.isSubmitting

  const handleReset = () => {
    form.reset()
    onReset?.()
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-6 relative", className)}>
        {/* Loading overlay for the form */}
        {isSubmitting && (
          <div className="absolute inset-0 z-10 bg-background/50 backdrop-blur-[1px] rounded-lg flex items-center justify-center">
            <div className="flex items-center gap-2 px-4 py-2 bg-background shadow-lg rounded-full border">
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
              <span className="text-sm font-medium">{loadingLabel}</span>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {children}
        </div>

        {showActions && (
          <div className="flex items-center justify-end gap-3 pt-4 border-t">
            {isDirty && (
              <span className="text-sm text-amber-500 mr-auto font-medium animate-in fade-in">
                Unsaved changes
              </span>
            )}
            <Button
              type="button"
              variant="outline"
              onClick={handleReset}
              disabled={!isDirty || isSubmitting}
            >
              <Undo className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <Button
              type="submit"
              disabled={!isDirty || isSubmitting}
              className={cn(isDirty && "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md")}
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              {isSubmitting ? loadingLabel : submitLabel}
            </Button>
          </div>
        )}
      </form>
    </FormProvider>
  )
}
