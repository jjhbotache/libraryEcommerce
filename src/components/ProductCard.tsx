import { ProductDTO } from "@/interfaces/productInterface";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface ProductCardProps {
  product: ProductDTO;
  onAddToCart?: (product: ProductDTO) => void;
}
export default function ProductCard({product, onAddToCart}: ProductCardProps) {
  return (
    <Card key={product.productName} className="max-w-xs">
      <CardHeader>
        <CardTitle>{product.productName}</CardTitle>
      </CardHeader>
      <CardContent>
        <img src={product.imageUrl} alt={product.productName} className="mb-4 w-full h-48 object-cover" />
        <p>Descripción: {product.description}</p>
        <p>Precio: ${product.price.toFixed(2)}</p>
        <p>Stock: {product.stock}</p>
        <p>Categorías: {product.categoryList.map(category => category.categoryName).join(', ')}</p>
      </CardContent>
      {onAddToCart && (
        <button onClick={() => onAddToCart(product)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Agregar al carrito</button>
      )}
    </Card>
  )
};
