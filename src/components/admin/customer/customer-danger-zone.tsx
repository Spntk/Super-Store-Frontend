import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Ban, RotateCcw, TriangleAlert } from "lucide-react"

interface CustomerDangerZoneProps {
    status: string
    role: string
    onRoleChange: (role: string) => void
    onSuspendClick: () => void
    onRestoreClick: () => void
}

const CustomerDangerZone = ({ status, role, onRoleChange, onSuspendClick, onRestoreClick }: CustomerDangerZoneProps) => {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base text-destructive">
                <TriangleAlert className="h-4 w-4 text-destructive" />
                Danger Zone
            </CardTitle>
        </CardHeader>

        <CardContent>
            <div className="rounded-lg border border-border p-4">
                <p className="text-sm font-medium text-foreground">Change Role Account</p>
                <p className="mt-1 text-xs text-muted-foreground mb-2">
                    {`Change this account's role from Customer to Admin. This will grant the user elevated permissions to manage the platform.`}
                </p>
                <Select value={role.toLocaleLowerCase()} onValueChange={(val) => onRoleChange(val.toUpperCase())}>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="admin">ADMIN</SelectItem>
                        <SelectItem value="customer">CUSTOMER</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </CardContent>

        <CardContent>
            <div className="rounded-lg border border-border p-4">
                <p className="text-sm font-medium text-foreground">Suspend Account</p>
                <p className="mt-1 text-xs text-muted-foreground mb-2">
                    {`Temporarily disable this customer account. They will not be able to log in or place orders.`}
                </p>
                {status === "ACTIVE" || status === "INACTIVE" ? (
                    <Button onClick={onSuspendClick} variant="outline" className="text-destructive hover:bg-destructive/10 cursor-pointer">
                        <Ban className="h-4 w-4 mr-2" />Suspend
                    </Button>
                ) : (
                    <Button onClick={onRestoreClick} className="cursor-pointer">
                        <RotateCcw className="h-4 w-4 mr-2" />Restore
                    </Button>
                )}
            </div>
        </CardContent>

    </Card>
  )
}
export default CustomerDangerZone