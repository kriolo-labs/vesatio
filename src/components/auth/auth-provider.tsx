"use client";

import { useAuthListener } from "@/hooks/use-auth-listener";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useAuthListener();
  return <>{children}</>;
}
