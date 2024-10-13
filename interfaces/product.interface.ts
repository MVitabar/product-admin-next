import { Timestamp } from "firebase/firestore";
import { ItemImage } from "./product-image.interface";

export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  image: ItemImage;
  category: string;
  condition: string;
  sku: string;
  stock: number;
  createdAt?: Timestamp;
}
