import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/productcard';
import { IProduct } from '@/type/type';

async function Products({ params }: { params: Promise<{ name: string }> }) {
    const { name } = await params;
    const res = await fetch(
        `https://api.abcz.workers.dev/api/bazardor/products?category=${encodeURIComponent(name)}`
    );

    if (!res.ok) notFound();
    const products: IProduct[] = await res.json();
    if (!products.length) notFound();
    const { categoryIcon, categoryNameBn } = products[0];

    return (
        <section className="py-6 max-w-6xl container mx-auto">

            <div className="mb-6 flex items-center gap-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-50 text-3xl">
                    {categoryIcon}
                </div>
                <div className="flex flex-col">
                    <h1 className="text-xl font-bold md:text-3xl">{categoryNameBn}</h1>
                    <p className="text-sm text-gray-500">
                        {products.length.toLocaleString('bn-BD')}টি পণ্যের আজকের দাম ও পরিবর্তন
                    </p>
                </div>
            </div>


            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 ">
                {products.map((p) => (
                    <ProductCard key={p.id} product={p} />
                ))}
            </div>
        </section>
    );
}

export default function CategoryPage({ params }: { params: Promise<{ name: string }> }) {
    return (
        <Suspense fallback={<div className="h-40 animate-pulse rounded-2xl bg-gray-100" />}>
            <Products params={params} />
        </Suspense>
    );
}