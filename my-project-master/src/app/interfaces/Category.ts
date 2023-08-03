export interface Category {
  name: string,
  subcategories: Array<Subcategory>
};
export interface Subcategory {
  id_subcategory: number,
  name: string,
  products: Array<Product>,
};
export interface Product {
  selectedImage: string;
  id: number,
  quantity:number,
  title: string,
  price: number,
  description: string,
  category: string,
  image: any[],
  rating: {
    rate: 4.5,
    count: 50
  }
};
