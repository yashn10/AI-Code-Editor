// app/api/code/route.jsx

import { chatCodeSession } from '@/config/AImodel';
import { NextResponse } from 'next/server';

export const maxDuration = 60; // Set maxDuration to 60 seconds for this route

export async function POST(request) {
    const { prompt } = await request.json();

    try {
        const result = await chatCodeSession.sendMessage(prompt);
        const generatedText = result.response.text();

        const safeText = generatedText
            .replace(/\\(?!["\\\/bfnrtu])/g, '\\\\')
            .replace(/\\x/g, '\\\\x');

        let parsedData;
        try {
            parsedData = JSON.parse(safeText);
        } catch (parseError) {
            console.error("JSON.parse error:", parseError);
            // Return a fallback response containing the raw safe text.
            return NextResponse.json({
                error: "Failed to parse generated output.",
                rawOutput: safeText
            });
        }

        return NextResponse.json(parsedData);

    } catch (err) {
        console.error("Error in chat API:", err);
        return new Response(
            JSON.stringify({ error: "Failed to generate response" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}