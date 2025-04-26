'use client'

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation";
import React from "react"
import { navigationData } from "./app-sidebar";

export function SiteHeader({
    className,
    ...props
}: React.ComponentProps<'header'>) {
    const pathname = usePathname();
  return (
    <header {...props} className={`group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear ${className}`}>
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{navigationData.navMain.find(item => item.url === pathname)?.title}</h1>
      </div>
    </header>
  )
}
