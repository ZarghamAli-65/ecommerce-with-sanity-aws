import React from "react";
import Link from "next/link";
import { urlFor } from "@/lib/client";
import Image from "next/image";

interface ProductImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

interface BannerType {
  _id: string;
  image: ProductImage;
  buttonText: string;
  product: string;
  desc: string;
  smallText: string;
  midText: string;
  largeText1: string;
  largeText2: string;
  discount: string;
  saleTime: string;
}

interface FooterBannerProps {
  footerBanner: BannerType | null;
}

const FooterBanner: React.FC<FooterBannerProps> = ({ footerBanner }) => {
  if (!footerBanner) return null;

  return (
    <div className="footer-banner-container">
      <div className="banner-desc">
        <div className="left">
          <p>{footerBanner.discount}</p>
          <h3>{footerBanner.largeText1}</h3>
          <h3>{footerBanner.largeText2}</h3>
          <p>{footerBanner.saleTime}</p>
        </div>
        <div className="right">
          <p>{footerBanner.smallText}</p>
          <h3>{footerBanner.midText}</h3>
          <p>{footerBanner.desc}</p>
          <Link href={`/product/${footerBanner.product}`}>
            <button type="button">{footerBanner.buttonText}</button>
          </Link>
        </div>

        <Image
          src={urlFor(footerBanner.image).url()}
          alt="Footer Banner Image"
          className="footer-banner-image"
          width={600}
          height={400}
        />
      </div>
    </div>
  );
};

export default FooterBanner;
