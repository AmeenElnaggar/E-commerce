export interface Product {
  id: string;
  price: number;
  title: string;
  imageCover: string;
  ratingsAverage?: number;
  category?: Category;
  images?: string[];
  quantity?: number;
  description?: string;
  count?: number;
}

interface Category {
  image: string;
  name: string;
  slug: string;
  _id: string;
}
