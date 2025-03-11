// app/api/prompt/route.jsx

import { NextResponse } from 'next/server';
const Groq = require("groq-sdk");

// Initialize the Groq SDK; if an API key is needed, you might pass it in here
const groq = new Groq({ apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY });

export async function POST(request) {
    const prompt = await request.json();

    try {
        const enhancedPrompt = `Analyze the following prompt: "${prompt}". This prompt is a user's request for building a project so your task is to transform the given prompt while keeping the user's intent and context intact into a detailed, long, and highly-optimized query that focuses primarily on creating an exceptional award winning UI design using CSS and TailwindCSS. Emphasize modern, responsive layouts, smooth animations, and interactive elements achieved with minimal reliance on external libraries. Extract all essential details from the user's input, and craft a final query that is both concise and comprehensive. Output only the final enhanced query without any additional commentary or descriptions. Refer to the below example for better understanding,
        
        User Prompt: create a portfolio website,

        Enhanced Prompt: Design a modern, responsive portfolio website using only CSS and Tailwind CSS for styling. Focus on crafting a clean, intuitive UI with minimal external libraries. The website should include a dynamic landing page with smooth animations, clear sections for projects, skills, an about page, and a contact form. Emphasize mobile-first design, accessibility, and a visually stunning presentation that effectively showcases personal branding. Output only this enhanced query without any additional text.
        `;


        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: "user", content: enhancedPrompt }],
            model: "mixtral-8x7b-32768",
            temperature: 0.8,
            max_completion_tokens: 1024,
            top_p: 0.9,
            stream: false,
            stop: null
        });

        const responseMessage = chatCompletion.choices[0].message.content;
        return NextResponse.json({ response: responseMessage });
    } catch (error) {
        console.error("Error during prompt enhancement processing:", error.response?.data || error.message);
        return NextResponse.json(
            { error: "Failed to enhance prompt via Groq." },
            { status: 500 }
        );
    }
}