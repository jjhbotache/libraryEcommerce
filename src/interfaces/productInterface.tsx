import { Category } from "./categoryInterface";

export interface ProductDTO {
  id: number;
  productName: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  categoryList: Category[];
}

export interface CartProductDTO extends ProductDTO {
  quantity?: number;
}