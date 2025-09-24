export interface Course {
  id: string | number;
  title: string;
  instructor?: string;
  img?: string;
  price: number | string;
  description?: string;
  expiry?: string;
}

export interface CartItem extends Course {
  price: number; // Always number after normalization
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (course: Course) => void;
  removeFromCart: (id: string | number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}