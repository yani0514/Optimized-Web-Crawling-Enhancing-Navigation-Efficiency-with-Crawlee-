import React from 'react';
import { Link } from 'react-router-dom';

export default function MazeStart() {
  return (
    <div className="body font-['Arial'] text-base flex justify-center items-center bg-center bg-[url(/assets/Maze-web-page-resized-1200-668.jpg.webp)] bg-no-repeat bg-cover bg-scroll w-svw h-svh">
      <div className="container w-[70%] h-auto p-10 bg-[rgba(255,255,255,0.7)] text-base text-[rgb(63,63,63)] text-center flex flex-col justify-center items-center rounded-3xl">
        <div className="header-container w-full flex flex-col justify-center items-center grow text-5xl">
            <h1 className="p-2.5">Welcome to the Maze Challenge!</h1>
            <p className="text-2xl">Can you find your way out? You can start your maze bellow:</p>
        </div>

        <div className="maze-start-container w-full flex justify-center items-center flex-col grow text-xl">
          <p className="pt-15 mb-2.5 text-2xl font-semibold">Click the button bellow to begin your journey!</p>

          <div className="buttons-container flex gap-15">
              <Link className="start-link text-xl no-underline text-white" to={"/PathChoice"}>
                <button className="start-button border-none rounded-lg w-32 h-12 transition-transform duration-300 ease-in-out transform hover:scale-125 bg-[rgb(0,100,0)] cursor-pointer">
                  Start Maze
                </button>
              </Link>

              <Link className="rules-link text-xl no-underline text-white" to={"/Rules"}>
                <button className="rules-button border-none rounded-lg w-32 h-12 transition-transform duration-300 ease-in-out transform hover:scale-125 bg-[rgb(0,100,0)] cursor-pointer">
                  Rules
                </button>
              </Link>
          </div>
        </div>
      </div>
    </div>
  )
}