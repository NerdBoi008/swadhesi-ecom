import { SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SiteHeader } from "@/components/sidebar/site-header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar variant='inset' />
      <SidebarInset>
        <SiteHeader className="sticky top-0 bg-background rounded-t-lg z-10" />
        <main className="p-5">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
