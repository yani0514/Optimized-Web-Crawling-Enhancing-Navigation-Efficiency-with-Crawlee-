import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function PathChoice() {
    const [ currentTime, setCurrentTime ] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        setTimeout(() => {
            setCurrentTime(new Date().toLocaleTimeString())
        }, 1000)
    },);
  return (
    <div className="body font-['Arial'] text-base flex justify-center items-center bg-center bg-[url(/assets/Maze-web-page-resized-1200-668.jpg.webp)] bg-no-repeat bg-cover bg-scroll w-svw h-svh">
        <div className="container w-[70%] h-auto p-10 bg-[rgba(255,255,255,0.7)] text-base text-[rgb(63,63,63)] text-center flex flex-col justify-center items-center rounded-3xl">
            <div className="header-container w-full flex justify-center items-center flex-col grow pt-2 pr-8 pb-3.5 pl-8 text-4xl">
                <h1 className="text-5xl">⛓You have reached a fork in the Maze⛓</h1>
                <p className="pt-5 text-2xl">⚠️⚠️⚠️Choose wisely! Some paths lead forward, others will trap you.⚠️⚠️⚠️</p>
            </div>
        
            <div className="maze-path w-full h-auto text-base p-2">
                <p className="text-3xl mb-4 font-semibold">Which way will you take?</p>

                <div className="path-buttons flex justify-center gap-7">
                    <Link className="back-to-start-link no-underline text-white text-xl" to={"/"}>
                        <button className="go-back border-none rounded-lg w-32 h-12 bg-[rgb(0,100,0)] transition-transform duration-300 ease-in-out transform hover:scale-125 cursor-pointer">
                            Back to Start
                        </button>
                    </Link>
                    
                    <Link className="pathA-link no-underline text-white text-xl" to={"/DifferentURLSameContent"}>
                        <button className="pathA border-none rounded-lg w-32 h-12 bg-[rgb(0,100,0)] transition-transform duration-300 ease-in-out transform hover:scale-125 cursor-pointer">
                            Path A
                        </button>
                    </Link>

                    <Link className="pathB-link no-underline text-white text-xl" to={"/RandomParameter"}>
                        <button className="pathB border-none rounded-lg w-32 h-12 bg-[rgb(0,100,0)] transition-transform duration-300 ease-in-out transform hover:scale-125 cursor-pointer">
                            Path B
                        </button>
                    </Link>
                    
                    <Link className="pathC-link no-underline text-white text-xl" to={"/SameURLDifferentContent"}>
                        <button className="pathC border-none rounded-lg w-32 h-12 bg-[rgb(0,100,0)] transition-transform duration-300 ease-in-out transform hover:scale-125 cursor-pointer">
                            Path C
                        </button>
                    </Link>
                </div>
            </div>

            <div className="clock-container mt-6 text-base">
                <h2 className="text-lg font-bold">🕰️ Current Time 🕰️</h2>
                <p className="clock text-xl">{currentTime}</p>
            </div>
        </div>
    </div>
  )
}