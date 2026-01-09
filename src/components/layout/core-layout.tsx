"use client";

import { AuraChat } from "@/components/aura/AuraChat";
import { CoreHeader } from "@/components/core/layout/core-header";
import { CoreSidebar } from "@/components/core/layout/core-sidebar";
import { CustomCursor } from "@/components/ui/custom-cursor";

export function CoreLayout({ children }: { children: React.ReactNode }) {
  // We would lift this state up or use Context/Zustand if simpler prop drilling isn't enough
  // For now, let's assume Sidebar controls its own width internally via layout classes but
  // ideally the parent should know to adjust padding.
  // Let's make sidebar fixed width for simplicity in CSS calculation or use a context.

  // To properly animate the main content margin when sidebar collapses, we usually need shared state.
  // However, since Client Component boundaries can be tricky, let's assume a default expanded state
  // and if we want perfectly synced animation we'd wrap this in a LayoutProvider.
  // For this prototype phase, using fixed left-margin is acceptable or we upgrade to Context.

  // Let's stick with the Sidebar internal state for now and maybe just use a safe margin that covers expanded state
  // OR we make Sidebar export its width via a callback?
  // Best approach for MVP: Sidebar is fixed 280px. If it collapses, it's 80px.
  // We can use a css variable set by sidebar or just hardcode the transition classes here.

  return (
    <div className="flex min-h-screen bg-onyx-900 text-diamond selection:bg-gold selection:text-onyx">
      <CustomCursor />

      {/* Sidebar is fixed */}
      <CoreSidebar />

      <div className="ml-[80px] flex min-w-0 flex-1 flex-col transition-all duration-300 md:ml-[280px]">
        {" "}
        {/* Default to expanded margin for stability */}
        <CoreHeader />
        <main className="bg-onyx-950 flex-1 overflow-y-auto overflow-x-hidden p-6">{children}</main>
        <AuraChat />
      </div>
    </div>
  );
}
