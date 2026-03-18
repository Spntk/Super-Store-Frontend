import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { MapPin } from "lucide-react"

interface CustomerAddressCardProps {
    address: string
    district: string
    subdistrict: string
    province: string
    zipCode: string
    notes?: string
    onChange: (field: string, value: string) => void
    showNotes?: boolean
}


const CustomerAddressCard = ({ address, district, subdistrict, province, zipCode, notes="", onChange, showNotes= true }: CustomerAddressCardProps) => {
  return (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
                <MapPin className="h-4 w-4 text-primary" />
                Shipping Address
            </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
            <Label>Address</Label>
            <Input
                id="address"
                value={address}
                onChange={(e) => onChange("address", e.target.value)}
                placeholder="Street / House no."
            />
            </div>
            <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-2">
                <Label>District</Label>
                <Input
                id="district"
                value={district}
                onChange={(e) => onChange("district", e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label>Subdistrict</Label>
                <Input
                id="subdistrict"
                value={subdistrict}
                onChange={(e) => onChange("subdistrict", e.target.value)}
                />
            </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-2">
                <Label>Province</Label>
                <Input
                id="province"
                value={province}
                onChange={(e) => onChange("province", e.target.value)}
                />
            </div>
            <div className="flex flex-col gap-2">
                <Label>ZIP Code</Label>
                <Input
                id="zip"
                maxLength={5}
                value={zipCode}
                onChange={(e) => onChange("zipCode", e.target.value)}
                />
            </div>
            </div>
            {showNotes && (
            <>
                <Separator />
                <div className="flex flex-col gap-2">
                <Label>Internal Notes</Label>
                <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => onChange("notes", e.target.value)}
                    placeholder="Add notes about this customer..."
                />
                </div>
            </>
            )}
        </CardContent>
    </Card>
  )
}
export default CustomerAddressCard