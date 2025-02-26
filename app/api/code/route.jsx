// app/api/code/route.jsx

import { chatCodeSession } from '@/config/AImodel';
import { NextResponse } from 'next/server';

export async function POST(request) {
    const { prompt } = await request.json();

    try {
        const result = await chatCodeSession.sendMessage(prompt);
        const generatedText = result.response.text();


        // const safeText = generatedText
        //     .replace(/\\(?!["\\\/bfnrtu])/g, '\\\\')
        //     .replace(/\\x/g, '\\\\x');

        // return NextResponse.json(JSON.parse(safeText));



        // Sanitize generatedText by escaping problematic characters.
        // This regex escapes any backslash not followed by a valid escape sequence,
        // and then explicitly escapes \x sequences.
        const safeText = generatedText
            .replace(/\\(?!["\\\/bfnrtu])/g, '\\\\')
            .replace(/\\x/g, '\\\\x');

        // Attempt to parse the safe text. If it fails, catch the parsing error.
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