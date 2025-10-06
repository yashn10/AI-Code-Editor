// Updated app/api/code/route.jsx

import { chatCodeSession } from '@/config/AImodel';
import { NextResponse } from 'next/server';

export const maxDuration = 60; // Set maxDuration to 60 seconds for this route

// Function to extract JSON from potentially malformed LLM response
function extractJsonFromText(text) {
    // Try direct parse first
    try {
        return JSON.parse(text);
    } catch (e) {
        // If fails, use regex to find the largest JSON-like block
        const jsonMatch = text.match(/\{(?:[^{}]|(?:\{[^{}]*\}[^{}]*)*)\}/);
        if (jsonMatch) {
            try {
                return JSON.parse(jsonMatch[0]);
            } catch (extractError) {
                console.error("Failed to extract and parse JSON:", extractError);
                return null;
            }
        }
        return null;
    }
}

export async function POST(request) {
    const { prompt } = await request.json();

    try {
        const result = await chatCodeSession(prompt);
        console.log("Raw LLM response:", result);
        let generatedText = result.response.text();

        // Clean up common issues
        generatedText = generatedText.trim();
        // Remove any leading markdown or text before JSON
        const jsonStart = generatedText.indexOf('{');
        if (jsonStart !== -1) {
            generatedText = generatedText.substring(jsonStart);
        }
        // Remove trailing text after JSON
        const jsonEnd = generatedText.lastIndexOf('}');
        if (jsonEnd !== -1) {
            generatedText = generatedText.substring(0, jsonEnd + 1);
        }

        const safeText = generatedText
            .replace(/\\(?!["\\\/bfnrtu])/g, '\\\\')
            .replace(/\\x/g, '\\\\x');

        const parsedData = extractJsonFromText(safeText);

        if (!parsedData) {
            console.error("Failed to parse or extract JSON from output.");
            return NextResponse.json({
                error: "Failed to parse generated output.",
                rawOutput: safeText
            }, { status: 400 });
        }

        console.log("Parsed JSON data:", parsedData);
        return NextResponse.json(parsedData);

    } catch (err) {
        console.error("Error in chat API:", err);
        return new Response(
            JSON.stringify({ error: "Failed to generate response" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}