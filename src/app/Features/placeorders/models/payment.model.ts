export interface PaymentDetails {
  status: string;
  session: { url: string; success_url: string; cancel_url: string };
}

export interface DeliveryDetails {
  details: string;
  phone: string;
  city: string;
}
