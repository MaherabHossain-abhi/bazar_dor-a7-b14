import { banglaNumber, toBnUnit } from '@/lib/utils';
import React from 'react';

interface IProduct {
    id: number
    slug: string
    nameBn: string
    category: string
    categoryNameBn: string
    categoryIcon: string
    unit: string
    image: string
    today: number
    yesterday: number
    lastWeek: number
    lastMonth: number
    change: Change
    markets: []
}

interface Change {
    dir: string
    pct: number
}

const ProductCard = ({ product }: { product: IProduct }) => {
    const isUp = product.change.dir === 'up';
    const { dir, pct } = product.change;

    return (
        <div>
            <div className="group w-full rounded-2xl border border-gray-100 bg-white p-4 shadow-md">
                <div className="flex gap-2 items-center">
                    <p className='text-3xl p-2 bg-blue-100 rounded-2xl'>{product.image}</p>
                    <div className="flex flex-col gap-1">
                        <h2 className="font-bold">{product.nameBn}</h2>
                        <p className='text-sm'>প্রতি {toBnUnit(product.unit)}</p>
                    </div>
                </div>
                <div className="flex justify-between ">
                    <div className="flex flex-col text-left mt-4">
                        <p className='text-sm text-gray-600 font-semibold'>আজকের দাম</p>
                        <p className='text-sm font-bold'><span className="text-xl font-bold">{banglaNumber(product.today)}</span> টাকা</p>
                    </div>
                    <div className="flex justify-end items-end">
                        <span className={isUp ? 'text-green-600' : 'text-red-600'}>
                            {isUp ? `▼ ${product.change.pct}%` : `▲ ${product.change.pct}%`}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;