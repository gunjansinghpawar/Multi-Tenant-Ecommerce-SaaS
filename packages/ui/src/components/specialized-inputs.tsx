"use client"

import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input, type InputProps } from "./input"
import { Button } from "./button"
import { cn } from "@commercex/utils"
import { OTPInput as NativeOTPInput, SlotProps } from "input-otp"

// ----------------------------------------------------------------------------
// Password Input
// ----------------------------------------------------------------------------
export const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)

    return (
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn("pr-10", className)}
          ref={ref}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground"
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={props.disabled}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Eye className="h-4 w-4" aria-hidden="true" />
          )}
          <span className="sr-only">
            {showPassword ? "Hide password" : "Show password"}
          </span>
        </Button>
      </div>
    )
  }
)
PasswordInput.displayName = "PasswordInput"

// ----------------------------------------------------------------------------
// Currency Input (Basic formatting)
// ----------------------------------------------------------------------------
export interface CurrencyInputProps extends Omit<InputProps, "onChange"> {
  value?: number
  onChange?: (value: number | undefined) => void
  currency?: string
}

export const CurrencyInput = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ className, value, onChange, currency = "$", disabled, ...props }, ref) => {
    const [displayValue, setDisplayValue] = React.useState<string>(
      value !== undefined ? value.toString() : ""
    )

    React.useEffect(() => {
      if (value !== undefined && document.activeElement !== ref) {
        setDisplayValue(value.toString())
      }
    }, [value, ref])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value
      // Allow only numbers and a single decimal point
      if (val === "" || /^\d*\.?\d{0,2}$/.test(val)) {
        setDisplayValue(val)
        if (onChange) {
          onChange(val === "" ? undefined : Number(val))
        }
      }
    }

    return (
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <span className="text-muted-foreground sm:text-sm">{currency}</span>
        </div>
        <Input
          type="text"
          inputMode="decimal"
          className={cn("pl-7", className)}
          value={displayValue}
          onChange={handleChange}
          disabled={disabled}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
CurrencyInput.displayName = "CurrencyInput"

// ----------------------------------------------------------------------------
// OTP Input
// ----------------------------------------------------------------------------
export const OTPInputGroup = React.forwardRef<
  React.ElementRef<typeof NativeOTPInput>,
  React.ComponentPropsWithoutRef<typeof NativeOTPInput>
>(({ className, ...props }, ref) => (
  <NativeOTPInput
    ref={ref}
    containerClassName={cn(
      "flex items-center gap-2 has-[:disabled]:opacity-50",
      className
    )}
    {...props}
  />
))
OTPInputGroup.displayName = "OTPInputGroup"

export function OTPInputSlot({
  char,
  hasFakeCaret,
  isActive,
}: SlotProps) {
  return (
    <div
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border-y border-r border-input text-sm shadow-sm transition-all first:rounded-l-md first:border-l last:rounded-r-md",
        isActive && "z-10 ring-1 ring-ring",
        !isActive && char && "bg-accent/50"
      )}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
        </div>
      )}
    </div>
  )
}
