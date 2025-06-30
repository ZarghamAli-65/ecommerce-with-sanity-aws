"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { toast } from "react-hot-toast";

interface SanityImage {
  asset: {
    _ref: string;
    _type: string;
  };
  _type: "image";
}

interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image: SanityImage[];
}

interface StateContextType {
  showCart: boolean;
  setShowCart: React.Dispatch<React.SetStateAction<boolean>>;
  cartItems: Product[];
  totalPrice: number;
  totalQuantities: number;
  qty: number;
  incQty: () => void;
  decQty: () => void;
  onAdd: (product: Product, quantity: number) => void;
  onRemove: (product: Product) => void;
  toggleCartItemQuanitity: (id: string, value: "inc" | "dec") => void;
}

interface StateContextProps {
  children: ReactNode;
}

const Context = createContext<StateContextType | undefined>(undefined);

export const StateContext = ({ children }: StateContextProps) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  const onAdd = (product: Product, quantity: number) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice((prev) => prev + product.price * quantity);
    setTotalQuantities((prev) => prev + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity }]);
    }

    toast.success(`${quantity} ${product.name} added to the cart.`);
  };

  const onRemove = (product: Product) => {
    const foundProduct = cartItems.find((item) => item._id === product._id);
    if (!foundProduct) return;

    const newCartItems = cartItems.filter((item) => item._id !== product._id);
    setTotalPrice((prev) => prev - foundProduct.price * foundProduct.quantity);
    setTotalQuantities((prev) => prev - foundProduct.quantity);
    setCartItems(newCartItems);
  };

  const toggleCartItemQuanitity = (id: string, value: "inc" | "dec") => {
    const foundProduct = cartItems.find((item) => item._id === id);
    if (!foundProduct) return;

    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === "inc") {
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);
      setTotalPrice((prev) => prev + foundProduct.price);
      setTotalQuantities((prev) => prev + 1);
    }

    if (value === "dec" && foundProduct.quantity > 1) {
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity - 1 },
      ]);
      setTotalPrice((prev) => prev - foundProduct.price);
      setTotalQuantities((prev) => prev - 1);
    }
  };

  const incQty = () => setQty((prev) => prev + 1);
  const decQty = () => setQty((prev) => (prev - 1 < 1 ? 1 : prev - 1));

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
        onRemove,
        toggleCartItemQuanitity,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = (): StateContextType => {
  const context = useContext(Context);
  if (!context) {
    throw new Error(
      "useStateContext must be used within a StateContext provider"
    );
  }
  return context;
};
