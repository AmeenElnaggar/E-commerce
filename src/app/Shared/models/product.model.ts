export interface Product {
  id: string;
  price: number;
  title: string;
  imageCover: string;
  ratingsAverage?: number;
  category?: Category;
}

interface Category {
  image: string;
  name: string;
  slug: string;
  _id: string;
}
