// app/page.tsx
import Footer from "./components/Footer";
import HeroBanner from "./components/HeroBanner";
import { client } from "../lib/client";

export default async function Home() {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products.map((product) => (
          <div key={product._id}>{product.name}</div>
        ))}
      </div>
      <Footer />
    </>
  );
}
