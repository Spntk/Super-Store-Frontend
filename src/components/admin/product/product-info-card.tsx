'use client'

import { CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import ProductImageUpload, { ImageFile } from "./product-image-upload"

interface Category {
    id: number
    name: string
    status: string
}

interface ProductInfoCardProps {
    title: string
    description: string
    categories: Category[]
    categoryId: string
    price: number
    stock: number
    status: string
    onChange: (field: string, value: string) => void
    onImagesChange: (imges: ImageFile[]) => void
}

const ProductInfoCard = ({title, description,categories,  categoryId, price, stock, status, onChange, onImagesChange}: ProductInfoCardProps) => {

  return (
        <CardContent className="flex flex-col gap-3 pt-6">
            <div className="flex flex-col gap-3">
                <Label>Title</Label>
                <Input id="title" value={title} onChange={(e) => onChange("title", e.target.value)} placeholder="Enter title name" required />
            </div>
            <div className="flex flex-col gap-3">
                <Label>Description</Label>
                <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => onChange("description", e.target.value)}
                    placeholder="Add description about this product..."
                />
            </div>
            <div className="flex flex-col gap-3">
                <Label>Category</Label>
                    <Select value={categoryId} onValueChange={(val) => onChange("categoryId", val.toUpperCase())} >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((cate) => (
                                <SelectItem key={cate.id} value={String(cate.id)}>
                                    {cate.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
            </div>
            <div className="flex flex-col gap-3">
                <ProductImageUpload onChange={onImagesChange} />
            </div>
            <div className="flex flex-col gap-3">
                <Label>Status</Label>
                    <Select value={status.toLocaleLowerCase()} onValueChange={(val) => onChange("status", val.toUpperCase())} >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="active">ACTIVE</SelectItem>
                            <SelectItem value="inactive">INACTIVE</SelectItem>
                        </SelectContent>
                    </Select>
            </div>
            <div className="flex flex-col gap-3">
                <Label>Price</Label>
                <Input id="price" value={price} onChange={(e) => onChange("price", e.target.value)} placeholder="Enter number of price" required />
            </div>
            <div className="flex flex-col gap-3">
                <Label>Stock</Label>
                <Input id="stock" value={stock} onChange={(e) => onChange("stock", e.target.value)} placeholder="Enter number of stock" required />
            </div>
        </CardContent>
  )
}
export default ProductInfoCard