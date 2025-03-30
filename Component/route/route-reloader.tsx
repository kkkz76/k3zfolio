// app/components/utils/route-reloader.tsx
"use client";

import { usePathname } from "next/navigation";
import React from "react";

export default function RouteReloader({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return <div key={pathname}>{children}</div>;
}
