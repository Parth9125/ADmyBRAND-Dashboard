// src/components/dashboard/columns.tsx
import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

export type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  status: string;
};

type BadgeVariant = "default" | "secondary" | "destructive" | "success" | "outline";

const getStatusVariant = (status: string): BadgeVariant => {
  switch (status.toLowerCase()) {
    case "active":
      return "success";
    case "inactive":
      return "secondary";
    case "banned":
      return "destructive";
    default:
      return "outline";
  }
};

export const columns: ColumnDef<User>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "role", header: "Role" },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variant = getStatusVariant(status);
      return <Badge variant={variant}>{status}</Badge>;
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
];
