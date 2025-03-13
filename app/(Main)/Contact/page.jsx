"use client";

import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

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

const ContactPage = () => {
    // Form state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder for form submission logic (e.g., API call)
        console.log("Form submitted:", formData);
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
    };

    // Intersection Observer for Scroll Animations
    const [heroRef, heroVisible] = useOnScreen({ threshold: 0.1 });
    const [contactRef, contactVisible] = useOnScreen({ threshold: 0.1 });
    const [mapRef, mapVisible] = useOnScreen({ threshold: 0.1 });
    const [supportRef, supportVisible] = useOnScreen({ threshold: 0.1 });
    const [ctaRef, ctaVisible] = useOnScreen({ threshold: 0.1 });

    return (

        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300 min-w-full overflow-x-hidden">
            {/* Hero Section with Particle Effect */}
            <section
                ref={heroRef}
                className={`relative w-full h-[60vh] bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 dark:from-blue-950 dark:via-purple-950 dark:to-indigo-950 transition-all duration-1000 ${heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    } overflow-x-hidden`}
            >
                {/* Particle Effect */}
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
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-lg animate-fade-in-up">
                            Get in Touch
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl animate-fade-in-up-delay">
                            Have questions or need support? We're here to help you with Bolt.New.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section
                ref={contactRef}
                className={`py-20 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-all duration-1000 ${contactVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    } overflow-x-hidden`}
            >
                <div className="container mx-auto px-4 max-w-full">
                    <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 dark:text-gray-200 mb-12 animate-fade-in-up">
                        Contact Us
                    </h2>
                    <div className="max-w-3xl mx-auto">
                        {isSubmitted ? (
                            <div className="bg-green-100 dark:bg-green-900 p-6 rounded-lg text-center animate-fade-in-up">
                                <h3 className="text-xl font-semibold text-green-800 dark:text-green-200">
                                    Thank You!
                                </h3>
                                <p className="text-green-700 dark:text-green-300">
                                    Your message has been sent. We'll get back to you soon.
                                </p>
                            </div>
                        ) : (
                            <form
                                onSubmit={handleSubmit}
                                className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg glass animate-fade-in-up"
                            >
                                <div className="mb-6">
                                    <label
                                        htmlFor="name"
                                        className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold"
                                    >
                                        Name
                                    </label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your Name"
                                        className="w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                                        required
                                    />
                                </div>
                                <div className="mb-6">
                                    <label
                                        htmlFor="email"
                                        className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold"
                                    >
                                        Email
                                    </label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Your Email"
                                        className="w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                                        required
                                    />
                                </div>
                                <div className="mb-6">
                                    <label
                                        htmlFor="message"
                                        className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold"
                                    >
                                        Message
                                    </label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Your Message"
                                        className="w-full h-32 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                                        required
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 transition-transform hover:scale-105"
                                >
                                    Send Message
                                </Button>
                            </form>
                        )}
                    </div>
                    {/* Contact Info */}
                    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {[
                            {
                                icon: <i className="fas fa-phone-alt text-blue-500 text-3xl"></i>,
                                title: "Phone",
                                detail: "+1 (555) 123-4567",
                            },
                            {
                                icon: <i className="fas fa-envelope text-green-500 text-3xl"></i>,
                                title: "Email",
                                detail: "support@boltnew.com",
                            },
                            {
                                icon: <i className="fas fa-map-marker-alt text-purple-500 text-3xl"></i>,
                                title: "Address",
                                detail: "123 AI Street, Tech City, USA",
                            },
                        ].map((info, index) => (
                            <div
                                key={index}
                                className={`text-center transform transition-all duration-500 hover:-translate-y-2 ${contactVisible ? "animate-fade-in-up" : "opacity-0"
                                    }`}
                                style={{ animationDelay: `${index * 200}ms` }}
                            >
                                <div className="mb-4">{info.icon}</div>
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                    {info.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">{info.detail}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section
                ref={mapRef}
                className={`py-20 bg-gray-200 dark:bg-gray-900 transition-all duration-1000 ${mapVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    } overflow-x-hidden`}
            >
                <div className="container mx-auto px-4 max-w-full text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-12 animate-fade-in-up">
                        Find Us
                    </h2>
                    <div className="max-w-4xl mx-auto">
                        {/* Google Maps Iframe */}
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353153167!3d-37.81627927975195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f0d3d7f%3A0x5045675218ce7e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sus!4v1634567890123!5m2!1sen!2sus"
                            className="w-full h-96 rounded-lg animate-fade-in-up-delay"
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </section>
            {/* Support Info Section */}
            <section
                ref={supportRef}
                className={`py-20 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-all duration-1000 ${supportVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    } overflow-x-hidden`}
            >
                <div className="container mx-auto px-4 max-w-full">
                    <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 dark:text-gray-200 mb-12 animate-fade-in-up">
                        Frequently Asked Questions
                    </h2>
                    <div className="max-w-4xl mx-auto space-y-6">
                        {[
                            {
                                question: "How can I get started with Bolt.New?",
                                answer:
                                    "Simply sign up for a free account, describe your project, and let our AI generate the code for you. Check out our Getting Started guide for more details.",
                            },
                            {
                                question: "What kind of support do you offer?",
                                answer:
                                    "We offer community support for free users, priority email support for Pro users, and dedicated support for Enterprise users. You can also reach us via email or phone.",
                            },
                            {
                                question: "Can I deploy my projects directly from Bolt.New?",
                                answer:
                                    "Yes! Bolt.New supports one-click deployment to platforms like Netlify, Vercel, and Cloudflare, making it easy to go from development to production.",
                            },
                        ].map((faq, index) => (
                            <div
                                key={index}
                                className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-500 hover:-translate-y-2 ${supportVisible ? "animate-fade-in-up" : "opacity-0"
                                    }`}
                                style={{ animationDelay: `${index * 200}ms` }}
                            >
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                    {faq.question}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
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
                        Join thousands of developers and create stunning applications with Bolt.New.
                    </p>
                    <Button className="bg-white text-indigo-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-transform hover:scale-105 animate-fade-in-up-delay">
                        Get Started
                    </Button>
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

export default ContactPage;