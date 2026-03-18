'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LayersPlus, Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ProductTable = () => {

    const [statusTab, setStatusTab] = useState("all");

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
                    <Input placeholder="Search products..." className="w-full pl-9 sm:w-64" />
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
                </Table>
            </div>
        </CardContent>
    </Card>
  )
}
export default ProductTable