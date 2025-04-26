'use client'

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
    ArrowUpCircleIcon,
    ChartNoAxesCombinedIcon,
    FileChartPieIcon,
    HelpCircleIcon,
    LayoutDashboardIcon,
    PackageSearchIcon,
    SettingsIcon,
    ShirtIcon,
    SquareGanttChartIcon,
    UserPenIcon,
    Users2Icon,
} from "lucide-react"
import React from "react"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { NavSecondary } from "./nav-secondary"

export const navigationData = {
    user: {
        name: 'no-name',
        email: 'mail@example.com',
        avatar: '',
    },
    navMain: [
        {
            title: 'Dashboard',
            url: '/',
            icon: LayoutDashboardIcon,
        },
        {
            title: 'Product Management',
            url: '/product-management',
            icon: ShirtIcon,
        },
        {
            title: 'Order Management',
            url: '#',
            icon: PackageSearchIcon,
        },
        {
            title: 'Customer Management',
            url: '/analytics',
            icon: UserPenIcon,
        },
        {
            title: "Marketing & Promotions",
            url: "#",
            icon: ChartNoAxesCombinedIcon,
        },
        {
            title: "Content Management (CMS)",
            url: "#",
            icon: SquareGanttChartIcon,
        },
        {
            title: "Reporting & Analytics",
            url: "#",
            icon: FileChartPieIcon,
        },
        
    ],
    navSecondary: [
        {
            title: "Settings",
            url: "#",
            icon: SettingsIcon,
        },
        {
            title: "Get Help",
            url: "#",
            icon: HelpCircleIcon,
        },
        {
            title: "Admin User Management",
            url: "#",
            icon: Users2Icon,
        },
    ],
}
  
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props} collapsible="offcanvas" >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Swadhesi Admin</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navigationData.navMain} />
        <NavSecondary items={navigationData.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={navigationData.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
  