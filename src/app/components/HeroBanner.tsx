import Image from "next/image";
import Link from "next/link";
import React from "react";
import { urlFor } from "@/lib/client";

// Optional: define types for clarity
interface HeroBannerProps {
  heroBanner: {
    smallText: string;
    midText: string;
    largeText1: string;
    image: string;
    product: string;
    buttonText: string;
    desc: string;
  };
}

const HeroBanner: React.FC<HeroBannerProps> = ({ heroBanner }) => {
  return (
    <div className="hero-banner-container">
      <div>
        <p className="beats-solo">{heroBanner.smallText}</p>
        <h3>{heroBanner.midText}</h3>
        <h1>{heroBanner.largeText1}</h1>
        <div className="hero-banner-image-container">
          <Image
            src={urlFor(heroBanner.image).url()}
            alt="headphones"
            className="hero-banner-image"
            width={600}
            height={400}
          />
        </div>
        <div>
          <Link href={`/product/${heroBanner.product}`}>
            <button type="button">{heroBanner.buttonText}</button>
          </Link>
          <div className="desc">
            <h5>Description</h5>
            <p>{heroBanner.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
