'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import api from "@/lib/axios";
import axios from "axios";
import { LayersPlus, Loader2, Pencil, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Product {
    id: number
    title: string
    imageUrl: string
    price: number
    status: string
    stock: string
    categoryName: string
}

const ProductTable = () => {

    const [search, setSearch] = useState("")
    const [statusTab, setStatusTab] = useState("all");
    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState(false);

    const fetchProducts = async () => {
        setIsLoading(true)
        try {
            const response = await api.get("/products")
            setProducts(response.data)
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
        fetchProducts()
    }, [])

    const filterProducts = products.filter(product => {

        const matchesSearch =
            product.title.toLowerCase().includes(search.toLowerCase()) || product.categoryName.toLowerCase().includes(search.toLowerCase())
        const matchesStatus = statusTab === 'all' || product.status === statusTab.toLocaleUpperCase()

        return matchesSearch && matchesStatus;
    }) .sort((a,b) => a.id - b.id)

  return (
    <Card>
        <CardHeader>
            <div className="flex gap-4 flex-row items-center justify-between">
                <CardTitle className="text-lg">Products</CardTitle>
                <Button className="cursor-pointer transition-colors hover:bg-green-800" asChild>
                    <Link href="/admin/products/new">
                        <LayersPlus /> Add Product
                    </Link>
                </Button>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <Tabs defaultValue="all" value={statusTab} onValueChange={setStatusTab} >
                    <TabsList className="grid w-full grid-cols-3 sm:grid sm:grid-cols-3 sm:w-64">
                        <TabsTrigger value="all" className="cursor-pointer text-[12px] sm:text-sm">
                            All {statusTab === "all" && (
                                <span className="opacity-50"></span>
                            )}
                        </TabsTrigger>
                        <TabsTrigger value="active" className="cursor-pointer text-[12px] sm:text-sm">
                            Active {statusTab === "active" && (
                                <span className="opacity-50"></span>
                            )}
                        </TabsTrigger>
                        <TabsTrigger value="inactive" className="cursor-pointer text-[12px] sm:text-sm">
                            Inactive {statusTab === "inactive" && (
                                <span className="opacity-50"></span>
                            )}
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 sm:w-64" />
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <div className="hidden overflow-x-auto md:block">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Product Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Price</TableHead>
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
                                            Loading Products...
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filterProducts.length > 0 ? (
                                    filterProducts.map((product) => (
                                        <TableRow key={product.id} className="hover:bg-muted/30 transition-colors ">
                                            <TableCell className="text-xs text-muted-foreground">
                                                #{product.id}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Image 
                                                        alt={product.title} 
                                                        src={product.imageUrl} 
                                                        width={40} 
                                                        height={40} 
                                                        className="rounded-md object-cover aspect-square" 
                                                    />
                                                    <span className="font-medium text-foreground">{product.title}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-foreground">{product.categoryName}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="inline-flex items-center rounded-full bg-primary/10 mx-2.5 px-2.5 py-0.5 text-xs font-medium text-primary">
                                                    {product.stock}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-foreground">฿ {product.price.toLocaleString()}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {product.status === "ACTIVE" && <p className="text-green-700">Active</p>}
                                                {product.status === "INACTIVE" && <p className="text-gray-700">Inactive</p>}
                                                {product.status === "SUSPENDED" && <p className="text-red-700">Suspend</p>}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button size="icon" variant="outline" asChild>
                                                    <Link href={`/admin/products/edit/${product.id}`}>
                                                        <Pencil/>
                                                    </Link>
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
        </CardContent>
    </Card>
  )
}
export default ProductTable