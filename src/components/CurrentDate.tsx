
"use client";

import { useEffect, useState } from "react";

export default function CurrentDate() {
    const [dateString, setDateString] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            const today = new Date().toLocaleDateString("bn-BD", {
                dateStyle: "full",
            });

            setDateString(today);
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    return (
        <p className="text-xs font-semibold text-gray-500 min-h-[16px]">
            {dateString || "\u00A0"}
        </p>
    );
}
