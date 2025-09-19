import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function RandomParameter() {
    const navigate = useNavigate();
    const [content, setContent] = useState({});

    const differentContent = {
        corn: {
            title: "🌽 Corn Mazes 🌽",
            description: "Popular in autumn festivals, corn mazes are temporary mazes created in cornfields. They are fun for families and often include puzzles or hidden checkpoints.",
            image: "/assets/corn-maze-hero24.jpg"
        },

        minotaur: {
            title: "🏛️ The Myth of the Minotaur’s Labyrinth 🏛️",
            description: "In Greek mythology, King Minos of Crete had a maze built to trap the Minotaur, a fearsome creature. Theseus, with the help of Ariadne’s thread, found his way out after slaying the beast!",
            image: "/assets/labyrinth-map1728-lighter.jpg"
        },

        famous: {
            title: "🪞 Mirror Mazes 🪞",
            description: "These mazes use mirrors to create optical illusions, making navigation tricky. You must rely on depth perception rather than walls to find your way.",
            image: "/assets/maze6.14.2e16d0ba.fill-735x490.png"
        }
    };
    
    useEffect( () => {
        const predefinedParameters = Object.keys(differentContent);
        const randomParameter = predefinedParameters[Math.floor(Math.random() * predefinedParameters.length)];

        // Update the URL with a new random parameter on reload
        navigate(`?page=${randomParameter}`, { replace: true });

        setContent(differentContent[randomParameter]);
    }, [navigate]);

    return (
        <div className="body font-['Arial'] text-base flex justify-center items-center bg-center bg-[url(/assets/Maze-web-page-resized-1200-668.jpg.webp)] bg-no-repeat bg-cover bg-scroll w-svw h-svh">
            <div className="container w-[70%] h-auto p-10 bg-[rgba(255,255,255,0.7)] text-base text-[rgb(63,63,63)] text-center flex flex-col justify-center items-center rounded-3xl">
                <h1 className="text-3xl font-bold mb-4">{content.title}</h1>
                <img src={content.image} alt={content.title} className="w-auto h-auto object-cover mb-4 rounded-lg shadow-lg" />
                <p className="text-lg mb-4">{content.description}</p>
                <Link to="/" className="flex justify-center items-center text-white text-center border-none rounded-lg w-32 h-12 bg-[rgb(0,100,0)] transition-transform duration-300 ease-in-out transform hover:scale-125 ">Go Back</Link>
            </div>
        </div>
    );
}