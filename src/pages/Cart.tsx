"use client"

import { useState } from "react"
import { MinusCircle, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"

export default function Component() {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Camiseta Básica", price: 25000, quantity: 1, image: "/placeholder.svg?height=100&width=100" },
    { id: 2, name: "Pantalón Vaquero", price: 75000, quantity: 1, image: "/placeholder.svg?height=100&width=100" },
  ])

  const updateQuantity = (id: number, increment: boolean) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: increment ? item.quantity + 1 : Math.max(0, item.quantity - 1) }
          : item
      )
    )
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Carrito */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Carrito de Compras</h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="flex items-center gap-4 p-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      ${item.price.toLocaleString()}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, false)}
                      >
                        <MinusCircle className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, true)}
                      >
                        <PlusCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-right font-semibold">
                    ${(item.price * item.quantity).toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="rounded-lg bg-muted p-4">
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>${total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Formulario de Dirección */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Dirección de Envío</h2>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Nombre y apellido</Label>
              <Input
                id="fullName"
                placeholder="Tal cual figure en el documento"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="department">Departamento</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tolima">Tolima</SelectItem>
                    <SelectItem value="cundinamarca">Cundinamarca</SelectItem>
                    <SelectItem value="antioquia">Antioquia</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">Municipio o ciudad capital</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="natagaima">Natagaima</SelectItem>
                    <SelectItem value="ibague">Ibagué</SelectItem>
                    <SelectItem value="espinal">Espinal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="neighborhood">Barrio</Label>
              <Input id="neighborhood" />
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="streetType">Tipo de calle</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="calle">Calle</SelectItem>
                    <SelectItem value="carrera">Carrera</SelectItem>
                    <SelectItem value="avenida">Avenida</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="streetName">Calle</Label>
                <Input id="streetName" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="streetNumber">#</Label>
                <Input id="streetNumber" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="houseNumber">-</Label>
                <Input id="houseNumber" />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="noNumber" />
              <label
                htmlFor="noNumber"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                No tengo número
              </label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="apartment">Piso/Departamento (opcional)</Label>
              <Input id="apartment" />
            </div>

            <div className="space-y-2">
              <Label>¿Es tu trabajo o tu casa?</Label>
              <RadioGroup defaultValue="residential" className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="work" id="work" />
                  <Label htmlFor="work">Laboral</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="residential" id="residential" />
                  <Label htmlFor="residential">Residencial</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono de contacto</Label>
              <Input id="phone" type="tel" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="references">Referencias adicionales de esta dirección</Label>
              <Textarea
                id="references"
                placeholder="Descripción de la fachada, puntos de referencia para encontrarla, indicaciones de seguridad, etc."
              />
            </div>

            <Button className="w-full" size="lg">
              Continuar
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}