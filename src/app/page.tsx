import { Suspense } from "react";
import BannerPage from "@/components/banner";
import ProductCard from "@/components/productcard";
import { IProduct } from "@/type/type";

async function ProductList() {
    const res = await fetch(
        "https://api.api-store.workers.dev/api/bazardor/products",
        {
            cache: "force-cache",
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    const products: IProduct[] = await res.json();

    const isUp = products.filter(
        (p) => p.change.dir === "up"
    );

    const isDown = products.filter(
        (p) => p.change.dir === "down"
    );

    return (
        <>
            <div className="mt-6">
                <h1 className="text-lg font-bold mb-2">
                    <span className="text-red-600">▲</span> আজ দাম বেড়েছে
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {isUp.slice(0, 6).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>

            <div className="mt-6">
                <h1 className="text-lg font-bold mb-2">
                    <span className="text-green-600">▼</span> আজ দাম কমেছে
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {isDown.slice(0, 6).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>

            <div className="mt-6">
                <h1 className="text-lg font-bold">সব পণ্য</h1>
                <p className="text-sm text-gray-500">
                    মোট ৩৩টি পণ্য দেখানো হচ্ছে
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    {products.slice(0, 30).map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default function Home() {
    return (
        <div className="max-w-6xl container mx-auto py-4 sm:py-0">
            <BannerPage />

            <Suspense
                fallback={
                    <p className="mt-6 text-center text-gray-500">
                        পণ্যের তথ্য লোড হচ্ছে...
                    </p>
                }
            >
                <ProductList />
            </Suspense>
        </div>
    );
}