"use client"

import * as React from "react"
import { useFormContext, ControllerProps, FieldPath, FieldValues } from "react-hook-form"

import { Input, InputProps } from "./input"
import { cn } from "@commercex/utils"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form"

interface RHFInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<ControllerProps<TFieldValues, TName>, "render"> {
  label?: string
  description?: string
  inputProps?: InputProps
}

export function RHFInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  label,
  description,
  control,
  inputProps,
  ...props
}: RHFInputProps<TFieldValues, TName>) {
  const { control: contextControl, watch } = useFormContext<TFieldValues>()
  const value = watch(name)

  const maxLength = inputProps?.maxLength
  const currentLength = typeof value === 'string' ? value.length : 0

  return (
    <FormField
      control={control || contextControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center justify-between">
            {label && <FormLabel>{label}</FormLabel>}
            {maxLength && (
              <span className="text-xs text-muted-foreground">
                {currentLength} / {maxLength}
              </span>
            )}
          </div>
          <FormControl>
            <Input 
              {...inputProps} 
              {...field} 
              className={cn(
                inputProps?.className, 
                maxLength && currentLength >= maxLength ? "border-destructive focus-visible:ring-destructive" : ""
              )} 
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage className="text-sm font-medium text-destructive mt-1 flex items-center gap-1" />
        </FormItem>
      )}
      {...props}
    />
  )
}
