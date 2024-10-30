import { CartProductDTO } from "@/interfaces/productInterface";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MinusCircle, PlusCircle } from "lucide-react";


interface ProductCartCardProps {
  item: CartProductDTO;
  addQuantity: () => void;
  removeQuantity: () => void;
}

export default function ProductCartCard({ item, addQuantity, removeQuantity }: ProductCartCardProps) {


  return <>
    <Card >
      <CardContent className="flex items-center gap-4 p-4">
        <img
          src={item.imageUrl}
          alt={item.productName}
          className="h-24 w-24 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h3 className="font-semibold">{item.productName}</h3>
          <p className="text-sm text-muted-foreground">
            ${item.price.toLocaleString()}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => addQuantity()}
            >
              <PlusCircle className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => removeQuantity()}
            >
              <MinusCircle className="h-4 w-4" />
              
            </Button>
          </div>
        </div>
        <div className="text-right font-semibold">
          ${(item.price * (item.quantity ||0)).toLocaleString()}
        </div>
      </CardContent>
    </Card>
  </>
};
