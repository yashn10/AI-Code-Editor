// app/api/prompt/route.jsx

import { NextResponse } from 'next/server';
const Groq = require("groq-sdk");

// Initialize the Groq SDK; if an API key is needed, you might pass it in here
const groq = new Groq({ apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY });

export async function POST(request) {
    const prompt = await request.json();

    try {
        const enhancedPrompt = `
Analyze the user's request: ${prompt}.

1. **Retain all specific features** or domain details mentioned. For instance:
   - If user says "Instagram-like platform," explicitly include user profiles, photo/video feed, likes, comments, direct messaging, stories, notifications, etc.
   - If user says "e-commerce site," explicitly include product listings, cart, checkout, payment integration, etc.
   - If user references UI design, emphasize CSS, Tailwind, responsiveness, minimal external libraries, and any special animations.

2. **Expand the prompt** by detailing relevant best practices, performance considerations, or modern approaches—**but do not** remove or generalize away key features.

3. If the user references **existing context** (like a partial codebase or prior instructions), incorporate that context. Otherwise, assume a new project.

4. Output **only** the final enhanced query, with **no extra commentary** or disclaimers.

Example:
- **User Request**: "Create an Instagram-like platform with all functionalities."
- **Enhanced Query**: "Build a fully featured Instagram-like social media platform with user profiles, photo and video feed, likes, comments, direct messaging, stories, push notifications, and an intuitive UI. Emphasize a modern, visually appealing design using CSS and Tailwind for responsiveness and minimal external libraries. Ensure a scalable backend with real-time updates, secure authentication, and best practices for performance. Incorporate smooth animations and a user-friendly interface to deliver an engaging experience. Output only this final enhanced query."
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