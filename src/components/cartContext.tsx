"use client";

import React, { createContext, useState, ReactNode } from "react";

// Create Cart Context
export const CartContext = createContext<{
  cartItems: any[];
  addToCart: (course: any) => void;
  removeFromCart: (id: string | number) => void;
}>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
});

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  const addToCart = (course: any) => {
    const price =
      typeof course.price === "string"
        ? parseFloat(course.price.replace(/[^\d.]/g, "")) || 0
        : course.price || 0;

    const normalizedCourse = {
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

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
