import { Category } from "./categoryInterface";

export interface ProductDTO {
  productName: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  categoryList: Category[];
}
