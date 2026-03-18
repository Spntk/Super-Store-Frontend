'use client'

import { Handbag, LayoutDashboard, LogIn, LogOut, Menu, Monitor, Search, Settings, ShoppingCart, User, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { useAuth } from "@/lib/auth-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"

const navLinks = [
    {label: "Home", href: "/"},
    {label: "Products", href: "/products"},
    {label: "Categories", href: "/categories"},
    {label: "Deals", href: "/deals"},
]

const Navbar = () => {

    const {isAuthenticated, logout, user, isAdmin} = useAuth();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                    <Monitor className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold tracking-tight text-foreground">
                    Super Store
                </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-1 md:flex">
                {navLinks.map((link) => (
                    <Link key={link.label} href={link.href} className="rounded-md px-3 py-2 text-md font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
                        {link.label}
                    </Link>
                ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden items-center gap-2 md:flex">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search products..." className="w-56 pl-9 lg:w-64" />
                </div>
            
            {/* Authentication */}

            {isAuthenticated ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="cursor-pointer">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                        <div className="px-3 py-1.5">
                            <p className="text-sm font-medium text-foreground">{user?.name}</p>
                            <p className="text-xs text-muted-foreground">{user?.email}</p>
                        </div>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href="">
                            <User className="h-4 w-4" />
                            Profile
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href="">
                            <Handbag className="h-4 w-4" />
                            Orders
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                        <Link href="">
                            <Settings className="h-4 w-4" />
                            Setting
                        </Link>
                    </DropdownMenuItem>
                    {isAdmin && (
                        <div>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem asChild className="cursor-pointer">
                            <Link href="/admin">
                                <LayoutDashboard className="h-4 w-4" />
                                Admin Dashboard
                            </Link>
                        </DropdownMenuItem>
                        </div>
                    )}
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem asChild onClick={logout} className="text-destructive cursor-pointer hover:bg-red-500">
                        <Link href="">
                            <LogOut className="h-4 w-4" />
                            Sign out
                        </Link>
                    </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
            <Button variant="ghost" size="icon" aria-label="Sign in" asChild>
                <Link href="/auth/signin">
                    <User className="h-5 w-5" />
                </Link>
            </Button>
            )}

            <Button variant="ghost" size="icon" className="relative" asChild>
                <Link href="/cart">
                    <ShoppingCart className="h-5 w-5" />
                </Link>
            </Button>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center gap-2 md:hidden">
                <Button variant="ghost" size="icon" className="relative" asChild>
                    <Link href="">
                        <ShoppingCart className="h-5 w-5" />
                    </Link>
                </Button>
                <Sheet onOpenChange={setMobileMenuOpen} open={mobileMenuOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-72">
                        <SheetHeader>
                            <SheetTitle className="text-left">Menu</SheetTitle>
                        </SheetHeader>
                        <div className="mt-6 flex flex-col gap-1 px-3">
                            <div className="relative mb-4">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input placeholder="Search products..." className="pl-9" />
                            </div>
                        </div>
                        {navLinks.map((link) => (
                            <Link key={link.label} href={link.href} className="mx-3 px-3 py-1 rounded-md text-base font-medium text-foreground transition-colors hover:bg-accent">
                                {link.label}
                            </Link>
                        ))}
                        <div className="mt-4 border-t border-border pt-4 mx-3">
                            {isAuthenticated ? (
                                <div>
                                    <div className="flex flex-col gap-2 items-center justify-center">
                                        <div className="flex h-13 w-13 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                                            <h1 className="text-lg">{user?.name?.charAt(0).toUpperCase()}</h1>
                                        </div>
                                        <p className="px-3 text-md font-medium text-foreground">{user?.name}</p>
                                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                                    </div>

                                    <div className="flex flex-col gap-2 pt-3">
                                        <Link href="" className="flex items-center mx-3 px-3 py-1 rounded-md text-base font-medium text-foreground transition-colors hover:bg-accent">
                                                <User className="h-4 w-4 mr-2" /> Profile
                                        </Link>
                                        <Link href="" className="flex items-center mx-3 px-3 py-1 rounded-md text-base font-medium text-foreground transition-colors hover:bg-accent">
                                                <Handbag className="h-4 w-4 mr-2" /> Orders
                                        </Link>
                                        <Link href="" className="flex items-center mx-3 px-3 py-1 rounded-md text-base font-medium text-foreground transition-colors hover:bg-accent">
                                                <Settings className="h-4 w-4 mr-2" /> Setting
                                        </Link>
                                    </div>
                                    {isAdmin && (
                                        <div>
                                        <Link href="/admin" className="mt-2 flex items-center mx-3 px-3 py-1 rounded-md text-base font-medium text-foreground transition-colors hover:bg-accent">
                                                <LayoutDashboard className="h-4 w-4 mr-2" /> Admin
                                        </Link>
                                        </div>
                                    )}
                                    <div className="border-b border-border pt-4 mx-3" />
                                        <Button variant="destructive" className="w-full gap-2 mt-4 cursor-pointer" onClick={() => {logout(); setMobileMenuOpen(false)}}>
                                            Sign Out
                                        </Button>
                                </div>
                            ) : (
                                <div>
                                    <Button className="w-full gap-2 transition-colors hover:bg-green-800" asChild>
                                        <Link href="/auth/signin" onClick={() => setMobileMenuOpen(false)}>
                                            <LogIn className="h-4 w-4" />Sign In
                                        </Link>
                                    </Button>
                                    <Button variant="outline" className="mt-3 w-full gap-2" asChild>
                                        <Link href="/auth/signup" onClick={() => setMobileMenuOpen(false)}>
                                            <User className="h-4 w-4" />Sign Up
                                        </Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </SheetContent>

                </Sheet>
            </div>

        </div>
    </header>
  )
}
export default Navbar