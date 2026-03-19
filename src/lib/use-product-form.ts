import { useState } from "react"

export interface ProductFormData {
    title: string
    description: string
    categoryId: string
    price: number
    stock: number
    status: string
}

export const defaultProductForm: ProductFormData = {
    title: "",
    description: "",
    categoryId: "",
    price: 0,
    stock: 0,
    status: "ACTIVE",
}

export const useProductForm = (initial: Partial<ProductFormData> = {}) => {
    const [formData, setFormData] = useState<ProductFormData>({
        ...defaultProductForm,
        ...initial
    })

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }))
    }

    const resetForm = () => {
        setFormData({ ...defaultProductForm, ...initial })
    }

    return { formData, setFormData, handleChange, resetForm }
}