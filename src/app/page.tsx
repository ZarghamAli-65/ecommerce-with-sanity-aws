import HeroBanner from "./components/HeroBanner";
import { client } from "../lib/client";
import Product from "./components/Product";
import FooterBanner from "./components/FooterBanner";

interface ProductImage {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
}
interface ProductType {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  price: number;
  image: ProductImage[]; // Replace 'any' with more specific type if available
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

export default async function Home() {
  const query = '*[_type == "product"]';
  const products: ProductType[] = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData: BannerType[] = await client.fetch(bannerQuery);

  return (
    <>
      {bannerData.length > 0 && <HeroBanner heroBanner={bannerData[0]} />}
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner
        footerBanner={bannerData.length > 0 ? bannerData[0] : null}
      />
    </>
  );
}
