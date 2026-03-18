'use client'

import ProductHeaderForm from "@/components/admin/product/product-header-form"
import ProductInfoCard from "@/components/admin/product/product-info-card"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import api from "@/lib/axios"
import { useProductForm } from "@/lib/use-product-form"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface Category {
    id: number
    name: string
    status: string
}

const CreateNewProductPage = () => {

    const router = useRouter()
    const [isSaving, setIsSaving] = useState(false)
    const [categories, setCategories] = useState<Category[]>([])
    const { formData, handleChange } = useProductForm()

    useEffect(() => {
        api.get("/category").then((res) => {
            setCategories(res.data.filter((c: Category) => c.status === "ACTIVE"))
        })
    }, [])

    const categoryName = categories.find((c) => String(c.id) === formData.categoryId)?.name ?? ""

    const handleSave = async () => {
        
    }
  return (
    <div className="min-h-screen bg-background">
        <ProductHeaderForm title={formData.title} categoryName={categoryName} status={formData.status} isSaving={isSaving} onSave={handleSave} />

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:py-8">
            <Card>
                <CardHeader>
                    <CardTitle>Create New Product</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">
                            Fill in the details below to add a new product.
                        </p>
                    <ProductInfoCard title={formData.title} description={formData.description} categoryId={formData.categoryId} categories={categories} onImagesChange={(imgs) => console.log(imgs)} status={formData.status} price={formData.price} stock={formData.stock} onChange={handleChange} />
                </CardHeader>
            </Card>
        </main>
    </div>
  )
}
export default CreateNewProductPage