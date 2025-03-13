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

const FeedbackPage = () => {
    // Form state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        rating: 0,
        feedback: "",
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle star rating
    const handleRating = (rating) => {
        setFormData({ ...formData, rating });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder for form submission logic (e.g., API call)
        console.log("Feedback submitted:", formData);
        setIsSubmitted(true);
        setFormData({ name: "", email: "", rating: 0, feedback: "" });
    };

    // Intersection Observer for Scroll Animations
    const [heroRef, heroVisible] = useOnScreen({ threshold: 0.1 });
    const [formRef, formVisible] = useOnScreen({ threshold: 0.1 });
    const [testimonialsRef, testimonialsVisible] = useOnScreen({ threshold: 0.1 });
    const [ctaRef, ctaVisible] = useOnScreen({ threshold: 0.1 });

    return (

        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-white transition-colors duration-300 min-w-full">

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
                            Share Your Feedback
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl animate-fade-in-up-delay">
                            Help us improve CodeCanvas AI by sharing your thoughts and experiences.
                        </p>
                    </div>
                </div>
            </section>

            {/* Feedback Form Section */}
            <section
                ref={formRef}
                className={`py-20 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 transition-all duration-1000 ${formVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    } overflow-x-hidden`}
            >
                <div className="container mx-auto px-4 max-w-full">
                    <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-800 dark:text-gray-200 mb-12 animate-fade-in-up">
                        Tell Us What You Think
                    </h2>
                    <div className="max-w-3xl mx-auto">
                        {isSubmitted ? (
                            <div className="bg-green-100 dark:bg-green-900 p-6 rounded-lg text-center animate-fade-in-up">
                                <h3 className="text-xl font-semibold text-green-800 dark:text-green-200">
                                    Thank You for Your Feedback!
                                </h3>
                                <p className="text-green-700 dark:text-green-300">
                                    We appreciate your input and will use it to improve Bolt.New.
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
                                    <label className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold">
                                        Rate Your Experience
                                    </label>
                                    <div className="flex space-x-2 justify-center">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <i
                                                key={star}
                                                className={`fas fa-star text-2xl cursor-pointer transition-colors duration-300 ${star <= formData.rating
                                                    ? "text-yellow-400"
                                                    : "text-gray-300 dark:text-gray-600"
                                                    }`}
                                                onClick={() => handleRating(star)}
                                            ></i>
                                        ))}
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <label
                                        htmlFor="feedback"
                                        className="block text-gray-700 dark:text-gray-300 mb-2 font-semibold"
                                    >
                                        Your Feedback
                                    </label>
                                    <Textarea
                                        id="feedback"
                                        name="feedback"
                                        value={formData.feedback}
                                        onChange={handleChange}
                                        placeholder="Tell us about your experience..."
                                        className="w-full h-32 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600"
                                        required
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    className="w-full bg-blue-600 hover:bg-blue-700 transition-transform hover:scale-105"
                                >
                                    Submit Feedback
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </section>

            {/* User Feedback Testimonials Section */}
            <section
                ref={testimonialsRef}
                className={`py-20 bg-gray-200 dark:bg-gray-900 transition-all duration-1000 ${testimonialsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    } overflow-x-hidden`}
            >
                <div className="container mx-auto px-4 max-w-full text-center">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-200 mb-12 animate-fade-in-up">
                        What Our Users Are Saying
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {[
                            {
                                name: "Alex Carter",
                                role: "Web Developer",
                                feedback: "Bolt.New has streamlined my workflow with its AI code generation. I love how easy it is to use!",
                                rating: 5,
                                img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop",
                            },
                            {
                                name: "Jessica Brown",
                                role: "Designer",
                                feedback: "The live preview feature is fantastic! It helps me see my designs come to life instantly.",
                                rating: 4,
                                img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
                            },
                            {
                                name: "David Wilson",
                                role: "Startup Founder",
                                feedback: "One-click deployment saved us so much time. Bolt.New is a game-changer for startups!",
                                rating: 5,
                                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
                            },
                        ].map((testimonial, index) => (
                            <div
                                key={index}
                                className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transform transition-all duration-500 hover:-translate-y-2 hover:shadow-xl ${testimonialsVisible ? "animate-fade-in-up" : "opacity-0"
                                    }`}
                                style={{ animationDelay: `${index * 200}ms` }}
                            >
                                <img
                                    src={testimonial.img}
                                    alt={testimonial.name}
                                    className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                                />
                                <div className="flex justify-center mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <i
                                            key={i}
                                            className={`fas fa-star text-sm ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
                                                }`}
                                        ></i>
                                    ))}
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 italic mb-4">“{testimonial.feedback}”</p>
                                <h4 className="font-semibold text-gray-800 dark:text-gray-200">
                                    {testimonial.name}
                                </h4>
                                <p className="text-gray-500 dark:text-gray-400">{testimonial.role}</p>
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
                        Join thousands of developers and create stunning applications with CodeCanvas AI.
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

export default FeedbackPage;