'use client'

import ProductHeaderForm from "@/components/admin/product/product-header-form"
import { ExistingImage, ImageFile } from "@/components/admin/product/product-image-upload"
import ProductInfoCard from "@/components/admin/product/product-info-card"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import api from "@/lib/axios"
import { useProductForm } from "@/lib/use-product-form"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

interface Category {
    id: number
    name: string
    status: string
}

const EditProductPage = () => {

    const param = useParams()

    const id = param.id

    const router = useRouter()
    const [isSaving, setIsSaving] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [categories, setCategories] = useState<Category[]>([])
    const [images, setImages] = useState<ImageFile[]>([])
    const [initialImages, setInitialImages] = useState<ExistingImage[]>([])
    const { formData, handleChange, setFormData } = useProductForm()
    const [deletedImageIds, setDeletedImageIds] = useState<number[]>([])
    const [mainExistingId, setMainExistingId] = useState<number | null>(null)
    
    const [categoryName, setCategoryName] = useState("");

    useEffect(() => {
        const fetchProduct = async () => {
            setIsLoading(true)
            try {
                const response = await api.get(`products/${id}`)
                const data = response.data
                setCategoryName(data.categoryName || "")
                setInitialImages(data.image || [])
                const mainImg = data.image?.find((img: ExistingImage) => img.isPrimary)
                if (mainImg) setMainExistingId(mainImg.id)
                setFormData({
                    title: data.title || "",
                    description: data.description || "",
                    price: data.price || 0,
                    stock: data.stock || 0,
                    status: data.status || "ACTIVE",
                    categoryId: String(data.categoryId) || "",
                })
            } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                    toast.error(error.response?.data.message || "Unexpected issues on the API provider's server")
                } else {
                    toast.error("An unexpected error occurred")
                }
            } finally {
                setIsLoading(false)
            }
        }

        api.get("/category").then((res) => {
            setCategories(res.data.filter((c: Category) => c.status === "ACTIVE"))
        })

        if (id) fetchProduct()
    }, [id, router, setFormData])

    const handleSave = async () => {
        setIsSaving(true)
        try {
            const formDataToSend = new FormData()

            formDataToSend.append("productModel", new Blob([JSON.stringify({
                title: formData.title,
                description: formData.description,
                price: Number(formData.price),
                stock: Number(formData.stock),
                status: formData.status,
                category: { id: Number(formData.categoryId) },
                deletedImageIds: deletedImageIds,
                mainImageId: mainExistingId,
            })], { type: "application/json" }))

            const sorted = [...images].sort((a, b) => (b.isMain ? 1 : 0) - (a.isMain ? 1 : 0))
            sorted.forEach((img) => {
                formDataToSend.append("images", img.file)
            })

            await api.put(`/products/${id}`, formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" }
            })

            router.push("/admin/products")
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data.message || "Unexpected error")
            } else {
                toast.error("An unexpected error occurred")
            }
        } finally {
            setIsSaving(false)
        }
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
                    <ProductInfoCard title={formData.title} description={formData.description} categoryId={formData.categoryId} categories={categories} onImagesChange={(imgs) => setImages(imgs)} status={formData.status} price={formData.price} stock={formData.stock} onChange={handleChange} initialImages={initialImages} onDeleteImage={(id) => setDeletedImageIds(prev => [...prev, id])} onExistingMainChange={(id) => setMainExistingId(id)}  />
                </CardHeader>
            </Card>
        </main>
    </div>
  )
}
export default EditProductPage