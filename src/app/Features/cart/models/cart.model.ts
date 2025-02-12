import { Product } from '../../../Shared/models/product.model';

export interface Cart {
  products: Product[];
  cartTotalPrice: TotalPrice;
}

export interface TotalPrice {
  subTotal: number;
  shippingFee: number;
  totalPrice: number;
}
