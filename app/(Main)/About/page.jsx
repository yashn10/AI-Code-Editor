"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";

// Custom Intersection Observer Hook for Scroll Animations
const useOnScreen = (options) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsVisible(true);
                observer.unobserve(entry.target);
            }
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, options]);

    return [ref, isVisible];
};

const AboutPage = () => {
    // State for Use Cases Modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalIndex, setModalIndex] = useState(0);
    const useCaseImages = [
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=2070&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop",
    ];
    const useCaseTitles = ["Prototyping", "Learning", "Freelancing", "Team Collaboration"];
    const useCaseDescriptions = [
        "Rapidly prototype your next big idea with AI-driven tools.",
        "Learn coding concepts with real-time feedback and examples.",
        "Freelancers can deliver projects faster with streamlined workflows.",
        "Collaborate seamlessly with your team on complex projects.",
    ];

    // State for How to Use Section
    const [activeStep, setActiveStep] = useState(null);
    const stepDetails = [
        "Create an account using your email or connect with Google for a seamless start.",
        "Provide a detailed prompt or select a pre-built template to kick off your project.",
        "Let our AI generate code, folders, and structures tailored to your needs.",
        "Edit the code live and preview changes instantly with our built-in editor.",
        "Invite team members via email or link, and use version control features.",
        "Choose your preferred platform (e.g., Netlify, Vercel) and deploy with one click.",
    ];

    // State for Carousel Auto-Scroll
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        {
            img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2070&auto=format&fit=crop",
            text: "Our application leverages advanced AI to streamline web development, offering you instant code generation and live previews directly in your browser.",
        },
        {
            img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
            text: "Collaborate with your team, generate full-stack solutions, and integrate third-party libraries—all from a single, intuitive interface.",
        },
        {
            img: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=2070&auto=format&fit=crop",
            text: "Build, iterate, and deploy projects faster than ever before with our streamlined setup and boilerplate process.",
        },
        {
            img: "https://images.unsplash.com/photo-1497215728101-a291402b4b5b?q=80&w=2070&auto=format&fit=crop",
            text: "Focus on creativity and functionality, while our AI takes care of the heavy lifting in code generation and architecture.",
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [slides.length]);

    // Intersection Observer for Scroll Animations
    const [heroRef, heroVisible] = useOnScreen({ threshold: 0.1 });
    const [advantagesRef, advantagesVisible] = useOnScreen({ threshold: 0.1 });
    const [useCasesRef, useCasesVisible] = useOnScreen({ threshold: 0.1 });
    const [howToUseRef, howToUseVisible] = useOnScreen({ threshold: 0.1 });
    const [teamRef, teamVisible] = useOnScreen({ threshold: 0.1 });

    return (

        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300">

            {/* Hero Section */}
            <section
                ref={heroRef}
                className={`relative w-full h-screen overflow-hidden bg-gradient-to-b from-gray-900 to-blue-900 dark:from-gray-950 dark:to-blue-950 transition-all duration-1000 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
            >
                {/* Increased Particles (15 total) */}
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
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent">
                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg animate-fade-in">
                            Welcome to CodeCanvas AI
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 mb-6 max-w-2xl animate-fade-in-delay">
                            The future of web development is here—unleash your creativity with AI-powered tools.
                        </p>
                        <Button
                            className="bg-blue-900 text-white px-8 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors animate-fade-in-delay"
                        >
                            Get Started
                        </Button>
                    </div>
                </div>
            </section>

            {/* Introduction Carousel */}
            <section className="w-full py-16 bg-gray-100 dark:bg-gray-800">
                <div className="relative w-full h-[60vh] overflow-x-auto snap-x snap-mandatory scroll-smooth">
                    <div className="flex w-[400%] h-full">
                        {slides.map((slide, index) => (
                            <div
                                key={index}
                                className="w-[25%] h-full snap-center flex-shrink-0 transition-opacity duration-500"
                                style={{ opacity: currentSlide === index ? 1 : 0.5 }}
                            >
                                <img src={slide.img} alt={`Slide ${index + 1}`} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                                    <h2 className="text-white text-xl sm:text-2xl md:text-4xl font-semibold text-center max-w-3xl leading-relaxed">
                                        {slide.text}
                                    </h2>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Dots Navigation */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? "bg-white scale-125" : "bg-gray-400"
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Advantages Section */}
            <section
                ref={advantagesRef}
                className={`py-20 bg-gray-200 dark:bg-gray-900 transition-all duration-1000 ${advantagesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
            >
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">
                        Why Choose Bolt.New?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                title: "Time-Saving",
                                desc: "Generate code in seconds with AI assistance, letting you focus on logic and design.",
                                icon: "https://img.icons8.com/ios-filled/50/ffffff/clock.png",
                            },
                            {
                                title: "Live Preview",
                                desc: "See your changes in real-time, eliminating guesswork and speeding up development.",
                                icon: "https://img.icons8.com/ios-filled/50/ffffff/visible.png",
                            },
                            {
                                title: "Collaboration",
                                desc: "Share projects with your team instantly, get feedback, and iterate together.",
                                icon: "https://img.icons8.com/ios-filled/50/ffffff/share.png",
                            },
                            {
                                title: "One-Click Deploy",
                                desc: "Deploy to platforms like Netlify or Cloudflare with a single click.",
                                icon: "https://img.icons8.com/ios-filled/50/ffffff/upload.png",
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className={`bg-gray-800 dark:bg-gray-900 p-6 rounded-lg shadow-lg transform transition-all duration-500 hover:-translate-y-4 hover:shadow-xl ${advantagesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                    }`}
                                style={{ transitionDelay: `${index * 200}ms` }}
                            >
                                <img src={item.icon} alt={item.title} className="w-12 h-12 mx-auto mb-4" />
                                <h3 className="text-2xl font-semibold text-gray-200 dark:text-gray-100 mb-4 text-center">
                                    {item.title}
                                </h3>
                                <p className="text-gray-400 dark:text-gray-300 text-center">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases Section */}
            <section
                ref={useCasesRef}
                className={`py-20 bg-gray-100 dark:bg-gray-800 transition-all duration-1000 ${useCasesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
            >
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">
                        Perfect for Every Developer
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {useCaseImages.map((img, index) => (
                            <div
                                key={index}
                                className="relative group overflow-hidden rounded-lg shadow-md cursor-pointer transform transition-all duration-500 hover:scale-105"
                                onClick={() => {
                                    setModalIndex(index);
                                    setIsModalOpen(true);
                                }}
                            >
                                <img src={img} alt={`Use Case ${index + 1}`} className="w-full h-64 object-cover" />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <h3 className="text-white text-xl font-semibold text-center px-4">
                                        {useCaseTitles[index]}
                                    </h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogContent className="bg-gray-800 dark:bg-gray-900 text-gray-200 dark:text-gray-100">
                        <DialogHeader>
                            <DialogTitle>{useCaseTitles[modalIndex]}</DialogTitle>
                            <DialogDescription>{useCaseDescriptions[modalIndex]}</DialogDescription>
                        </DialogHeader>
                        <img
                            src={useCaseImages[modalIndex]}
                            alt={useCaseTitles[modalIndex]}
                            className="w-full h-auto object-cover rounded-lg"
                        />
                        <div className="flex justify-between mt-4">
                            <Button
                                onClick={() =>
                                    setModalIndex((modalIndex + useCaseImages.length - 1) % useCaseImages.length)
                                }
                                className="bg-gray-700 hover:bg-gray-600"
                            >
                                Previous
                            </Button>
                            <Button
                                onClick={() => setModalIndex((modalIndex + 1) % useCaseImages.length)}
                                className="bg-gray-700 hover:bg-gray-600"
                            >
                                Next
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </section>

            {/* How to Use Section */}
            <section
                ref={howToUseRef}
                className={`py-20 bg-gray-200 dark:bg-gray-900 transition-all duration-1000 ${howToUseVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
            >
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">
                        Getting Started
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {[
                            "Sign up for an account or log in with your existing credentials.",
                            "Describe the project you want to build or the features you need.",
                            "Generate the code and folder structure using our AI engine.",
                            "Customize the code as needed and see a live preview instantly.",
                            "Collaborate with your team, commit changes, and track versions.",
                            "Deploy the application to a hosting platform of your choice.",
                        ].map((step, index) => (
                            <div
                                key={index}
                                className={`bg-gray-800 dark:bg-gray-900 p-6 rounded-lg shadow-md cursor-pointer transform transition-all duration-500 hover:scale-105 ${howToUseVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                    }`}
                                onClick={() => setActiveStep(index === activeStep ? null : index)}
                                style={{ transitionDelay: `${index * 200}ms` }}
                            >
                                <h3 className="text-xl font-semibold text-gray-200 dark:text-gray-100 mb-2">
                                    Step {index + 1}
                                </h3>
                                <p className="text-gray-400 dark:text-gray-300">{step}</p>
                                {activeStep === index && (
                                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 animate-expand">
                                        {stepDetails[index]}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section
                ref={teamRef}
                className={`py-20 bg-gray-100 dark:bg-gray-800 transition-all duration-1000 ${teamVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
            >
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-gray-200">
                        Meet the Team
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[
                            {
                                name: "John Doe",
                                role: "Founder & CEO",
                                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
                            },
                            {
                                name: "Jane Smith",
                                role: "Lead Developer",
                                img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1887&auto=format&fit=crop",
                            },
                            {
                                name: "Mike Johnson",
                                role: "Designer",
                                img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1887&auto=format&fit=crop",
                            },
                        ].map((member, index) => (
                            <div
                                key={index}
                                className={`bg-gray-800 dark:bg-gray-900 p-6 rounded-lg shadow-md text-center group transform transition-all duration-500 ${teamVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                                    }`}
                                style={{ transitionDelay: `${index * 200}ms` }}
                            >
                                <img
                                    src={member.img}
                                    alt={member.name}
                                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                                />
                                <h3 className="text-xl font-semibold text-gray-200 dark:text-gray-100 mb-2">
                                    {member.name}
                                </h3>
                                <p className="text-gray-400 dark:text-gray-300 mb-2">{member.role}</p>
                                <div className="opacity-0 group-hover:opacity-100 text-gray-500 dark:text-gray-400 transition-opacity duration-300">
                                    <p>Over 10 years of experience in tech innovation.</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-blue-500 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-6 animate-fade-in">
                        Ready to Boost Your Development?
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto animate-fade-in-delay">
                        Join thousands of developers using Bolt.New to create stunning applications faster.
                    </p>
                    <Button
                        className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-transform duration-300 hover:scale-105 animate-fade-in-delay"
                    >
                        Get Started
                    </Button>
                    <div className="mt-8 flex justify-center space-x-6 animate-fade-in-delay">
                        <a href="#" className="hover:text-gray-200">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="hover:text-gray-200">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="hover:text-gray-200">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                    </div>
                </div>
            </section>

        </div>

    );
};

export default AboutPage;