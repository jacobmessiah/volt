"use client"

import { Button } from "@/components/ui/button"
import { Search, ShoppingCart, User, X, Zap } from "lucide-react"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export function Navbar({ className }: { className?: string }) {
  const [searchOpen, setSearchOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const searchBoxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus()
  }, [searchOpen])

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (searchBoxRef.current && !searchBoxRef.current.contains(e.target as Node)) {
        setSearchOpen(false)
      }
    }
    if (searchOpen) document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [searchOpen])

  return (
    <header className="relative flex h-15 w-full items-center justify-between p-4">

      {/* Logo — hidden on mobile when search is open */}
      <Link href="/" >
        <div
          className={`flex select-none items-center gap-1 font-grotesk text-2xl font-bold transition-all duration-300 ${searchOpen ? "opacity-0 pointer-events-none md:opacity-100 md:pointer-events-auto" : "opacity-100"
            }`}
        >
          <Zap className="h-5 w-5" />
          <p>Volt</p>
        </div>
      </Link>

      {/* Right side */}
      <div className="flex items-center gap-2">

        {/* Desktop search bar — always visible */}
        <div className="hidden md:flex items-center gap-1 rounded-full bg-accent pl-3 p-1">
          <input
            type="text"
            placeholder="Search products..."
            className="focus:outline-none bg-transparent"
          />
          <Button className="rounded-full">
            <Search />
          </Button>
        </div>

        {/* Mobile search — expands over full bar */}
        <div
          ref={searchBoxRef}
          className={`md:hidden absolute inset-x-4 flex items-center gap-1 rounded-full bg-accent pl-3 p-1 transition-all duration-300 origin-right ${searchOpen
              ? "opacity-100 scale-x-100 pointer-events-auto"
              : "opacity-0 scale-x-0 pointer-events-none"
            }`}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Search products..."
            className="flex-1 bg-transparent focus:outline-none"
          />
          <Button
            className="rounded-full hover:bg-background/80"
            onClick={() => setSearchOpen(false)}
          >
            <X />
          </Button>
        </div>

        {/* Mobile search trigger */}
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full md:hidden"
          onClick={() => setSearchOpen(true)}
        >
          <Search />
        </Button>

        {/* Cart + User — hidden on mobile */}
        <Button className="hidden md:flex rounded-full">
          <ShoppingCart />
        </Button>
        <Button className="hidden md:flex rounded-full">
          <User />
        </Button>
      </div>
    </header>
  )
}
