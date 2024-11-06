'use client'

import * as React from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from '@/components/ui/sheet'

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
    const [isOpen, setIsOpen] = React.useState(false)

    return (
        <nav className="border-b">
            <div className="container mx-auto flex items-center justify-between px-4 py-4">
                <Link href="/" className="text-2xl font-bold">
                    Ahoy Movies
                </Link>
                <div className="hidden md:flex space-x-4">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium transition-colors hover:text-primary"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" className="px-0 text-base hover:bg-transparent focus:ring-0 md:hidden">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right">
                        <div className="flex flex-col space-y-4 mt-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="text-sm font-medium transition-colors hover:text-primary"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    )
}