import { banglaNumber } from '@/lib/utils';
import React from 'react';

const StatCard = ({ label, value, note }: { label: string; value: number; note: string }) => {
    return (
        <div className="flex flex-col rounded-2xl border-2 border-base-300 bg-[#FAFCFA] px-4 py-2">
            <p className="text-sm text-gray-500">{label}</p>
            <h2 className="text-3xl font-bold">{banglaNumber(value)}</h2>
            <p className="text-sm text-gray-500">{note}</p>
        </div>
    );
};

export default StatCard;