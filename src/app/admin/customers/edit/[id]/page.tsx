'use client'

import CustomerAddressCard from "@/components/admin/customer/customer-address-card"
import CustomerDangerZone from "@/components/admin/customer/customer-danger-zone"
import CustomerHeaderForm from "@/components/admin/customer/customer-header-form"
import CustomerInfoCard from "@/components/admin/customer/customer-info-card"
import RestoreAdminCustomers from "@/components/admin/customer/customer-restore-modal"
import CustomerStatsCard from "@/components/admin/customer/customer-stats-card"
import SuspendedAdmunCustomers from "@/components/admin/customer/customer-suspend-modal"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import api from "@/lib/axios"
import { useCustomerForm } from "@/lib/use-customer-form"
import axios from "axios"
import { Loader2 } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

const EditCutomerPage = () => {

    const param = useParams()
    const router = useRouter()
    const id = param.id

    const [isOpenSuspend, setIsOpenSuspend] = useState(false)
    const [isOpenActive, setIsOpenActive] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [isSaving, setIsSaving] = useState(false)

    const { formData, setFormData, handleChange } = useCustomerForm()

    useEffect(() => {
        const fetchCustomer = async () => {
            setIsLoading(true)
            try {
                const response = await api.get(`/users/${id}`)
                const data = response.data
                setFormData({
                    name: data.name || "",
                    email: data.email || "",
                    tel: data.tel || "",
                    status: data.status || "ACTIVE",
                    role: data.role || "",
                    address:  data.address || "", 
                    district: data.district || "",
                    subdistrict: data.subdistrict || "",
                    province: data.province || "",
                    zipCode: data.zipCode || "",
                    notes: data.notes || "",
                })
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || "Unexpected issues on the API provider's server";
                toast.error(message);
            } else {
                toast.error("An unexpected error occurred");
            }
            } finally {
                setIsLoading(false)
            }
        }
        if (id) fetchCustomer()
    },[id, router, setFormData])

    const handleSave = async () => {
        setIsSaving(true)
        try {
            await api.put(`/users/${id}`, {
                id: id,
                ...formData
            })
            toast.success("Updated Successful")
            router.refresh()
        } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || "Unexpected issues on the API provider's server";
                toast.error(message);
            } else {
                toast.error("An unexpected error occurred");
            }
        } finally {
            setIsSaving(false)
        }
    }

    const handleSuspend = async () => {
        try {
            await api.put(`/users/${id}`, {
                id: id,
                ...formData,
                status: "SUSPENDED"
            })
            setFormData((prev) => ({ ...prev, status: "SUSPENDED"}))
            setIsOpenSuspend(false)
            toast.success("Updated Successful")
        } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || "Unexpected issues on the API provider's server";
                toast.error(message);
            } else {
                toast.error("An unexpected error occurred");
            }
        } finally {
            setIsSaving(false)
        }
    }

    const handleActive = async () => {
        try {
            await api.put(`/users/${id}`, {
                id: id,
                ...formData,
                status: "ACTIVE"
            })
            setFormData((prev) => ({ ...prev, status: "ACTIVE"}))
            setIsOpenActive(false)
            toast.success("Updated Successful")
        } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || "Unexpected issues on the API provider's server";
                toast.error(message);
            } else {
                toast.error("An unexpected error occurred");
            }
        } finally {
            setIsSaving(false)
        }
    }

    if (isLoading) return <div className="flex h-screen items-center justify-center"><Loader2  className="animate-spin"/></div>
    

  return (
    <div className="min-h-screen bg-background">
        <CustomerHeaderForm name={formData.name} email={formData.email} status={formData.status} isSaving={isSaving} onSave={handleSave} />

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
            <CustomerStatsCard />

            <Tabs defaultValue="details" className="flex flex-col gap-6">
                <TabsList className="w-full justify-start bg-muted/50">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="details">
                    <div className="grid gap-6 lg:grid-cols-2">
                        <CustomerInfoCard name={formData.name} email={formData.email} tel={formData.tel} status={formData.status} onChange={handleChange} />

                        <CustomerAddressCard address={formData.address} district={formData.district} subdistrict={formData.subdistrict} province={formData.province} zipCode={formData.zipCode} notes={formData.notes} onChange={handleChange} />
                    </div>
                </TabsContent>

                <TabsContent value="settings">
                    <CustomerDangerZone status={formData.status} role={formData.role} onRoleChange={(val) => handleChange("role", val)} onSuspendClick={() => setIsOpenSuspend(true)} onRestoreClick={() => setIsOpenActive(true)} />
                </TabsContent>
            </Tabs>
        </main>

        <SuspendedAdmunCustomers open={isOpenSuspend} onOpenChange={setIsOpenSuspend} userNamme={formData.name} onConfirm={handleSuspend} isLoading={isLoading} />
        <RestoreAdminCustomers open={isOpenActive} onOpenChange={setIsOpenActive} userNamme={formData.name} onConfirm={handleActive} isLoading={isLoading} />

    </div>
  )
}
export default EditCutomerPage