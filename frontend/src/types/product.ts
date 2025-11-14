export interface Product {
  _id: string;
  pname: string;
  pprice: number;
  description?: string;
  pimage?: string;
  category?: string;
  stock?: number;
}

// export interface CartItem extends Product {
//   quantity: number;
// }

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}