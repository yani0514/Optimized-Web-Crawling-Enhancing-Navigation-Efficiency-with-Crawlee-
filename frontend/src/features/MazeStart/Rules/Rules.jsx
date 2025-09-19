// src/Rules.jsx
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

export default function Rules() {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        setTimeout(() => setCurrentTime(new Date().toLocaleTimeString()), 1000);
    }, []);

    return (
        <div className="body font-['Arial'] text-base flex justify-center items-center bg-center bg-[url(/assets/Maze-web-page-resized-1200-668.jpg.webp)] bg-no-repeat bg-cover bg-scroll w-svw h-svh">
            <div className="container w-[70%] h-[70%] p-6 bg-[rgba(255,255,255,0.7)] text-base text-[rgb(63,63,63)] text-center flex flex-col justify-center items-center rounded-2xl">
                
                {/* Header Section */}
                <div className="header-container w-full h-auto p-2 text-base flex flex-col justify-center items-center grow text-center">
                    <header className="w-full">
                        <h1 className=" text-4xl">🌀 Rules of the Maze Challenge 🌀</h1>
                        <p className="text-xl">Dare to enter the maze? Read carefully. Your survival depends on it.</p>
                    </header>
                </div>

                {/* Rules Section */}
                <div className="rules-container w-full h-auto p-2 flex justify-center items-center grow text-base">
                    <div className="rules w-[70%] h-full bg-[rgba(20,200,0,0.6)] rounded-2xl text-xl">
                        <h2 className="mt-5 mr-4 mb-4 ml-4 text-2xl font-bold">📜 The Rules 📜</h2>
                        <ul className="w-full p-2 flex flex-col justify-center items-center list-none">
                            <li className="text-xl/[2]">🚀 Your goal is to escape the maze. 🚀</li>
                            <li className="text-xl/[2]">⚠️ Some paths lead to infinite traps, others may confuse you. ⚠️</li>
                            <li className="text-xl/[2]">🔎 Clues exist, but deception lurks around every corner. 🔎</li>
                            <li className="text-xl/[2]">🕵️ Click wisely - some buttons may lead to wrong paths. 🕵️</li>
                            <li className="text-xl/[2]">🪄 Be aware! The purpose of the Maze Challenge is to trick you. 🪄</li>
                        </ul>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="footer-container w-full h-auto p-2 flex justify-center items-center gap-28 grow text-base">
                    <div className="button-container">
                        <Link to="/" className="text-xl no-underline text-white w-full h-full flex justify-center items-center ">
                            <button className="border-0 rounded-lg w-32 h-12 transition-transform duration-300 ease-in-out transform hover:scale-125 bg-[rgb(0,100,0)] cursor-pointer">
                                Back to Start
                            </button>
                        </Link>
                    </div>

                    <div className="clock-container text-base">
                        <h2 className="text-lg font-bold">🕰️ Current Time 🕰️</h2>
                        <p className="clock text-xl">{currentTime}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}