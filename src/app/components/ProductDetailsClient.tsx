"use client";

import { useState } from "react";
import Image from "next/image";
import {
  AiFillStar,
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineStar,
} from "react-icons/ai";
import Product from "@/app/components/Product";
import { urlFor } from "@/lib/client";
import { useStateContext } from "@/app/context/StateContext";

interface ProductImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

interface Products {
  _id: string;
  name: string;
  quantity: number;
  slug: { current: string };
  image: ProductImage[];
  price: number;
  details: string;
}

interface Props {
  product: Products;
  products: Products[];
}

const ProductDetailsClient = ({ product, products }: Props) => {
  const [index, setIndex] = useState(0);
  const { incQty, decQty, qty, onAdd } = useStateContext();

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <Image
              src={urlFor(product.image && product.image[index]).url()}
              alt={product.name}
              width={600}
              height={500}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {product.image?.map((item, i) => (
              <Image
                src={urlFor(item).url()}
                key={i}
                alt={`Product image ${i}`}
                width={100}
                height={100}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{product.name}</h1>
          <div className="reviews">
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
            <p>(20)</p>
          </div>

          <h4>Details:</h4>
          <p>{product.details}</p>
          <p className="price">${product.price}</p>

          <div className="quantity">
            <h3>Quantity</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>

          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(product, qty)}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now">
              Shop Now
            </button>
          </div>
        </div>
      </div>

      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsClient;
