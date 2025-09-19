import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function PageVariation3() {
    const [formData, setFormData] = useState({
        name: "",
        lastSeen: "",
        description: "",
        contact: ""
    });

    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:8080/submit-report", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Something went wrong!");
            }

            // ✅ Show notification & clear form
            setSubmitted(true);
            setFormData({ name: "", lastSeen: "", description: "", contact: "" });
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="body font-['Arial'] w-svw h-svh flex flex-col justify-center items-center bg-center bg-[url(/assets/Maze-web-page-resized-1200-668.jpg.webp)] bg-no-repeat bg-cover bg-scroll">
            {error && <p className="error text-red-500 text-center mb-4">{error}</p>}

            <div className="report-container w-3/7 h-5/6 p-5 flex flex-col justify-center items-center bg-gray-900 text-white rounded-xl shadow-lg border border-red-500">
                <div className="header-container w-full flex flex-col justify-center items-center grow text-center">
                    <h1 className="text-4xl font-bold text-red-400">🆘 Report a Missing Person 🆘</h1>
                    <p className="text-gray-300 mt-2 italic">
                        If someone you know <strong>entered the maze and never returned</strong>, submit a report below.
                    </p>
                </div>

                <form className="report-form w-full h-auto flex flex-col justify-items-start grow mt-10" onSubmit={handleSubmit}>
                    <div className="name-container">
                        <label className="block text-lg font-semibold">🔍 Missing Person's Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full mt-1.5 p-2 bg-gray-800 border border-gray-600 rounded-xl text-white"
                        />
                    </div>

                    <div className="lastSeen-container">
                        <label className="block text-lg font-semibold">📍 Last Seen Location:</label>
                        <input
                            type="text"
                            name="lastSeen"
                            value={formData.lastSeen}
                            onChange={handleChange}
                            required
                            className="w-full mt-1.5 p-2 bg-gray-800 border border-gray-600 rounded-xl text-white"
                        />
                    </div>

                    <div className="description-container">
                        <label className="block text-lg font-semibold">📝 Description:</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full mt-1.5 p-2 bg-gray-800 border border-gray-600 rounded-xl text-white"
                        />
                    </div>

                    <div className="contact-container">
                        <label className="block text-lg font-semibold">📞 Your Contact Info:</label>
                        <input
                            type="text"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                            required
                            className="w-full mt-1.5 p-2 bg-gray-800 border border-gray-600 rounded-xl text-white"
                        />
                    </div>

                    <div className="button-container flex justify-center items-center">
                        <button
                            className="submission w-1/2 py-2 mt-4 bg-red-600 text-white font-semibold rounded-lg shadow-md transition-transform duration-500 ease-in-out transform hover:scale-125 cursor-pointer"
                            type="submit">
                            🚨 Submit Report
                        </button>
                    </div>
                </form>
            </div>

            {/* ✅ Floating Notification in Bottom-Right Corner */}
            {submitted && (
                <Link to={"/"} className="fixed bottom-5 right-5 bg-green-900 text-white py-2 px-4 rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 cursor-pointer w-auto block">
                    <div className="w-full h-full flex justify-center items-center">
                        ✅ Report submitted successfully! Our Maze Search Team will investigate.
                    </div>
                </Link>            
            )}
        </div>
    );
}
