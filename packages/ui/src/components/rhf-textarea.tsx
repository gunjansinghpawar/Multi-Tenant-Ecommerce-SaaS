"use client"

import * as React from "react"
import { useFormContext, ControllerProps, FieldPath, FieldValues } from "react-hook-form"

import { Textarea, TextareaProps } from "./textarea"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form"

interface RHFTextareaProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> extends Omit<ControllerProps<TFieldValues, TName>, "render"> {
  label?: string
  description?: string
  textareaProps?: TextareaProps
}

export function RHFTextarea<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  label,
  description,
  control,
  textareaProps,
  ...props
}: RHFTextareaProps<TFieldValues, TName>) {
  const { control: contextControl } = useFormContext<TFieldValues>()

  return (
    <FormField
      control={control || contextControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Textarea {...textareaProps} {...field} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
      {...props}
    />
  )
}
