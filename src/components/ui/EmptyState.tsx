// src/components/ui/empty-state.tsx

"use client";

import { AlertTriangle } from "lucide-react";

interface EmptyStateProps {
  message: string;
  icon?: React.ReactNode;
}

export function EmptyState({ message, icon }: EmptyStateProps) {
  const finalIcon = icon ?? (
    <AlertTriangle className="w-8 h-8 text-gray-400" />
  );

  return (
    <div className="flex flex-col items-center justify-center text-center py-10 px-4 text-muted-foreground">
      <div className="mb-4">{finalIcon}</div>
      <p className="text-sm">{message}</p>
    </div>
  );
}
