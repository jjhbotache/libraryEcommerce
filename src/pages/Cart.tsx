"use client"

import { Button } from "@/components/ui/button"
import useCart from '@/hooks/useCart'
import AddressForm from "@/components/AddressForm"
import ProductCartCard from "@/components/ProductCartCard"

export default function Component() {
  const { cart, removeProduct, addProduct, clearCart } = useCart()



  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity ||0), 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Carrito */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Carrito de Compras</h2>
          <div className="space-y-4">
            {cart.map((item) => <ProductCartCard 
            key={item.id}
            item={item}
            addQuantity={ ()=>{ addProduct(item,1) }}
            removeQuantity={ ()=>{ removeProduct(item.id, 1) }} />
            )}
          </div>
          <div className="rounded-lg bg-muted p-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${total.toLocaleString()}</span>
            </div>
          </div>
          <Button variant="destructive" onClick={clearCart}  className="mt-4 w-full">Vaciar Carrito</Button>
        </div>

        <AddressForm />
      </div>
    </div>
  )
}