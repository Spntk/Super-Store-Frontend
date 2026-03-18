'use client'
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { ImagePlus, Plus, Star, Trash2 } from "lucide-react"
import Image from "next/image"
import { useRef, useState } from "react"

export interface ImageFile {
    file: File
    previewUrl: string
    isMain: boolean
}

interface ProductImageUploadProps {
  onChange: (images: ImageFile[]) => void
}


const ProductImageUpload = ({ onChange }: ProductImageUploadProps) => {

  const [images, setImages] = useState<ImageFile[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const triggerFileInput = () => fileInputRef.current?.click()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    const newImages: ImageFile[] = files.map((file, i) => ({
      file,
      previewUrl: URL.createObjectURL(file),
      isMain: images.length === 0 && i === 0,
    }))

    const updated = [...images, ...newImages]
    setImages(updated)
    onChange(updated)

    e.target.value = ""
  }

  const handleSetMain = (index: number) => {
    const updated = images.map((img, i) => ({ ...img, isMain: i === index }))
    setImages(updated)
    onChange(updated)
  }

  const handleRemove = (index: number) => {
    URL.revokeObjectURL(images[index].previewUrl)
    const updated = images.filter((_, i) => i !== index)

    if (images[index].isMain && updated.length > 0) {
      updated[0].isMain = true
    }
    setImages(updated)
    onChange(updated)
  }

  return (
    <div className="flex flex-col gap-3">
      <Label>
        Product Images <span className="text-red-500">*</span>
      </Label>
      {images.length === 0 ? (
        <div onClick={triggerFileInput} className="border-2 border-dashed rounded-lg p-20 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-muted/50 transition-colors">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <ImagePlus className="text-primary w-6 h-6" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-foreground">Click to upload images</p>
            <p className="text-xs text-foreground">PNG, JPG, WEBP up to 10MB</p>
          </div>
          <Button type="button" variant="secondary" size="sm" className="cursor-pointer">
            Browse File
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {images.map((img, index) => (
            <div key={index} className={cn("relative aspect-square group border rounded-lg overflow-hidden", img.isMain && "ring-2 ring-primary")}>
              <Image src={img.previewUrl} alt={`Product Image ${index + 1}`} fill className="object-cover" />
              {img.isMain && (
                <div className="absolute top-1 left-1 bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded">
                  Main
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button type="button" onClick={() => handleSetMain(index)} className="h-6 w-6 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors">
                  <Star size={12} className={cn(img.isMain ? "fill-yellow-400" : "text-gray-600")} />
                </button>
                <button type="button" onClick={() => handleRemove(index)} className="h-6 w-6 rounded-full bg-white/90 flex items-center justify-center hover:bg-red-100 transition-colors">
                  <Trash2 size={12} className="text-red-500" />
                </button>
              </div>
            </div>
          ))}

          <div onClick={triggerFileInput} className="aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-1 cursor-pointer hover:bg-muted/50 transition-colors text-muted-foreground">
            <Plus size={20} />
            <span className="text-xs">Add</span>
          </div>
        </div>
      )}
      <input ref={fileInputRef} type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} />
    </div>
  )
}
export default ProductImageUpload