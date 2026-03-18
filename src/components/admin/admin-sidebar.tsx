'use client'

import { cn } from "@/lib/utils"
import { ArrowLeft, Layers2, LayoutDashboard, Monitor, Package, ShoppingCart, Users } from "lucide-react"
import { Button } from "../ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

const sidebarLinks = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { label: "Customers", icon: Users, href: "/admin/customers" },
    { label: "Categories", icon: Layers2, href: "/admin/categories" },
    { label: "Products", icon: Package, href: "/admin/products" },
    { label: "Orders", icon: ShoppingCart, href: "/admin/orders" },
]

const AdminSidebar = () => {

    const pathname = usePathname()

  return (
    <aside className="hidden w-64 shrink-0 border-r border-border bg-card lg:block">
        <div className="flex h-full flex-col">
            {/* Logo */}
            <div className="flex items-center gap-2 border-b border-boder px-6 py-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                    <Monitor className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold text-foreground" >SuperStore</span>
                <span className="ml-auto rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">Admin</span>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4">
                <div className="flex flex-col gap-1">
                    {sidebarLinks.map((link) => {
                        const Icon = link.icon
                        const isActive = pathname === link.href
                        return (
                            <Link key={link.href} href={link.href} className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                                isActive
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:bg-accent hover:text-foreground"
                            )}>
                                <Icon className="h-4 w-4" />
                                {link.label}
                            </Link>
                        )
                    })}
                </div>
            </nav>

            {/* Back to store */}
            <div className="border-t border-border p-4">
                <Button variant="outline" size="sm" className="w-full gap-2" asChild>
                    <Link href="/">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Store
                    </Link>
                </Button>
            </div>
        </div>
    </aside>
  )
}
export default AdminSidebar