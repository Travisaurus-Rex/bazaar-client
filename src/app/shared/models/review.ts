export interface Review {
  id: string;
  rating: number;
  comment?: string;
  buyerId: string;
  productId: string;
  createdAt: string;
}
