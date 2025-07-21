"use client";
import React, { useEffect } from "react";
import { useStateContext } from "../context/StateContext";
import { BsBagCheckFill } from "react-icons/bs";
import Link from "next/link";
import { runFireworks } from "@/lib/utils";

const SuccessPage = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, []);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email for receipt</p>
        <p className="description">
          If you have any questions, please email
          <Link href="mailto: zargham@gmail.com" className="email">
            zargham@gmail.com
          </Link>
        </p>
        <Link href="/">
          <button type="button" className="w-[300px] btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
