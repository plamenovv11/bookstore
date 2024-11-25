export interface Book {
  _id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  publishedDate: string;
  genre: string;
  imageUrl: string;
}

export interface CartItem {
  book: Partial<Book>;
  quantity: number;
}

export interface Cart {
  userId: string;
  items: CartItem[];
}