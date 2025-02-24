"use client"

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import Link from 'next/link';
// import Footer from '../components/Footer'; // Uncomment if you have a Footer component

const HomePage = () => {

    // Initialize AOS on mount
    useEffect(() => {
        AOS.init({
            duration: 800, // Animation duration in ms
            once: true,    // Whether animation should happen only once
        });
    }, []);

    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-blue-500 to-purple-500 text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="text-center" data-aos="fade-up">
                        {/* Hero Image (Picsum) */}
                        <img
                            src="https://picsum.photos/seed/heroimage/300/300"
                            alt="Hero"
                            className="mx-auto mb-8 w-48 h-48 rounded-full shadow-xl"
                        />
                        <h1 className="text-5xl font-semibold mb-4">
                            Generate Code with Ease
                        </h1>
                        <p className="text-2xl mb-8">
                            AI-powered code generation and live preview in your browser.
                        </p>
                        <Link href="/Main" className="bg-white text-blue-500 py-3 px-6 rounded-full text-xl font-semibold hover:shadow-md transition-shadow duration-300">
                            Get Started
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-black">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-semibold text-center mb-12" data-aos="fade-up">
                        Key Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-gray-800 text-gray-200 shadow-md p-6 rounded" data-aos="fade-right">
                            <img
                                src="https://picsum.photos/seed/feature1/400/200"
                                alt="Feature 1"
                                className="mb-4 w-full h-32 object-cover rounded"
                            />
                            <h3 className="text-2xl font-semibold mb-4">Code Generation</h3>
                            <p>
                                Generate full-stack code with files and folders based on your prompts. Get
                                instant structure and boilerplate for your React projects.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-gray-800 text-gray-200 shadow-md p-6 rounded" data-aos="fade-up">
                            <img
                                src="https://picsum.photos/seed/feature2/400/200"
                                alt="Feature 2"
                                className="mb-4 w-full h-32 object-cover rounded"
                            />
                            <h3 className="text-2xl font-semibold mb-4">Live Preview</h3>
                            <p>
                                See your code in action with integrated Sandpack. Make changes on the fly and
                                watch your application update in real-time.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-gray-800 text-gray-200 shadow-md p-6 rounded" data-aos="fade-left">
                            <img
                                src="https://picsum.photos/seed/feature3/400/200"
                                alt="Feature 3"
                                className="mb-4 w-full h-32 object-cover rounded"
                            />
                            <h3 className="text-2xl font-semibold mb-4">One-Click Deployment</h3>
                            <p>
                                Easily deploy your app to services like Netlify or Cloudflare with a single
                                click. Simplify your workflow from development to production.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Live Demo Section */}
            <section className="bg-black text-gray-200 py-20">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-semibold text-center mb-12" data-aos="fade-up">
                        Live Demo
                    </h2>
                    <p className="text-center max-w-xl mx-auto mb-8" data-aos="fade-up">
                        Experience the power of AI-assisted code generation firsthand. Watch as your code
                        transforms from prompts into a fully functional application.
                    </p>
                    {/* Placeholder for Sandpack component */}
                    {/* <SandpackComponent /> */}
                    <div className="flex justify-center" data-aos="zoom-in">
                        <div className="bg-gray-800 text-gray-200 p-8 rounded shadow-lg max-w-xl w-full text-center">
                            <h3 className="text-xl font-bold mb-4">Sandpack Preview Placeholder</h3>
                            <p className="text-gray-200">
                                Your live editor or preview would appear here.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-black">
                <div className="container mx-auto px-4" data-aos="fade-up">
                    <div className="flex flex-col md:flex-row items-center justify-between bg-gray-600 p-6 rounded shadow-lg">
                        <div className="mb-4 md:mb-0">
                            <h3 className="text-2xl font-semibold mb-2 text-gray-200">
                                Ready to Start Building?
                            </h3>
                            <p className="text-gray-200">
                                Unleash your creativity and let AI handle the tedious setup.
                            </p>
                        </div>
                        <Link href="/Main" className="bg-blue-500 text-white py-3 px-6 rounded-full font-semibold hover:bg-blue-600 transition-colors duration-300">
                            Create Your Project
                        </Link>
                    </div>
                </div>
            </section>

            {/* <Footer /> Uncomment if you have a Footer component */}
        </div>
    );
};

export default HomePage;
