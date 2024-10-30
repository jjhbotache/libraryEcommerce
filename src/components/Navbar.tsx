"use client"

import { useState } from "react"
import { ShoppingCart, Package, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLoginLogout = () => {
    setIsLoggedIn(!isLoggedIn)
  }

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold">Logo</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/products"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                <Package className="mr-2 h-4 w-4" />
                Productos
              </Link>
              <Link
                to="/cart"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                Carrito
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isLoggedIn ? (
                <div className="flex items-center">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Foto de perfil" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Button variant="ghost" onClick={handleLoginLogout} className="ml-3">
                  Cerrar sesión
                </Button>
                </div>
            ) : (
              <Link to="/login" className="flex items-center"> Iniciar sesión </Link>
            )}
          </div>
          <div className="flex items-center sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-2">
                  <Menu className="h-6 w-6" aria-hidden="true" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link to="/products" className="flex items-center">
                    <Package className="mr-2 h-4 w-4" />
                    Productos
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/cart" className="flex items-center">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Carrito
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  {isLoggedIn ? (
                    <button onClick={handleLoginLogout} className="flex items-center">
                      Cerrar sesión
                    </button>
                  ) : (
                    <Link to="/login" className="flex items-center"> Iniciar sesión </Link>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  )
}