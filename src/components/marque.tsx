import { banglaNumber, toBnUnit } from '@/lib/utils';
import { IProduct } from '@/type/type';
import React from 'react';
import MarqueeText from 'react-marquee-text';

const MarquePage = async () => {
    const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products");
    const headLine: IProduct[] = await res.json();
    return (
        <div className="border-b-gray-200 border-t-gray-200 border-b-2 border-t-2 bg-white">
            <MarqueeText className="py-2" direction="right" duration={30}>
                {headLine.map((p) => {
                    const isUp = p.change.dir === 'up';
                    return (
                        <span key={p.id} className="mx-3 flex items-center gap-2 text-sm font-bold">
                            {p.image} {p.nameBn} {banglaNumber(p.today)} টাকা/{toBnUnit(p.unit)} <span className={isUp ? 'text-red-600' : 'text-green-600'}>
                                {isUp ? `▲ ${p.change.pct}%` : `▼ ${p.change.pct}%`}
                            </span>
                        </span> 
                    )
                })}
            </MarqueeText>
        </div>
    );
};

export default MarquePage;