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
import React, { useEffect, useState } from "react"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import { NavSecondary } from "./nav-secondary"
import Link from "next/link"
import { getCurrentUser } from "aws-amplify/auth"
import { useRouter } from "next/navigation"

interface UserData {
    name: string
    email: string
    avatar: string
}
  
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const router = useRouter()
    const [currentUser, setCurrentUser] = useState<UserData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchCurrentUser() {
            try {
              const { username, userId, signInDetails } = await getCurrentUser();
                
                setCurrentUser({
                    name: username || 'User',
                    email: signInDetails?.loginId || 'no-email@example.com',
                    avatar: '' // You can add avatar logic here
                })
            } catch (error) {
                console.error("Not authenticated, redirecting to sign-in")
                router.push("/signin")
            } finally {
                setLoading(false)
            }
        }

        fetchCurrentUser()
    }, [router])

    if (loading) {
        return (
            <Sidebar {...props} collapsible="offcanvas">
                <SidebarFooter>
                    <div className="p-4 text-center">Loading user...</div>
                </SidebarFooter>
            </Sidebar>
        )
    }

    if (!currentUser) {
        return null // Redirect will happen in useEffect
    }

  return (
    <Sidebar {...props} collapsible="offcanvas">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Swadhesi Admin</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navigationData.navMain} />
        <NavSecondary items={navigationData.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter>
        <NavUser user={currentUser} />
      </SidebarFooter>
    </Sidebar>
  )
}

export const navigationData = {
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
          url: '/order-management',
          icon: PackageSearchIcon,
      },
      {
          title: 'Customer Management',
          url: '/customer-management',
          icon: UserPenIcon,
      },
      {
          title: "Marketing & Promotions",
          url: "/marketing-and-promotions",
          icon: ChartNoAxesCombinedIcon,
      },
      {
          title: "Content Management (CMS)",
          url: "/cms",
          icon: SquareGanttChartIcon,
      },
      {
          title: "Reporting & Analytics",
          url: "/analytics",
          icon: FileChartPieIcon,
      },
      
  ],
  navSecondary: [
      {
          title: "Settings",
          url: "/settings",
          icon: SettingsIcon,
      },
      {
          title: "Get Help",
          url: "#",
          icon: HelpCircleIcon,
      },
      {
          title: "Admin User Management",
          url: "/admin-user-management",
          icon: Users2Icon,
      },
  ],
}
  