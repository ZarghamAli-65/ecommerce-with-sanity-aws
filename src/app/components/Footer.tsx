import Link from "next/link";
import React from "react";
import {
  AiFillFacebook,
  AiFillInstagram,
  AiFillTwitterCircle,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2025 Z-Audio Store All Rights Reserved</p>
      <p className="icons">
        <Link href="/">
          <AiFillInstagram />
        </Link>
        <Link href="/">
          <AiFillTwitterCircle />
        </Link>
        <Link href="/">
          <AiFillFacebook />
        </Link>
      </p>
    </div>
  );
};

export default Footer;
