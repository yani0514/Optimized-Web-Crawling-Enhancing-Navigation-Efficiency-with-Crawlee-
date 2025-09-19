import React from "react";
import { Link } from "react-router-dom";

export default function DoorB() {
  return (
    <div className="body font-['Arial'] text-base flex justify-center items-center bg-center bg-[url(/assets/Maze-web-page-resized-1200-668.jpg.webp)] bg-no-repeat bg-cover bg-scroll w-svw h-svh">
      <div className="container w-[70%] h-auto p-8 bg-[rgba(255,255,255,0.7)] text-base text-[rgb(63,63,63)] text-center flex flex-col justify-center items-center rounded-3xl">
        <div className="header-container w-full h-auto flex flex-col justify-center items-center grow text-4xl mb-3">
          <h1>🕵️ You Have Entered the Secret Room 🕵️</h1>
        </div>

        <div className="illusion-container w-full h-auto flex flex-col justify-center items-center grow mt-5 mr-5 mb-3 ml-5 text-xl">
          <p className="text-2xl/[1.5]">
            🌀 This place feels... strangely familiar. Reality is an illusion.🌀
          </p>
          <p className="click text-2xl/[1.5] mt-2.5 font-semibold">
            🗝️ Click the button below to investigate the mystery 🗝️
          </p>
        </div>

        <div className="button-container w-full h-auto flex justify-center items-center grow mt-3 mr-5 mb-5 ml-5">
          <Link className="back-to-start-link text-white text-xl" to={"/"}>
            <button className="flex justify-between items-center p-4 border-none rounded-xl w-auto h-12 bg-[rgb(0,100,0)] transition-transform duration-300 ease-in-out transform hover:scale-125 cursor-pointer">🔎 Investigate the Mystery 🔎</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
