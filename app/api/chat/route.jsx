// app/api/chat/route.jsx

import { chatSession } from '@/config/AImodel';
import PROMPT from '@/data/Prompt';
import STATICPROMPT from '@/data/HTML-CSS-JS/Prompt';

export async function POST(request) {
    try {
        const { prompt, framework } = await request.json();

        let systemPrompt

        if (framework === "reactjs") {
            systemPrompt = PROMPT.CHAT_PROMPT;
        } else {
            systemPrompt = STATICPROMPT.CHAT_PROMPT;
        }
        // Prepend a system prompt instructing a 5-10 line response.
        const modifiedPrompt = `${systemPrompt}\n\n${prompt}`;

        const result = await chatSession(modifiedPrompt);
        const generatedText = result.response.text();

        return new Response(
            JSON.stringify({ response: generatedText }),
            { status: 200, headers: { "Content-Type": "text/plain" } }
        );
    } catch (err) {
        console.error("Error in chat API:", err);
        return new Response(
            JSON.stringify({ error: "Failed to generate response" }),
            { status: 500, headers: { "Content-Type": "text/plain" } }
        );
    }
}

