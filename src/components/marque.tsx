'use client';

import { banglaNumber, toBnUnit } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import MarqueeText from 'react-marquee-text';

interface IProduct {
    id: number;
    slug: string;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    image: string;
    today: number;
    yesterday: number;
    lastWeek: number;
    lastMonth: number;
    change: Change;
    markets: [];
}

interface Change {
    dir: string;
    pct: number;
}

const MarquePage = () => {
    const [headLine, setHeadLine] = useState<IProduct[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
                if (res.ok) {
                    const data = await res.json();
                    if (Array.isArray(data)) {
                        setHeadLine(data);
                    } else if (data && Array.isArray(data.data)) {
                        setHeadLine(data.data);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch marquee products:", error);
            }
        };

        fetchProducts();
    }, []);

    if (!headLine || headLine.length === 0) {
        return null;
    }

    return (
        <div className="border-b-gray-200 border-t-gray-200 border-b-2 border-t-2 mt-5">
            <MarqueeText className="py-2" direction="right" duration={30}>
                {headLine.map((p) => {
                    const isUp = p.change.dir === 'up' && p.change.pct !== 0;
                    return (
                        <span key={p.id} className="mx-3 inline-flex items-center gap-2 text-sm font-bold">
                            {p.image} {p.nameBn} {banglaNumber(p.today)} টাকা/{toBnUnit(p.unit)}{' '}
                            <span className={isUp ? 'text-red-600' : 'text-green-600'}>
                                {isUp ? `▲ ${p.change.pct}%` : `▼ ${p.change.pct}%`}
                            </span>
                        </span>
                    );
                })}
            </MarqueeText>
        </div>
    );
};

export default MarquePage;