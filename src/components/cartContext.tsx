'use client';
import React, { createContext, useState, useContext, ReactNode } from "react";
import { Course, CartItem, CartContextType } from "../utils/data/types/cart";

// Create Cart Context with default values
export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (course: Course) => {
    // Parse the price correctly whether it's a string or number
    const price = typeof course.price === 'string' 
      ? parseFloat(course.price.replace(/[^\d.]/g, '')) || 0 
      : course.price || 0;

    const normalizedCourse: CartItem = {
      id: course.id,
      title: course.title,
      instructor: course.instructor || "Unknown",
      img: course.img || "",
      price: price,
      description: course.description || "",
      expiry: course.expiry || "",
    };

    setCartItems((prev) => [...prev, normalizedCourse]);
  };

  const removeFromCart = (id: string | number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = (): number => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for using cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};