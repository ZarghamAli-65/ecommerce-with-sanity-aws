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
interface ProductType {
  image: ProductImage[];
  name: string;
  slug: {
    current: string;
  };
  price: number;
}

interface Props {
  product: ProductType;
}

const Product: React.FC<Props> = ({
  product: { image, name, slug, price },
}) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <Image
            src={urlFor(image && image[0]).url()}
            alt="Product Image"
            width={250}
            height={250}
            className="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
