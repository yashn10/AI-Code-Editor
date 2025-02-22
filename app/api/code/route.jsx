// app/api/code/route.jsx

import { chatCodeSession } from '@/config/AImodel';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const { prompt } = await request.json();

    try {
        const result = await chatCodeSession.sendMessage(prompt);
        const generatedText = result.response.text();

        // return new Response(
        //     JSON.stringify({ response: generatedText }),
        //     { status: 200, headers: { "Content-Type": "application/json" } }
        // );

        // return NextResponse.json(JSON.parse(generatedText));

        const safeText = generatedText
            .replace(/\\(?!["\\\/bfnrtu])/g, '\\\\')
            .replace(/\\x/g, '\\\\x');

        return NextResponse.json(JSON.parse(safeText));

    } catch (err) {
        console.error("Error in chat API:", err);
        return new Response(
            JSON.stringify({ error: "Failed to generate response" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}