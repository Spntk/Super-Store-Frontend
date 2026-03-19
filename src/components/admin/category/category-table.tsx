'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import api from "@/lib/axios"
import axios from "axios"
import { LayersPlus, Loader2, MoreHorizontal, Pencil, RotateCcw, Search, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import CategoryModal from "./category-modal"

interface Category {
    id: number
    name: string
    status: string
    createdAt: string
    productCount: number
}

const CategoryTable = () => {

    const [search, setSearch] = useState("")
    const [category, setCategory] = useState<Category[]>([])
    const [isLoading, setIsLoading] = useState(true)
    
    const [statusTab, setStatusTab] = useState("all");
    const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

        const fetchUsers = async () => {
        setIsLoading(true)
        try {
            const response = await api.get("/category")
            setCategory(response.data)
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message || "Failed to fetch customers"
                toast.error(message)
            }
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const filterCategory = category.filter(user => {
        const matchesSearch =
            user.name.toLowerCase().includes(search.toLowerCase())

        const matchesStatus = statusTab === 'all' || user.status === statusTab.toLocaleUpperCase()

        return matchesSearch && matchesStatus;
    }) .sort((a,b) => a.id - b.id)

    const counts = {
        all: category.length,
        active: category.filter(u => u.status === "ACTIVE").length,
        inactive: category.filter(u => u.status === "INACTIVE").length,
    }
  return (
    <Card>
        <CardHeader>
            <div className="flex gap-4 flex-row items-center justify-between">
                <CardTitle className="text-lg">Categories</CardTitle>
                <Button className="cursor-pointer transition-colors hover:bg-green-800" onClick={() => {setSelectedCategory(null); setIsCategoryModalOpen(true)}}>
                    <LayersPlus /> Add Category
                </Button>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <Tabs defaultValue="all" value={statusTab} onValueChange={setStatusTab} >
                    <TabsList className="grid w-full grid-cols-3 sm:grid sm:grid-cols-3 sm:w-64">
                        <TabsTrigger value="all" className="cursor-pointer text-[12px] sm:text-sm">
                            All {statusTab === "all" && (
                                <span className="opacity-50">({counts.all})</span>
                            )}
                        </TabsTrigger>
                        <TabsTrigger value="active" className="cursor-pointer text-[12px] sm:text-sm">
                            Active {statusTab === "active" && (
                                <span className="opacity-50">({counts.active})</span>
                            )}
                        </TabsTrigger>
                        <TabsTrigger value="inactive" className="cursor-pointer text-[12px] sm:text-sm">
                            Inactive {statusTab === "inactive" && (
                                <span className="opacity-50">({counts.inactive})</span>
                            )}
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search Categories..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 sm:w-64" />
                </div>
            </div>
        </CardHeader>
        <CardContent>

                { /* Desktop Table */ }
                <div className="hidden overflow-x-auto md:block">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Category Name</TableHead>
                                <TableHead>Product</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow>
                                    <TableCell colSpan={5} className="h-40 text-center">
                                        <div className="flex items-center justify-center gap-2 text-muted-foreground">
                                            <Loader2 className="h-5 w-5 animate-spin" />
                                            Loading customers...
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filterCategory.length > 0 ? (
                                    filterCategory.map((category) => (
                                        <TableRow key={category.id} className="hover:bg-muted/30 transition-colors ">
                                            <TableCell className="text-xs text-muted-foreground">
                                                #{category.id}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-foreground">{category.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                <span className="inline-flex items-center rounded-full bg-primary/10 mx-2.5 px-2.5 py-0.5 text-xs font-medium text-primary">
                                                    <p>{category.productCount}</p>
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {new Date(category.createdAt).toLocaleDateString('th-TH')}
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {category.status === "ACTIVE" && <p className="text-green-700">Active</p>}
                                                {category.status === "INACTIVE" && <p className="text-red-700">Inactive</p>}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button size="icon" variant="outline" className="cursor-pointer" onClick={() => {setSelectedCategory(category); setIsCategoryModalOpen(true)}} asChild>
                                                    <span>
                                                        <Pencil/>
                                                    </span>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                                            No customers found matching your search.
                                        </TableCell>
                                    </TableRow>
                                )
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Mobile Table */}
                <div className="flex flex-col gap-3 md:hidden">
                    {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                        <Loader2 className="h-8 w-8 animate-spin mb-2" />
                        <p>Loading customers...</p>
                    </div>
                    ) : filterCategory.length > 0 ? (
                    filterCategory.map((category) => (
                        <div key={category.id} className="flex items-center gap-3 rounded-lg border border-border p-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                            {category.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                            <p className="truncate text-sm font-medium text-foreground">{category.name}</p>
                            <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                            <span>0 products</span>
                                {category.status === "ACTIVE" && <p className="text-green-700">Active</p>}
                                {category.status === "INACTIVE" && <p className="text-gray-700">Inactive</p>}
                            </div>
                            <span className="font-medium text-foreground text-xs">
                                {new Date(category.createdAt).toLocaleDateString('th-TH')}
                            </span>
                        </div>

                        <Button variant="outline" size="icon" className="h-8 w-8 cursor-pointer" onClick={() => {setSelectedCategory(category); setIsCategoryModalOpen(true)}}>
                                <Pencil className="h-4 w-4" />
                        </Button>
                        </div>
                    ))
                    ) : (
                    <div className="py-10 text-center text-sm text-muted-foreground border border-dashed rounded-lg">
                        No customers found matching your search.
                    </div>
                    )}
                </div>

                <CategoryModal open={isCategoryModalOpen} onOpenChange={setIsCategoryModalOpen} onSuccess={fetchUsers} categoryId={selectedCategory?.id} initialData={selectedCategory ?? undefined} />
            </CardContent>
    </Card>
  )
}
export default CategoryTable