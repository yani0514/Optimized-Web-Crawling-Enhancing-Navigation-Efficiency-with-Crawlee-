import React from "react";
import { Link } from "react-router-dom";

export default function DifferentURLSameContent() {
    return(
        <div className="body font-['Arial'] text-base flex justify-center items-center bg-center bg-[url(/assets/Maze-web-page-resized-1200-668.jpg.webp)] bg-no-repeat bg-cover bg-scroll w-svw h-svh">
            <div className="container w-[70%] h-auto p-10 bg-[rgba(255,255,255,0.7)] text-base text-[rgb(63,63,63)] text-center flex flex-col justify-center items-center rounded-3xl">
                <header className="pt-4 pr-8 pb-4 pl-8 text-5xl">
                    <h1 className="text-4xl">🚪 The Mysterious Door Challenge 🚪</h1>
                    <p className="pt-5 text-xl">There are two exactly the same doors in front of you. Only one of them is the right on... or is it?</p>
                </header>
            
                <div className="door-choice w-auto h-auto text-base p-2">
                    <p className="text-2xl mb-4 font-semibold">Which door will you choose?</p>

                    <div className="door-buttons flex justify-center gap-7">
                        <Link className="doorA-link text-white text-xl" to={"/DoorA"}>
                            <button className="doorA border-none rounded-xl w-32 h-12 bg-[rgb(0,100,0)] transition-transform duration-300 ease-in-out transform hover:scale-125 cursor-pointer">Door A</button>
                        </Link>
                        
                        <Link className="doorB-link text-white text-xl" to={"/DoorB"}>
                            <button className="doorB border-none rounded-xl w-32 h-12 bg-[rgb(0,100,0)] transition-transform duration-300 ease-in-out transform hover:scale-125 cursor-pointer">Door B</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}