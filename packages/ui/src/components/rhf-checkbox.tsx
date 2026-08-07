"use client"

import * as React from "react"
import { useFormContext, ControllerProps, FieldPath, FieldValues } from "react-hook-form"

import { Checkbox } from "./checkbox"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form"

interface RHFCheckboxProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<ControllerProps<TFieldValues, TName>, "render"> {
  label: string
  description?: string
}

export function RHFCheckbox<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  label,
  description,
  control,
  ...props
}: RHFCheckboxProps<TFieldValues, TName>) {
  const { control: contextControl } = useFormContext<TFieldValues>()

  return (
    <FormField
      control={control || contextControl}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel>{label}</FormLabel>
            {description && (
              <FormDescription>{description}</FormDescription>
            )}
            <FormMessage />
          </div>
        </FormItem>
      )}
      {...props}
    />
  )
}
