import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";

export default function AddressForm() {
  return <>
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
  </>
};
