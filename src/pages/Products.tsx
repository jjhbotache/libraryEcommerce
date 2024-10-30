'use client'

import { useState, useEffect } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { ProductDTO } from '@/interfaces/productInterface'
import { Category } from '@/interfaces/categoryInterface'

import { apiUrl } from '@/constants/constants'
import ProductCard from '@/components/ProductCard'

export default function ProductList() {
  const [products, setProducts] = useState<ProductDTO[]>([])
  const [filter, setFilter] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<number | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [cart, setCart] = useState<ProductDTO[]>([])

  useEffect(() => {
    // Usar la API para obtener los productos
    fetch(`${apiUrl}/products/getProducts`)
      .then(response => response.json())
      .then(data => setProducts(data as ProductDTO[]))
      .catch(error => console.error('Error fetching products:', error))
  }, [])

  useEffect(() => {
    // Obtener categorías de la API
    fetch(`${apiUrl}/Categories/getCategories`)
      .then(response => response.json())
      .then(data => setCategories(data as Category[]))
      .catch(error => console.error('Error fetching categories:', error))
  }, [])

  const handleAddToCart = (product: ProductDTO) => {
    setCart(prevCart => [...prevCart, product])
  }

  const filteredProducts = products.filter(product => 
    product.productName.toLowerCase().includes(filter.toLowerCase()) &&
    (categoryFilter === null || product.categoryList.some(cat => cat.id === categoryFilter))
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Listado de Productos</h1>
      <div className="flex space-x-4 mb-4">
        <div className="flex-1">
          <Label htmlFor="filter">Filtrar por nombre</Label>
          <Input
            id="filter"
            placeholder="Buscar productos..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        <div className="w-[200px]">
          <Label htmlFor="category">Filtrar por categoría</Label>
          <Select onValueChange={(value) => setCategoryFilter(value ? Number(value) : null)}>
            <SelectTrigger>
              <SelectValue placeholder="Todas las categorías" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Todas las categorías</SelectItem>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.id.toString()}>{category.categoryName}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
        {filteredProducts.map(product => (
          <ProductCard key={product.productName} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>
      {/* Carrito de compras */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Carrito de Compras</h2>
        {cart.length === 0 ? (
          <p>No hay productos en el carrito.</p>
        ) : (
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.productName} - ${item.price.toFixed(2)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}