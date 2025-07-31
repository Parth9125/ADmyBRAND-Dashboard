"use client";

import { useState } from "react";
import { Column } from "@tanstack/react-table";
import { Check, ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

interface FacetedFilterOption {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}

interface DataTableFacetedFilterProps<TData> {
  column: Column<TData, unknown>;
  title?: string;
  options: FacetedFilterOption[];
}

export function DataTableFacetedFilter<TData>({
  column,
  title,
  options,
}: DataTableFacetedFilterProps<TData>) {
  const selectedValues = new Set(column.getFilterValue() as string[]);
  const [open, setOpen] = useState(false);

  const handleValueChange = (value: string, checked: boolean) => {
    const newValues = new Set(selectedValues);
    if (checked) {
      newValues.add(value);
    } else {
      newValues.delete(value);
    }
    column.setFilterValue(Array.from(newValues));
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          {title}
          {selectedValues.size > 0 && (
            <span className="ml-2 text-muted-foreground">
              ({selectedValues.size})
            </span>
          )}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[200px]">
        {options.map((option) => {
          const isSelected = selectedValues.has(option.value);
          return (
            <DropdownMenuCheckboxItem
              key={option.value}
              checked={isSelected}
              onCheckedChange={(checked) =>
                handleValueChange(option.value, checked)
              }
            >
              {option.icon && (
                <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
              )}
              {option.label}
              {isSelected && <Check className="ml-auto h-4 w-4 opacity-100" />}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
