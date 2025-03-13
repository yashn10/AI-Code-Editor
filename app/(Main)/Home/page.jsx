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
import Link from "next/link";

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

const HomePage = () => {
    // State for Demo Request Modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Intersection Observer for Scroll Animations
    const [heroRef, heroVisible] = useOnScreen({ threshold: 0.1 });
    const [featuresRef, featuresVisible] = useOnScreen({ threshold: 0.1 });
    const [demoRef, demoVisible] = useOnScreen({ threshold: 0.1 });
    const [statsRef, statsVisible] = useOnScreen({ threshold: 0.1 });
    const [testimonialsRef, testimonialsVisible] = useOnScreen({ threshold: 0.1 });
    const [pricingRef, pricingVisible] = useOnScreen({ threshold: 0.1 });
    const [ctaRef, ctaVisible] = useOnScreen({ threshold: 0.1 });

    return (

        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300 min-w-full">

            {/* Hero Section with Particle Effect */}
            <section
                ref={heroRef}
                className={`relative w-full h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 dark:from-blue-950 dark:via-purple-950 dark:to-indigo-950 transition-all duration-1000 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    } overflow-x-hidden`}
            >
                {/* Particle Effect with Constrained Container */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="relative w-full h-full overflow-hidden">
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-[2px] h-[2px] bg-white rounded-full opacity-20 animate-particle"
                                style={{
                                    top: `${Math.random() * 100}%`,
                                    left: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 10}s`,
                                }}
                            ></div>
                        ))}
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 max-w-full mx-auto">
                        <img
                            src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1887&auto=format&fit=crop"
                            alt="Hero"
                            className="mx-auto mb-8 w-48 h-48 rounded-full shadow-xl transform hover:scale-105 transition-transform duration-300 object-cover"
                        />
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-lg animate-fade-in-up">
                            Generate Code with Ease
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl animate-fade-in-up-delay">
                            AI-powered code generation, live previews, and seamless collaboration—all in your
                            browser.
                        </p>
                        <div className="space-x-4">
                            <Link
                                href="/Main"
                                className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-transform hover:scale-105 animate-fade-in-up-delay"
                            >
                                Get Started
                            </Link>
                            <Button
                                variant="outline"
                                className="text-white border-white hover:bg-white hover:text-blue-600 transition-transform hover:scale-105 animate-fade-in-up-delay"
                                onClick={() => setIsModalOpen(true)}
                            >
                                Request a Demo
                            </Button>
                        </div>
                    </div>
                </div>
                <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                    <DialogContent className="bg-gray-800 dark:bg-gray-900 text-gray-200 max-w-md">
                        <DialogHeader>
                            <DialogTitle>Request a Demo</DialogTitle>
                            <DialogDescription>
                                Fill out the form below to schedule a personalized demo of Bolt.New.
                            </DialogDescription>
                        </DialogHeader>
                        <form className="space-y-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
                            />
                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                                Submit
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </section>

            {/* Features Section */}
            <section
                ref={featuresRef}
                className={`py-20 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-all duration-1000 ${featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    } overflow-x-hidden`}
            >
                <div className="container mx-auto px-4 max-w-full">
                    <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 dark:text-gray-200 mb-12 animate-fade-in-up">
                        Key Features
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                        {[
                            {
                                title: "Code Generation",
                                desc: "Generate full-stack code with files and folders based on your prompts. Get instant structure and boilerplate for your React projects.",
                                icon: <i className="fas fa-code text-blue-500 text-4xl"></i>,
                                img: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop",
                            },
                            {
                                title: "Live Preview",
                                desc: "See your code in action with integrated Sandpack. Make changes on the fly and watch your application update in real-time.",
                                icon: <i className="fas fa-eye text-green-500 text-4xl"></i>,
                                img: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=2070&auto=format&fit=crop",
                            },
                            {
                                title: "One-Click Deployment",
                                desc: "Easily deploy your app to services like Netlify or Cloudflare with a single click. Simplify your workflow from development to production.",
                                icon: <i className="fas fa-rocket text-purple-500 text-4xl"></i>,
                                img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop",
                            },
                        ].map((feature, index) => (
                            <div
                                key={index}
                                className={`relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-500 hover:-translate-y-3 hover:shadow-xl group ${featuresVisible ? "animate-fade-in-up" : "opacity-0"
                                    }`}
                                style={{ animationDelay: `${index * 200}ms` }}
                            >
                                <img
                                    src={feature.img}
                                    alt={feature.title}
                                    className="w-full h-32 object-cover rounded mb-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                                />
                                <div className="flex justify-center mb-4">{feature.icon}</div>
                                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Live Demo Section */}
            <section
                ref={demoRef}
                className={`py-20 bg-gray-200 dark:bg-gray-900 transition-all duration-1000 ${demoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    } overflow-x-hidden`}
            >
                <div className="container mx-auto px-4 max-w-full text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-12 animate-fade-in-up">
                        Live Demo
                    </h2>
                    <p className="text-center max-w-xl mx-auto mb-8 text-gray-600 dark:text-gray-400 animate-fade-in-up-delay">
                        Experience the power of AI-assisted code generation firsthand. Watch as your code
                        transforms from prompts into a fully functional application.
                    </p>
                    <div className="flex justify-center">
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-2xl w-full text-center transform transition-all duration-500 hover:shadow-xl animate-fade-in-up-delay">
                            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                                Sandpack Preview
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Your live editor or preview would appear here.
                            </p>
                            <Button className="mt-4 bg-blue-600 hover:bg-blue-700">Try it Now</Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section
                ref={statsRef}
                className={`py-20 bg-gradient-to-r from-blue-900 to-purple-900 text-white transition-all duration-1000 ${statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    } overflow-x-hidden`}
            >
                <div className="container mx-auto px-4 max-w-full text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-12 animate-fade-in-up">
                        Bolt.New by the Numbers
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {[
                            { value: "10K+", label: "Active Users" },
                            { value: "50K+", label: "Projects Created" },
                            { value: "99.9%", label: "Uptime Guarantee" },
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className={`transform transition-all duration-500 ${statsVisible ? "animate-fade-in-up" : "opacity-0"
                                    }`}
                                style={{ animationDelay: `${index * 200}ms` }}
                            >
                                <h3 className="text-4xl md:text-5xl font-bold text-blue-300">{stat.value}</h3>
                                <p className="text-xl mt-2">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section
                ref={testimonialsRef}
                className={`py-20 bg-gray-100 dark:bg-gray-800 transition-all duration-1000 ${testimonialsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    } overflow-x-hidden`}
            >
                <div className="container mx-auto px-4 max-w-full text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-12 animate-fade-in-up">
                        What Our Users Say
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                name: "Sarah Johnson",
                                role: "Freelancer",
                                quote: "Bolt.New saved me hours of work with its AI code generation!",
                                img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
                            },
                            {
                                name: "Mike Lee",
                                role: "Developer",
                                quote: "The live preview feature is a game-changer for my team.",
                                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
                            },
                            {
                                name: "Emma Davis",
                                role: "Startup Founder",
                                quote: "Deploying with one click? Unreal! Bolt.New is amazing.",
                                img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1887&auto=format&fit=crop",
                            },
                        ].map((testimonial, index) => (
                            <div
                                key={index}
                                className={`bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${testimonialsVisible ? "animate-fade-in-up" : "opacity-0"
                                    }`}
                                style={{ animationDelay: `${index * 200}ms` }}
                            >
                                <img
                                    src={testimonial.img}
                                    alt={testimonial.name}
                                    className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                                />
                                <p className="text-gray-600 dark:text-gray-400 italic mb-4">“{testimonial.quote}”</p>
                                <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                                    {testimonial.name}
                                </h4>
                                <p className="text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section
                ref={pricingRef}
                className={`py-20 bg-gradient-to-b from-gray-200 to-gray-100 dark:from-gray-800 dark:to-gray-900 transition-all duration-1000 ${pricingVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    } overflow-x-hidden`}
            >
                <div className="container mx-auto px-4 max-w-full text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-12 animate-fade-in-up">
                        Simple Pricing Plans
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                name: "Free",
                                price: "$0",
                                features: ["Basic AI Code Generation", "1 Project", "Community Support"],
                            },
                            {
                                name: "Pro",
                                price: "$19/month",
                                features: ["Advanced AI Features", "Unlimited Projects", "Priority Support"],
                            },
                            {
                                name: "Enterprise",
                                price: "$99/month",
                                features: ["Custom AI Models", "Team Collaboration", "Dedicated Support"],
                            },
                        ].map((plan, index) => (
                            <div
                                key={index}
                                className={`bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg transform transition-all duration-500 hover:-translate-y-3 hover:shadow-xl ${pricingVisible ? "animate-fade-in-up" : "opacity-0"
                                    }`}
                                style={{ animationDelay: `${index * 200}ms` }}
                            >
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                                    {plan.name}
                                </h3>
                                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">
                                    {plan.price}
                                </p>
                                <ul className="text-left space-y-2 text-gray-600 dark:text-gray-400">
                                    {plan.features.map((feature, i) => (
                                        <li key={i} className="flex items-center">
                                            <i className="fas fa-check text-green-500 mr-2"></i>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <Button className="mt-6 w-full bg-blue-600 hover:bg-blue-700">
                                    Get Started
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section
                ref={ctaRef}
                className={`py-20 bg-gradient-to-r from-indigo-900 to-purple-900 text-white transition-all duration-1000 ${ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    } overflow-x-hidden`}
            >
                <div className="container mx-auto px-4 max-w-full text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">
                        Ready to Start Building?
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto animate-fade-in-up-delay">
                        Unleash your creativity and let AI handle the tedious setup. Join thousands of
                        developers today!
                    </p>
                    <Link
                        href="/Main"
                        className="bg-white text-indigo-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-transform hover:scale-105 animate-fade-in-up-delay"
                    >
                        Create Your Project
                    </Link>
                    <div className="mt-8 flex justify-center space-x-6 animate-fade-in-up-delay">
                        <a href="#" className="hover:text-gray-200">
                            <i className="fab fa-facebook-f text-2xl"></i>
                        </a>
                        <a href="#" className="hover:text-gray-200">
                            <i className="fab fa-twitter text-2xl"></i>
                        </a>
                        <a href="#" className="hover:text-gray-200">
                            <i className="fab fa-linkedin-in text-2xl"></i>
                        </a>
                    </div>
                </div>
            </section>

        </div>

    );
};

export default HomePage;