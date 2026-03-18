'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import api from "@/lib/axios"
import { Loader2, MoreHorizontal, Pencil, RotateCcw, Search, Trash2, UserRoundPlus } from "lucide-react"
import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import DeleteAdminCustomers from "./customer-delete-modal"
import RestoreAdminCustomers from "./customer-restore-modal"

interface User {
    id: number
    name: string
    email: string
    orderCount: number
    createdAt: string
    tel: string
    status: string
}

const AdminCustomers = () => {

    const [search, setSearch] = useState("")
    const [users, setUsers] = useState<User[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const [statusTab, setStatusTab] = useState("all");

    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [isRestoreOpen, setIsRestoreOpen] = useState(false)

    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [isActionLoading, setIsActionLoading] = useState(false)


    const fetchUsers = async () => {
        setIsLoading(true)
        try {
            const response = await api.get("/users")
            setUsers(response.data)
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

    const handleRestore = async() => {
        if (!selectedUser) return

        setIsActionLoading(true)
        try {
            await api.put("/users/status", {
                id: selectedUser.id,
                status: "ACTIVE"
            })

            fetchUsers()

            toast.success(`${selectedUser.name} has been restore!`)
            setIsRestoreOpen(false)
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data.message || "Failed to restore customer"
                toast.error(message)
            }
        } finally {
            setIsActionLoading(false)
            setSelectedUser(null)
        }
    }

    const handleDelete = async () => {
        if (!selectedUser) return

        setIsActionLoading(true)
        try {
            await api.put("/users/status", {
                id: selectedUser.id,
                status: "INACTIVE"
            })

            fetchUsers()

            toast.success(`${selectedUser.name} has been delete!`)
            setIsDeleteOpen(false)
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const message = error.response?.data.message || "Failed to delete customer"
                toast.error(message)
            }
        } finally {
            setIsActionLoading(false)
            setSelectedUser(null)
        }
    }

    const filterUsers = users.filter(user => {

        const matchesSearch =
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())

        const matchesStatus = statusTab === 'all' || user.status === statusTab.toLocaleUpperCase()

        return matchesSearch && matchesStatus;
    }) .sort((a,b) => a.id - b.id)

    const counts = {
        all: users.length,
        active: users.filter(u => u.status === "ACTIVE").length,
        inactive: users.filter(u => u.status === "INACTIVE").length,
        suspended: users.filter(u => u.status === "SUSPENDED").length,
    }

  return (
    <div className="flex flex-col gap-6">
        <Card>
            <CardHeader>
                <div className="flex gap-4 flex-row items-center justify-between">
                    <CardTitle className="text-lg">Customer</CardTitle>
                    <Button className="cursor-pointer transition-colors hover:bg-green-800" asChild>
                        <Link href="/admin/customers/new">
                        <UserRoundPlus /> Add Customer
                        </Link>
                    </Button>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Tabs defaultValue="all" value={statusTab} onValueChange={setStatusTab} >
                        <TabsList className="grid w-full grid-cols-4 sm:grid sm:grid-cols-4 sm:w-84">
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
                            <TabsTrigger value="suspended" className="cursor-pointer text-[12px] sm:text-sm">
                                Suspend {statusTab === "suspended" && (
                                    <span className="opacity-50">({counts.suspended})</span>
                                )}
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input placeholder="Search customers..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 sm:w-64" />
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
                                <TableHead>Customer</TableHead>
                                <TableHead>Orders</TableHead>
                                <TableHead>Joined</TableHead>
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
                                filterUsers.length > 0 ? (
                                    filterUsers.map((user) => (
                                        <TableRow key={user.id} className="hover:bg-muted/30 transition-colors ">
                                            <TableCell className="text-xs text-muted-foreground">
                                                #{user.id}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-foreground">{user.name}</span>
                                                    <span className="text-xs text-muted-foreground">{user.email}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <span className="inline-flex items-center rounded-full bg-primary/10 mx-2.5 px-2.5 py-0.5 text-xs font-medium text-primary">
                                                    0
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {new Date(user.createdAt).toLocaleDateString('th-TH')}
                                            </TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {user.status === "ACTIVE" && <p className="text-green-700">Active</p>}
                                                {user.status === "INACTIVE" && <p className="text-gray-700">Inactive</p>}
                                                {user.status === "SUSPENDED" && <p className="text-red-700">Suspend</p>}
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Button size="icon" variant="outline" asChild>
                                                    <Link href={`/admin/customers/edit/${user.id}`}>
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

                {/* Mobile Table */}
                <div className="flex flex-col gap-3 md:hidden">
                    {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-10 text-muted-foreground">
                        <Loader2 className="h-8 w-8 animate-spin mb-2" />
                        <p>Loading customers...</p>
                    </div>
                    ) : filterUsers.length > 0 ? (
                    filterUsers.map((user) => (
                        <div key={user.id} className="flex items-center gap-3 rounded-lg border border-border p-4">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                            {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                            <p className="truncate text-sm font-medium text-foreground">{user.name}</p>
                            <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                            <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                            <span>0 orders</span>
                                {user.status === "ACTIVE" && <p className="text-green-700">Active</p>}
                                {user.status === "INACTIVE" && <p className="text-gray-700">Inactive</p>}
                                {user.status === "SUSPENDED" && <p className="text-red-700">Suspend</p>}
                            </div>
                            <span className="font-medium text-foreground text-xs">
                                {new Date(user.createdAt).toLocaleDateString('th-TH')}
                            </span>
                        </div>

                        <Button variant="outline" size="icon" className="h-8 w-8 cursor-pointer" asChild>
                            <Link href={`/admin/customers/edit/${user.id}`}>
                                <Pencil className="h-4 w-4" />
                            </Link>
                        </Button>
                        </div>
                    ))
                    ) : (
                    <div className="py-10 text-center text-sm text-muted-foreground border border-dashed rounded-lg">
                        No customers found matching your search.
                    </div>
                    )}
                </div>
            </CardContent>
        </Card>



        <DeleteAdminCustomers open={isDeleteOpen} onOpenChange={setIsDeleteOpen} userNamme={selectedUser?.name} onConfirm={handleDelete} isLoading={isActionLoading} />
        <RestoreAdminCustomers open={isRestoreOpen} onOpenChange={setIsRestoreOpen} userNamme={selectedUser?.name} onConfirm={handleRestore} isLoading={isActionLoading} />
    </div>
  )
}
export default AdminCustomers