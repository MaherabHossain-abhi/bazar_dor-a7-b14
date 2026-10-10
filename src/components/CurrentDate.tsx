'use client';

import { useEffect, useState } from 'react';

const CurrentDate = () => {
    const [date, setDate] = useState('');

    useEffect(() => {
        const today = new Date();

        setTimeout(() => {
            setDate(
                today.toLocaleDateString('bn-BD', {
                    dateStyle: 'full',
                })
            );
        }, 0);
    }, []);

    return (
        <p className="text-xs font-semibold text-gray-500">
            {date || '\u00A0'}
        </p>
    );
};

export default CurrentDate;