import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, User } from "lucide-react"

interface CustomerInfoCardProps {
    name: string
    email: string
    tel: string
    status: string
    onChange: (field: string, value: string) => void
}

const CustomerInfoCard = ({ name, email, tel, status, onChange }: CustomerInfoCardProps) => {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
                <User className="h-4 w-4 text-primary" />
                Personal Information
            </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <Label>Full Name</Label>
                <Input id="name" value={name} onChange={(e) => onChange("name", e.target.value)} placeholder="Enter full name" required />
            </div>
            <div className="flex flex-col gap-2">
                <Label>Email Address</Label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="email" value={email} onChange={(e) => onChange("email", e.target.value)} placeholder="email@example.com" className="pl-9" required />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <Label>Phone Number</Label>
                <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input id="tel" value={tel} onChange={(e) => onChange("tel", e.target.value)} placeholder="0123456789" maxLength={10} className="pl-9" />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <Label>Customer Status</Label>
                {status !== "SUSPENDED" ? (
                    <Select value={status.toLowerCase()} onValueChange={(val) => onChange("status", val.toUpperCase())} >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="active">ACTIVE</SelectItem>
                            <SelectItem value="inactive">INACTIVE</SelectItem>
                        </SelectContent>
                    </Select>
                ) : (
                    <p className="text-sm text-red-500">This account has been suspended</p>
                )}
            </div>
        </CardContent>
    </Card>
  )
}
export default CustomerInfoCard