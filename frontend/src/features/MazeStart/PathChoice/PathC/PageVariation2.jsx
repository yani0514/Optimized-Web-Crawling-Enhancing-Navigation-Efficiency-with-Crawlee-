import React from "react";
import { Link } from "react-router-dom";

export default function PageVariation2() {
    return (
        <div className="body min-w-screen min-h-screen flex justify-center items-center p-4 bg-[url(/assets/Maze-web-page-resized-1200-668.jpg.webp)] bg-center bg-no-repeat bg-cover bg-scroll">
            <div className="w-1/2 flex flex-col justify-center items-center p-6 bg-gray-800 text-white rounded-xl shadow-lg">
                {/* Header Section */}
                <div className="text-center mb-6">
                    <h1 className="text-3xl font-bold text-yellow-400">📰 Maze News - The Mysterious Disappearances</h1>
                    <p className="text-gray-300 mt-2 italic">"People enter… but not everyone leaves."</p>
                </div>

                {/* News Story Content */}
                <div className="text-lg space-y-4">
                    <p>
                        Authorities have reported an increasing number of **missing people cases** linked to the infamous 
                        labyrinth known as **The Maze Challenge**. What started as an ordinary challenge has now become a **terrifying mystery**.
                    </p>

                    <h2 className="text-xl font-bold text-yellow-300">🔍 Strange Sightings</h2>
                    <p>
                        Survivors claim to have seen **shadowy figures** lurking behind walls, **flickering torches** in areas 
                        that should be abandoned, and **whispers in unknown languages**. Many believe the maze is haunted, 
                        while others suggest a **secret organization** is behind it.
                    </p>

                    <h2 className="text-xl font-bold text-yellow-300">📍 Last Known Locations</h2>
                    <ul className="list-disc list-inside space-y-2">
                        <li>📍 **The Spiral Corridor** - A twisting path that makes people disoriented.</li>
                        <li>📍 **The Room of Infinite Doors** - Exits lead back to the same place.</li>
                        <li>📍 **The Silent Crossing** - No sound can be heard here. No one who enters is seen again.</li>
                    </ul>

                    <h2 className="text-xl font-bold text-yellow-300">⚠️ Are You Trapped?</h2>
                    <p>
                        If you or someone you know is lost inside the maze, **Maze News urges you to seek hidden clues** 
                        left by previous explorers. Some claim that **patterns on the walls** might hold the key to escape.
                    </p>
                </div>

                {/* Call to Action */}
                <div className="mt-6 text-center">
                    <Link to="/">
                        <button className="px-5 py-3 bg-yellow-600 text-white text-lg font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out hover:scale-125 cursor-pointer">
                            🏃 Escape While You Can! 🏃
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
