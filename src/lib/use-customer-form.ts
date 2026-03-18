import { useState } from "react"

export interface CustomerFormData {
    name: string
    email: string
    tel: string
    status: string
    role: string
    address: string
    district: string
    subdistrict: string
    province: string
    zipCode: string
    notes: string
}

export const defaultCustomerForm: CustomerFormData = {
    name: "",
    email: "",
    tel: "",
    status: "ACTIVE",
    role: "CUSTOMER",
    address: "",
    district: "",
    subdistrict: "",
    province: "",
    zipCode: "",
    notes: "",
}

export const useCustomerForm = (initial: Partial<CustomerFormData> = {}) => {
    const [formData, setFormData] = useState<CustomerFormData>({
        ...defaultCustomerForm,
        ...initial
    })

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const resetForm = () => {
        setFormData({ ...defaultCustomerForm, ...initial })
    }

    return { formData, setFormData, handleChange, resetForm }
}