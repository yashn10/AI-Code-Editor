// app/[user]/page.jsx
"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion'; // For hover animations
import AOS from 'aos';
import 'aos/dist/aos.css';

// Initialize AOS on component mount
if (typeof window !== 'undefined') {
    AOS.init({ duration: 1000, once: true });
}

const Page = () => {
    // Card animation variants
    const cardVariants = {
        hover: {
            scale: 1.03,
            boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3)',
            transition: { type: 'spring', stiffness: 300 },
        },
    };

    return (

        <div className="relative py-20 min-w-full bg-gradient-to-br from-gray-800 via-gray-900 to-indigo-900 text-white overflow-hidden">
            {/* Particle Animation Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-particle top-10 left-20"></div>
                <div className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-particle top-20 left-40"></div>
                <div className="absolute w-1 h-1 bg-white rounded-full opacity-25 animate-particle top-30 right-30"></div>
                <div className="absolute w-2 h-2 bg-white rounded-full opacity-15 animate-particle bottom-20 left-60"></div>
                <div className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-particle bottom-40 right-20"></div>
                <div className="absolute w-1 h-1 bg-white rounded-full opacity-25 animate-particle top-40 left-80"></div>
                <div className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-particle top-50 right-50"></div>
                <div className="absolute w-1 h-1 bg-white rounded-full opacity-15 animate-particle bottom-30 left-30"></div>
                <div className="absolute w-2 h-2 bg-white rounded-full opacity-30 animate-particle bottom-50 right-40"></div>
                <div className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-particle top-60 left-10"></div>
                <div className="absolute w-2 h-2 bg-white rounded-full opacity-25 animate-particle top-70 right-60"></div>
                <div className="absolute w-1 h-1 bg-white rounded-full opacity-15 animate-particle bottom-10 left-50"></div>
                <div className="absolute w-2 h-2 bg-white rounded-full opacity-30 animate-particle bottom-60 right-10"></div>
                <div className="absolute w-1 h-1 bg-white rounded-full opacity-20 animate-particle top-80 left-70"></div>
                <div className="absolute w-2 h-2 bg-white rounded-full opacity-25 animate-particle top-90 right-70"></div>
            </div>

            {/* Background Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

            {/* Header */}
            <header className="relative z-10 p-6">
                <h1
                    className="text-4xl md:text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-purple-200"
                    data-aos="fade-down"
                >
                    CodeCanvas AI
                </h1>
                <p
                    className="text-center mt-2 text-base md:text-lg opacity-70 tracking-wide"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    Your AI-Powered Solution for Web Development
                </p>
            </header>

            {/* Main Content */}
            <main className="relative z-10 container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {/* Card 1: Generate Code from Wireframe */}
                    <motion.div
                        className="relative p-6 rounded-xl glass shadow-lg"
                        variants={cardVariants}
                        whileHover="hover"
                        data-aos="fade-right"
                    >
                        <h2 className="text-2xl font-semibold mb-3 text-indigo-100">Code from Wireframe</h2>
                        <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                            Upload a wireframe image, and our AI will generate clean, functional code in HTML-CSS-JS or ReactJS, ready to bring your designs to life.
                        </p>
                        <Link href="/WireframeToCode">
                            <button className="relative w-full py-2 px-4 bg-gradient-to-r from-indigo-500 to-indigo-400 hover:from-indigo-600 hover:to-indigo-500 rounded-lg text-white font-medium text-sm transition-all duration-300 transform hover:scale-102 shadow-md">
                                Start Generating
                            </button>
                        </Link>
                    </motion.div>

                    {/* Card 2: Generate Full Project */}
                    <motion.div
                        className="relative p-6 rounded-xl glass shadow-lg"
                        variants={cardVariants}
                        whileHover="hover"
                        data-aos="fade-left"
                    >
                        <h2 className="text-2xl font-semibold mb-3 text-purple-100">Full Project Creation</h2>
                        <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                            Describe your project, and our AI will build a complete, production-ready codebase with frontend and backend, tailored to your needs.
                        </p>
                        <Link href="/Main">
                            <button className="relative w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-purple-400 hover:from-purple-600 hover:to-purple-500 rounded-lg text-white font-medium text-sm transition-all duration-300 transform hover:scale-102 shadow-md">
                                Create Project
                            </button>
                        </Link>
                    </motion.div>
                </div>
            </main>


            {/* Inline Styles */}
            <style jsx>{`
        .glass {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.15);
          position: relative;
          overflow: hidden;
        }

        .particles {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: transparent;
        }

        .particles::before,
        .particles::after {
          content: '';
          position: absolute;
          width: 2px;
          height: 2px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
          animation: float 15s infinite linear;
        }

        .particles::before {
          top: 20%;
          left: 30%;
          animation-delay: 0s;
        }

        .particles::after {
          top: 60%;
          left: 70%;
          animation-delay: 5s;
        }

        @keyframes float {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 0.8;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            transform: translate(100px, -100px) scale(1.5);
            opacity: 0;
          }
        }

        /* Additional particle elements for more density */
        .particles > div:nth-child(1) {
          position: absolute;
          top: 10%;
          left: 50%;
          width: 3px;
          height: 3px;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 50%;
          box-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
          animation: float 20s infinite linear;
          animation-delay: 2s;
        }

        .particles > div:nth-child(2) {
          position: absolute;
          top: 80%;
          left: 20%;
          width: 2px;
          height: 2px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          box-shadow: 0 0 5px rgba(255, 255, 255, 0.2);
          animation: float 18s infinite linear;
          animation-delay: 8s;
        }
      `}</style>
        </div>

    );
};

export default Page;