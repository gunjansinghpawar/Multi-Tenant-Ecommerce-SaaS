"use client";

import React, { useState } from "react";
import { 
  PageHeader, 
  Button,
  DataTable,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Form,
  RHFInput,
  RHFSelect
} from "@commercex/ui";
import { PlusIcon, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ColumnDef } from "@tanstack/react-table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@commercex/ui";

type PackageType = {
  id: string;
  name: string;
  type: string;
  dimensions: string;
  maxWeight: string;
};

const data: PackageType[] = [
  { id: "PKG-1", name: "Small Box", type: "Box", dimensions: "10x10x10 cm", maxWeight: "2 kg" },
  { id: "PKG-2", name: "Medium Box", type: "Box", dimensions: "20x20x20 cm", maxWeight: "5 kg" },
  { id: "PKG-3", name: "Polymailer", type: "Envelope", dimensions: "30x40 cm", maxWeight: "1 kg" },
];

const columns: ColumnDef<PackageType>[] = [
  { accessorKey: "name", header: "Package Name" },
  { accessorKey: "type", header: "Type" },
  { accessorKey: "dimensions", header: "Dimensions (L x W x H)" },
  { accessorKey: "maxWeight", header: "Max Weight" },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  type: z.string(),
  length: z.string().min(1, "Length is required"),
  width: z.string().min(1, "Width is required"),
  height: z.string().min(1, "Height is required"),
  maxWeight: z.string().min(1, "Max weight is required"),
});

export default function PackagingPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", type: "Box", length: "", width: "", height: "", maxWeight: "" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Saving Packaging:", values);
    setIsSheetOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Packaging Options" 
        text="Manage the standard packaging used for fulfilling orders."
      >
        <Button onClick={() => setIsSheetOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Package
        </Button>
      </PageHeader>

      <DataTable columns={columns} data={data} searchKey="name" />

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Add Packaging</SheetTitle>
            <SheetDescription>Define dimensions and constraints for a new package type.</SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <RHFInput name="name" label="Package Name" inputProps={{ placeholder: "e.g. Medium Box" }} />
                <RHFSelect 
                  name="type" 
                  label="Package Type" 
                  options={[
                    { label: "Box", value: "Box" },
                    { label: "Envelope / Mailer", value: "Envelope" },
                    { label: "Tube", value: "Tube" },
                  ]} 
                />
                
                <div className="grid grid-cols-3 gap-2">
                  <RHFInput name="length" label="Length (cm)" inputProps={{ type: "number" }} />
                  <RHFInput name="width" label="Width (cm)" inputProps={{ type: "number" }} />
                  <RHFInput name="height" label="Height (cm)" inputProps={{ type: "number" }} />
                </div>
                
                <RHFInput name="maxWeight" label="Maximum Weight (kg)" inputProps={{ type: "number", step: "0.1" }} />
                
                <div className="pt-4 flex justify-end space-x-2">
                  <Button variant="outline" type="button" onClick={() => setIsSheetOpen(false)}>Cancel</Button>
                  <Button type="submit">Save Package</Button>
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
