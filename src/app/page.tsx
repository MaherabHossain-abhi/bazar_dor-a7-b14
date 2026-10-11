import { Suspense } from "react";
import BannerPage from "@/components/banner";
import ProductCard from "@/components/productcard";
import { IProduct } from "@/type/type";

export default async function Home() {
  const res = await fetch("https://openapi.programming-hero.com/api/bazardor/products");
  const products: IProduct[] = await res.json();

  const isUp = products.filter(p => p.change.dir === 'up');
  const isDown = products.filter(p => p.change.dir === 'down');
  return (
    <div className="max-w-6xl container mx-auto my-4 sm:my-0">
      <BannerPage />

      <div className="mt-6">
        <h1 className="text-lg font-bold mb-2 text-center sm:text-left"><span className="text-red-600">▲</span> আজ দাম বেড়েছে</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mx-6 sm:mx-0">
          {
            isUp.slice(0,6).map(product => {
              return (
                <ProductCard key={product.id} product={product} />
              )
            })
          }
        </div>
      </div>

      <div className="mt-6">
        <h1 className="text-lg font-bold mb-2 text-center sm:text-left"><span className="text-green-600">▼</span> আজ দাম কমেছে</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mx-6 sm:mx-0">
          {
            isDown.slice(0,6).map(product => {
              return (
                <ProductCard key={product.id} product={product} />
              )
            })
          }
        </div>
      </div>


      <div className="mt-6">
        <h1 className="text-lg font-bold text-center sm:text-left">সব পণ্য</h1>
        <p className="text-sm text-gray-500 text-center sm:text-left">মোট ৩৩টি পণ্য দেখানো হচ্ছে</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mx-6 sm:mx-0">
          {
            products.slice(0,33).map(product => {
              return (
                <ProductCard key={product.id} product={product} />
              )
            })
          }
        </div>
      </div>

    </div>
  );
}