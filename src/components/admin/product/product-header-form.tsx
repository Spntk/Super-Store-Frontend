import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2, Save } from "lucide-react"
import Link from "next/link"

interface ProductHeaderFormProps {
    title: string
    categoryName: string
    status: string
    isSaving: boolean
    onSave: () => void
    backHref?: string
}

const ProductHeaderForm = ({ title, categoryName, status, isSaving, onSave, backHref = "/admin/products" }: ProductHeaderFormProps) => {
  return (
            <header className="sticky top-0 z-30 border-b border-border bg-card">
            <div className="mx-auto flex max-w-8xl items-center justify-between px-4 py-2.5 sm:px-6">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                        <Link href={backHref}>
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                            {title ? title.substring(0,2).toUpperCase() : "??"}
                        </div>
                        <div>
                            <h1 className="text-base font-bold text-foreground sm:text-lg">{title || "New Product"}</h1>
                            <p className="text-xs text-muted-foreground">{categoryName || "Category"}</p>
                        </div>
                        {status === "ACTIVE" && (
                            <Badge variant="outline" className="ml-2 hidden capitalize sm:inline-flex bg-primary/10 text-primary border-primary/20">
                                ACTIVE
                            </Badge>
                        )}
                        {status === "INACTIVE" && (
                            <Badge variant="outline" className="ml-2 hidden capitalize sm:inline-flex bg-gray/10 text-gray-500 border-primary/20">
                                INACTIVE
                            </Badge>
                        )}
                    </div>
                </div>
                <div className="flex items-center">
                    <Button size="default" className="transition-colors hover:bg-green-800" onClick={onSave} disabled={isSaving}>
                        {isSaving ? 
                            <Loader2 className="h-4 w-4 animate-spin"  /> : <Save className="h-4 w-4" />
                        }
                    </Button>
                </div>
            </div>
        </header>
  )
}
export default ProductHeaderForm