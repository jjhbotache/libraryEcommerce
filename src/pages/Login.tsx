'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Link } from 'react-router-dom'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar los datos de inicio de sesión
    console.log('Datos de inicio de sesión:', formData)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Iniciar Sesión</CardTitle>
          <CardDescription>Ingresa a tu cuenta</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input id="email" name="email" type="email" placeholder="Ingresa tu correo electrónico" onChange={handleChange} />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" name="password" type="password" placeholder="Ingresa tu contraseña" onChange={handleChange} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button className="w-full" onClick={handleSubmit}>Iniciar Sesión</Button>
          <div className="text-sm text-center">
            ¿No tienes una cuenta? <Link to="/register" className="text-blue-500 hover:underline">Regístrate</Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}