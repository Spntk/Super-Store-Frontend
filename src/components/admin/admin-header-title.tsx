'use client'

import { usePathname } from "next/navigation"

const routeTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/customers": "Customers",
  "/admin/products": "Products",
  "/admin/categories": "Categories",
  "/admin/orders": "Orders",
};

const AdminHeaderTitle = () => {

    const pathname = usePathname()

    const getTitle = () => {
        if (routeTitles[pathname]) {
            return routeTitles[pathname]
        }

        if (pathname.startsWith("/admin/customers/")) return "Edit Customer";
    }

  return (
    <h1 className="text-lg font-bold text-foreground lg:text-xl transition-all">
        {getTitle()}
    </h1>
  )
}
export default AdminHeaderTitle