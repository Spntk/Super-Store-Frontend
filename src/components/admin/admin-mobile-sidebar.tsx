'use client'

import { useEffect, useState } from "react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import { ArrowLeft, Layers2, LayoutDashboard, Menu, Monitor, Package, ShoppingCart, Users } from "lucide-react"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const sidebarMobileLinks = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { label: "Customers", icon: Users, href: "/admin/customers" },
    { label: "Categories", icon: Layers2, href: "/admin/categories" },
    { label: "Products", icon: Package, href: "/admin/products" },
    { label: "Orders", icon: ShoppingCart, href: "/admin/orders" },
]

const AdminMobileSidebar = () => {

    const [mobileOpen, setMobileOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        setMobileOpen(false)
    }, [pathname])

  return (
    <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
            </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
            <SheetHeader className="border-b border-border px-6 py-4">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                        <Monitor className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <SheetTitle className="text-lg">SuperStore</SheetTitle>
                    <span className="ml-auto rounded-md bg-primary/10 px-2 py-0.5 mr-5 text-xs font-medium text-primary">
                        Admin
                    </span>
                </div>
            </SheetHeader>
            <nav className="flex flex-col gap-1 p-3">
                {sidebarMobileLinks.map((link) => {
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
            </nav>
            <div className="mt-auto border-t border-border p-4">
                <Button variant="outline" size="sm" className="w-full gap-2" asChild>
                    <Link href="/">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Store
                    </Link>
                </Button>
            </div>
        </SheetContent>
    </Sheet>
  )
}
export default AdminMobileSidebar