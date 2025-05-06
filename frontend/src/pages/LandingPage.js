import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const LandingPage = () => (
    <div className="min-h-screen flex flex-col">
        <Header
            rightButton={
                <Link
                    to="/signin"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md text-sm"
                >
                    <i className="fas fa-sign-in-alt" />
                    Sign In
                </Link>
            }
        />
        <main className="flex-1 flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Your thoughts, organized beautifully</h2>
            <p className="text-gray-500 dark:text-gray-300 mb-6">A minimal note-taking app to keep track of ideas and tasks.</p>
            <Link
                to="/signin"
                className="flex items-center gap-2 px-6 py-3 rounded-lg text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-md text-base"
            >
                <i className="fas fa-rocket" />
                Get Started
            </Link>
        </main>
    </div>
);

export default LandingPage;