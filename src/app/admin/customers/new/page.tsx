'use client'

import CustomerAddressCard from "@/components/admin/customer/customer-address-card"
import CustomerHeaderForm from "@/components/admin/customer/customer-header-form"
import CustomerInfoCard from "@/components/admin/customer/customer-info-card"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import api from "@/lib/axios"
import { useCustomerForm } from "@/lib/use-customer-form"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

const CreateNewCustomerPage = () => {

    const router = useRouter()
    const [isSaving, setIsSaving] = useState(false)
    const { formData, handleChange } = useCustomerForm()

    const handleSave = async () => {

        if (!formData.name.trim()) {
            toast.error("Name is required")
            return
        }
        if (!formData.email.trim()) {
            toast.error("Email is required")
            return
        }

        setIsSaving(true)
        try {
            await api.post("/users", formData)
            toast.success("Customer created successful")
            router.push("/admin/customers")
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message || "Unexpected issues on the API provider's server" )
            } else {
                toast.error("An unexpected error occurred")
            }
        } finally {
            setIsSaving(false)
        }
    }


  return (
    <div className="min-h-screen bg-background">
        <CustomerHeaderForm name={formData.name} email={formData.email} status={formData.status} isSaving={isSaving} onSave={handleSave} />

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
            <Card>
                <CardHeader>
                    <CardTitle>Create New Customer</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            Fill in the details below to add a new customer account.
                        </p>
                </CardHeader>
            </Card>


            <div className="grid gap-6 lg:grid-cols-2 mt-4">
                <CustomerInfoCard name={formData.name} email={formData.email} tel={formData.tel} status={formData.status} onChange={handleChange} />

                <CustomerAddressCard address={formData.address} district={formData.district} subdistrict={formData.subdistrict} province={formData.province} zipCode={formData.zipCode} notes={formData.notes} onChange={handleChange} />
            </div>
        </main>
    </div>
  )
}
export default CreateNewCustomerPage