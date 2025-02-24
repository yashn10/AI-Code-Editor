"use client"

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import IntroductionCarousel from './AboutCorousal';

const AboutPage = () => {
    // Initialize AOS
    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);


    return (

        <div style={{ width: '100%', backgroundColor: "black" }}>
            {/* Introduction Section */}
            <IntroductionCarousel />

            {/* Advantages Section */}
            <section className="py-20">
                <div className="container mx-auto px-4" data-aos="fade-up">
                    <h2 className="text-3xl font-semibold text-center mb-12 text-white">
                        Why Choose Our App?
                    </h2>
                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Card 1 */}
                        <div
                            className="bg-gray-800 shadow-md p-6 rounded transition-transform transform hover:-translate-y-2 hover:shadow-xl"
                            data-aos="fade-right"
                        >
                            <img
                                src="https://picsum.photos/seed/advantage1/400/200"
                                alt="Advantage 1"
                                className="mb-4 w-full h-50 object-cover rounded"
                            />
                            <h3 className="text-2xl font-semibold mb-4 text-gray-200">
                                Time-Saving
                            </h3>
                            <p className="text-gray-400">
                                Generate code in seconds with AI assistance, letting you focus on the core
                                logic and design.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div
                            className="bg-gray-800 shadow-md p-6 rounded transition-transform transform hover:-translate-y-2 hover:shadow-xl"
                            data-aos="fade-left"
                        >
                            <img
                                src="https://picsum.photos/seed/advantage2/400/200"
                                alt="Advantage 2"
                                className="mb-4 w-full h-50 object-cover rounded"
                            />
                            <h3 className="text-2xl font-semibold mb-4 text-gray-200">
                                Live Preview
                            </h3>
                            <p className="text-gray-400">
                                See your changes in real-time, eliminating guesswork and speeding up
                                development.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div
                            className="bg-gray-800 shadow-md p-6 rounded transition-transform transform hover:-translate-y-2 hover:shadow-xl"
                            data-aos="fade-right"
                        >
                            <img
                                src="https://picsum.photos/seed/advantage3/400/200"
                                alt="Advantage 3"
                                className="mb-4 w-full h-50 object-cover rounded"
                            />
                            <h3 className="text-2xl font-semibold mb-4 text-gray-200">
                                Collaboration
                            </h3>
                            <p className="text-gray-400">
                                Share your projects with team members instantly. Get feedback and iterate
                                together.
                            </p>
                        </div>

                        {/* Card 4 */}
                        <div
                            className="bg-gray-800 shadow-md p-6 rounded transition-transform transform hover:-translate-y-2 hover:shadow-xl"
                            data-aos="fade-left"
                        >
                            <img
                                src="https://picsum.photos/seed/advantage4/400/200"
                                alt="Advantage 4"
                                className="mb-4 w-full h-50 object-cover rounded"
                            />
                            <h3 className="text-2xl font-semibold mb-4 text-gray-200">
                                One-Click Deploy
                            </h3>
                            <p className="text-gray-400">
                                Deploy your application to hosting platforms like Netlify or Cloudflare
                                with a single click.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Use Cases Section */}
            <section className="bg-black py-20">
                <div className="container mx-auto px-4">
                    <div data-aos="fade-up">
                        <h2 className="text-3xl font-semibold text-center mb-12 text-gray-400">
                            Perfect for Every Developer
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Item 1 */}
                        <div
                            className="relative group overflow-hidden rounded-lg shadow-md"
                            data-aos="zoom-in"
                        >
                            <img
                                src="https://picsum.photos/seed/usecase1/800/600"
                                alt="Prototyping"
                                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <h3 className="text-white text-xl font-semibold text-center px-4">
                                    Prototyping
                                </h3>
                            </div>
                        </div>

                        {/* Item 2 */}
                        <div
                            className="relative group overflow-hidden rounded-lg shadow-md"
                            data-aos="zoom-in"
                        >
                            <img
                                src="https://picsum.photos/seed/usecase2/800/600"
                                alt="Learning"
                                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <h3 className="text-white text-xl font-semibold text-center px-4">
                                    Learning
                                </h3>
                            </div>
                        </div>

                        {/* Item 3 */}
                        <div
                            className="relative group overflow-hidden rounded-lg shadow-md"
                            data-aos="zoom-in"
                        >
                            <img
                                src="https://picsum.photos/seed/usecase3/800/600"
                                alt="Freelancing"
                                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <h3 className="text-white text-xl font-semibold text-center px-4">
                                    Freelancing
                                </h3>
                            </div>
                        </div>

                        {/* Item 4 */}
                        <div
                            className="relative group overflow-hidden rounded-lg shadow-md"
                            data-aos="zoom-in"
                        >
                            <img
                                src="https://picsum.photos/seed/usecase4/800/600"
                                alt="Team Collaboration"
                                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <h3 className="text-white text-xl font-semibold text-center px-4">
                                    Team Collaboration
                                </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* How to Use Section */}
            <section className="bg-black py-20">
                <div className="container mx-auto px-4" data-aos="fade-up">
                    <h2 className="text-3xl font-semibold text-center mb-12 text-gray-200">
                        Getting Started
                    </h2>
                    <ol className="list-decimal pl-6 text-gray-400 max-w-2xl mx-auto space-y-4">
                        <li>Sign up for an account or log in with your existing credentials.</li>
                        <li>Describe the project you want to build or the features you need.</li>
                        <li>Generate the code and folder structure using our AI engine.</li>
                        <li>Customize the code as needed and see a live preview instantly.</li>
                        <li>Collaborate with your team, commit changes, and track versions.</li>
                        <li>Deploy the application to a hosting platform of your choice.</li>
                    </ol>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div data-aos="fade-up">
                        <h2 className="text-3xl font-semibold text-center mb-12 text-gray-200">
                            Meet the Team
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Team Member 1 */}
                        <div
                            className="text-center bg-gray-800 p-6 rounded shadow-md transition-transform transform hover:-translate-y-2 hover:shadow-xl"
                            data-aos="fade-right"
                        >
                            <img
                                src="https://picsum.photos/seed/team1/200/200"
                                alt="John Doe"
                                className="mb-4 w-24 h-24 rounded-full mx-auto object-cover"
                            />
                            <h3 className="text-xl font-semibold mb-2 text-gray-200">
                                John Doe
                            </h3>
                            <p className="text-gray-400">Founder & CEO</p>
                        </div>

                        {/* Team Member 2 */}
                        <div
                            className="text-center bg-gray-800 p-6 rounded shadow-md transition-transform transform hover:-translate-y-2 hover:shadow-xl"
                            data-aos="fade-up"
                        >
                            <img
                                src="https://picsum.photos/seed/team2/200/200"
                                alt="Jane Smith"
                                className="mb-4 w-24 h-24 rounded-full mx-auto object-cover"
                            />
                            <h3 className="text-xl font-semibold mb-2 text-gray-200">
                                Jane Smith
                            </h3>
                            <p className="text-gray-400">Lead Developer</p>
                        </div>

                        {/* Team Member 3 */}
                        <div
                            className="text-center bg-gray-800 p-6 rounded shadow-md transition-transform transform hover:-translate-y-2 hover:shadow-xl"
                            data-aos="fade-left"
                        >
                            <img
                                src="https://picsum.photos/seed/team3/200/200"
                                alt="Mike Johnson"
                                className="mb-4 w-24 h-24 rounded-full mx-auto object-cover"
                            />
                            <h3 className="text-xl font-semibold mb-2 text-gray-200">
                                Mike Johnson
                            </h3>
                            <p className="text-gray-400">Designer</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA / Footer Section */}
            {/* Uncomment or modify as needed
      <Footer />
      */}
        </div>

    );
};

export default AboutPage;
