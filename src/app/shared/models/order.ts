export interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  productId: string;
}

export interface Order {
  id: string;
  buyerId: string;
  total: number;
  items: OrderItem[];
  createdAt: string;
}
