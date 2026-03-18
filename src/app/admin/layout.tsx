'use client'

import AdminHeaderTitle from "@/components/admin/admin-header-title"
import AdminMobileSidebar from "@/components/admin/admin-mobile-sidebar"
import AdminSidebar from "@/components/admin/admin-sidebar"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface AdminLayoutProps {
    children: React.ReactNode
}

const AdminLayout = ({ children } : AdminLayoutProps) => {

  const pathname = usePathname()

  const isEditPage = () => {
    const pathParts = pathname.split("/")

    const isDeepPath = pathParts.length >= 4

    return isDeepPath
  }

  const hideMainHeader = isEditPage()

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
    <div className="flex flex-1 flex-col overflow-hidden">
    {!hideMainHeader && (
          <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3 lg:py-4 lg:px-8">
          {/* Mobile Sidebar */}
          <div className="flex items-center gap-3">
            <AdminMobileSidebar />
            <AdminHeaderTitle />
          </div>
          <Button variant="outline" size="sm" className="hidden gap-2 sm:flex" asChild>
            <Link href="/">
              <ArrowLeft size="h-4 w-4" />
              Back to Store
            </Link>
          </Button>
        </header>
    )}

        {/* Page Content */}
        <main className={`flex-1 overflow-y-auto ${hideMainHeader ? "" : "p-4 lg:p-8"}`}>
            {children}
        </main>
      </div>
    </div>
  )
}
export default AdminLayout