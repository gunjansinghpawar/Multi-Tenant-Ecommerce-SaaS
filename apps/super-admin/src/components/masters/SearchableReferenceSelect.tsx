"use client";

import React, { useState, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@commercex/utils";
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@commercex/ui";
import { getReferenceOptionsAction } from "@/actions/master.actions";

interface Option {
  value: string;
  label: string;
}

interface SearchableReferenceSelectProps {
  referenceModel: string;
  filterBy?: string;
  filterValue?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function SearchableReferenceSelect({
  referenceModel,
  filterBy,
  filterValue,
  value,
  onChange,
  disabled
}: SearchableReferenceSelectProps) {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      setLoading(true);
      try {
        const filters = filterBy && filterValue ? { [filterBy]: filterValue } : undefined;
        const data = await getReferenceOptionsAction(referenceModel, filters);
        setOptions(data);
        
        // If we have a filter applied and the current value is not in the filtered options, clear it.
        // But only if we actually filtered something!
        if (filters && value && !data.find((o: Option) => o.value === value)) {
          onChange("");
        }
      } catch (err) {
        console.error("Failed to load options", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [referenceModel, filterBy, filterValue]); // Removed `value` and `onChange` from deps to prevent infinite loops

  const selectedLabel = options.find((option) => option.value === value)?.label;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between font-normal"
          disabled={disabled}
        >
          {value ? selectedLabel || "Selected..." : (loading ? "Loading..." : "Select option...")}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>{loading ? "Loading..." : "No results found."}</CommandEmpty>
          <CommandGroup className="max-h-[300px] overflow-auto">
            {options.map((option) => (
              <CommandItem
                key={option.value}
                value={option.label}
                onSelect={() => {
                  onChange(option.value === value ? "" : option.value);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
