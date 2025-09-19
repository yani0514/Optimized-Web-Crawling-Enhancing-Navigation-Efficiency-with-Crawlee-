import React, { useState, useEffect } from "react";
import PageVariation1 from "./PageVariation1"; // Import component variations
import PageVariation2 from "./PageVariation2"; // Import component variations
import PageVariation3 from "./PageVariation3"; // Import component variations

export default function SameURLDifferentContent() {
    const pageVariations = [PageVariation1, PageVariation2, PageVariation3];

    const [CurrentPage, setCurrentPage] = useState(null);

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * pageVariations.length);
        setCurrentPage(() => pageVariations[randomIndex]);
    }, []);

    return (
        <div className="news-container w-svw h-auto">
            {CurrentPage ? <CurrentPage /> : <p>Loading...</p>}
        </div>
    );
}