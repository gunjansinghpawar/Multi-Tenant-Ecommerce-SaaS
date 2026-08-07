"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import { Button, ButtonProps } from "./button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu"
import { cn } from "@commercex/utils"

export interface SplitButtonProps extends ButtonProps {
  options: {
    label: string
    onClick: () => void
    icon?: React.ReactNode
  }[]
  onMainClick?: () => void
  mainLabel: React.ReactNode
}

export function SplitButton({
  options,
  onMainClick,
  mainLabel,
  variant = "default",
  size = "default",
  className,
  ...props
}: SplitButtonProps) {
  return (
    <div className={cn("inline-flex items-center justify-center rounded-md shadow-sm", className)}>
      <Button
        variant={variant}
        size={size}
        onClick={onMainClick}
        className="rounded-r-none border-r-0 focus-visible:z-10"
        {...props}
      >
        {mainLabel}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={variant}
            size={size}
            className="px-2 rounded-l-none border-l border-white/20 focus-visible:z-10"
            disabled={props.disabled}
          >
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {options.map((option, index) => (
            <DropdownMenuItem key={index} onClick={option.onClick}>
              {option.icon && <span className="mr-2">{option.icon}</span>}
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
