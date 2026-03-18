'use client'

import Modal from "@/components/shared/modal"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import api from "@/lib/axios"
import axios from "axios"
import { LayersPlus, Loader2, Save } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

interface CategoryModallProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSuccess: () => void
    categoryId?: number
    initialData?: {
        name: string
        status: string
    }
}



const CategoryModal = ({ open, onOpenChange, onSuccess, categoryId, initialData }: CategoryModallProps) => {

    const isEditMode = !!categoryId
    const [isLoading, setIsLoading] = useState(false)
    const [formdata, setFormData] = useState({name: "", status: "ACTIVE"})

    useEffect(() => {
        if (open && isEditMode && initialData) {
            setFormData({ name: initialData.name ?? "", status: initialData.status ?? "ACTIVE" })
        }
        if (!open) {
            setFormData({ name: "", status: "ACTIVE" })
        }
    } ,[open, initialData])

    const handleSubmit = async () => {
        if (!formdata.name.trim()) {
            toast.error("Category name is required")
            return
        }
        setIsLoading(true)
        try {
            if (isEditMode) {
                await api.put(`/category/${categoryId}`, formdata)
                toast.success("Category updated successful")
            } else {
                await api.post("/category", formdata)
                toast.success("Category created successful")
            }
            onSuccess()
            onOpenChange(false)
        } catch (error: unknown) {
            if (axios.isAxiosError(error)){
                toast.error(error.response?.data.message || "Failed to create category")
            } else {
                toast.error("An unexpected error occurred")
            }
        } finally {
            setIsLoading(false)
        }
    }

  return (
    <Modal open={open} onOpenChange={onOpenChange} title={isEditMode ? "Edit Category" : "Add Category"} description={isEditMode ? `Editing "${initialData?.name}"` : "Create a new product category."}>
        <div className="flex flex-col gap-4 py-2">
            <div className="flex flex-col gap-2">
                <Label>Category Name</Label>
                <Input id="category-name" placeholder="e.g. Electronics" value={formdata.name} onChange={(e) => setFormData({...formdata, name: e.target.value})} onKeyDown={(e) => e.key === "Enter" && handleSubmit()} />
            </div>
            <div className="flex flex-col gap-2">
                <Label>Status</Label>
                <Select value={formdata.status.toLowerCase()} onValueChange={(val) => setFormData({ ...formdata, status: val.toUpperCase() })}>
                    <SelectTrigger>
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="active">ACTIVE</SelectItem>
                        <SelectItem value="inactive">INACTIVE</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading} className="cursor-pointer">
            Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={isLoading} className="cursor-pointer">
            {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
            ) : isEditMode ? (
                <span className="flex items-center gap-1"><Save className="h-4 w-4" />Save</span>
            ) : (
                <span className="flex items-center gap-1"><LayersPlus className="h-4 w-4" />Create</span>
            )}
            </Button>
        </div>
    </Modal>
  )
}
export default CategoryModal