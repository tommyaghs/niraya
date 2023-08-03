export interface orderDetails {
  subtotal: number;
  tax: number;
  shippingCost: number;
  couponDiscount: number;
  total: number;
  couponCode: string;
  handling?: number;
  insurance?: number;
  shippingDiscount?: number;
  discount?: number;
}
