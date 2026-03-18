import { Card, CardContent } from "@/components/ui/card"
import { Calendar, DollarSign, ShoppingCart } from "lucide-react"

interface CustomerStatsCardProps {
    totalOrders?: number
    totalSpent?: number
    customerSince?: string
    avgOrder?: number
}

const CustomerStatsCard = ({ totalOrders, totalSpent, customerSince, avgOrder }: CustomerStatsCardProps) => {

    const stats = [
        {
            icon: ShoppingCart,
            label: "Total Orders",
            value: totalOrders,
        },
        {
            icon: DollarSign,
            label: "Total Spent",
            value: totalSpent,
        },
        {
            icon: Calendar,
            label: "Customer Since",
            value: customerSince,
        },
        {
            icon: DollarSign,
            label: "Avg. Order",
            value: avgOrder,
        },
    ]

  return (
    <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {stats.map(({ icon: Icon, label, value }) => (
            <Card key={label}>
                <CardContent className="flex items-center gap-3 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <p className="text-md text-muted-foreground">{label}</p>
                        <p className="text-lg font-bold text-foreground">{value}</p>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
  )
}
export default CustomerStatsCard