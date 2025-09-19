import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function PageVariation1() {
    const [clicksCount, setClicksCount] = useState(0);
    const [fakeContent, setFakeContent] = useState([]);

    const buttonTexts = [
        "Click for More Info", 
        "Next Page →", 
        "Reveal Hidden Content", 
        "Find the Exit", 
        "Keep Clicking!"
    ];

    const misleadingTexts = [
        "You're almost there!",
        "Just one more click...",
        "This might be the way out...",
        "Keep going, you're close!",
        "Don't stop now!"
    ];

    function addFakeContent() {
        setClicksCount(prev => prev + 1);

        const newFakeContent = (
            <div className="fake-container w-full bg-[rgba(255,255,255,0.1)] rounded-xl p-2.5 mb-3.5 flex flex-col justify-center items-center" key={Date.now()}>
                <p className="w-full text-lg bg-[rgba(255,255,255,0.1)] rounded-lg">
                    {misleadingTexts[Math.floor(Math.random() * misleadingTexts.length)]}
                </p>

                <button className="fake-link mt-3 px-4 py-2 text-white cursor-pointer bg-gradient-to-r from-[#00c6ff] to-[#0072ff] shadow-lg shadow-[rgba(255,64,108,0.3)] transition-all duration-300 ease-in-out hover:scale-125 rounded-md"
                    onClick={() => alert("Oops! Wrong link!")}>
                    🔗 Click Here! 🔗
                </button>

                <button className="fake-generate-button mt-2 px-4 py-2 cursor-pointer bg-gradient-to-t from-[#ff416c] to-[#ff4b2b] text-white shadow-lg shadow-[rgba(255,64,108,0.3)] transition-all duration-300 ease-in-out hover:scale-125 rounded-md"
                    onClick={addFakeContent}>
                    {buttonTexts[Math.floor(Math.random() * buttonTexts.length)]}
                </button>
            </div>
        );

        setFakeContent(prevContent => [...prevContent, newFakeContent]);
    }

    return (
        <div className="body w-svw min-h-screen flex justify-center text-center font-['Arial'] p-5 bg-gradient-to-r from-green-500 via-green-700 to-green-500 text-white">
            <div className="container w-5/7 h-fit p-8 bg-[rgba(255,255,255,0.1)] rounded-2xl shadow-lg backdrop-blur-sm">
                <h1 className="text-5xl mb-4 text-shadow-md">Click to Reveal</h1>
                <p className="text-xl">Click the button below to generate more content.</p>

                <button className="generate-button m-5 pt-3 pr-6 pb-3 pl-6 text-xl font-bold border-none rounded-lg cursor-pointer bg-gradient-to-t from-[#ff416c] to-[#ff4b2b] text-white shadow-lg shadow-[rgba(255,64,108,0.3)] transition-all duration-300 ease-in-out hover:scale-125"
                    onClick={addFakeContent}>
                    Generate Content
                </button>

                {/* Progress Bar */}
                <div className="progress-bar w-full bg-[rgba(255,255,255,0.1)] rounded-lg h-5 mt-4 overflow-hidden">
                    <div className="progress h-full bg-blue-500 transition-all duration-300"
                        style={{ width: `${(clicksCount / 10) * 100}%` }}>
                    </div>
                </div>

                {/* Fake Content Area */}
                <div className="fake-content-area w-full mt-6">{fakeContent}</div>

                {/* Exit Button (Shows only after 10 clicks) */}
                {clicksCount >= 10 && (
                    <div className="exit text-xl">
                        <Link className="" to={"/"}>
                            <button className="m-5 pt-3 pr-6 pb-3 pl-6 text-xl font-bold border-none rounded-lg cursor-pointer bg-gradient-to-t from-[#11998e] to-[#38ef7d] text-white transition-all duration-300 ease-in-out hover:scale-125">
                                🚀 Proceed to the Next Level 🚀
                            </button>
                        </Link> 
                    </div>                
                )}
            </div>
        </div>
    );
};