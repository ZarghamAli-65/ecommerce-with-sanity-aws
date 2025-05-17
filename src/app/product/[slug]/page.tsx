import { client } from "@/lib/client";
import ProductDetailsClient from "@/app/components/ProductDetailsClient";

interface ProductImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}

interface Product {
  _id: string;
  name: string;
  slug: { current: string };
  image: ProductImage[];
  price: number;
  details: string;
}

interface Params {
  params: Promise<{ slug: string }>;
}

const ProductDetails = async ({ params }: Params) => {
  const { slug } = await params;

  const query = `*[_type == "product" && slug.current == "${slug}"][0]`;
  const product: Product = await client.fetch(query);

  const productsQuery = '*[_type == "product"]';
  const products: Product[] = await client.fetch(productsQuery);

  return <ProductDetailsClient product={product} products={products} />;
};

export default ProductDetails;
