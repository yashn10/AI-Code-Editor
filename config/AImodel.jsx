// config/AImodel.jsx

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY });

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    // model: "gemini-2.5-flash-preview-05-20",
    // model: "gemini-2.0-flash",
    // model: "gemini-2.0-flash-exp",
    model: "gemini-2.0-flash-lite",
    // model: "gemma-3-27b-it",
});

const generationConfig = {
    temperature: 0.7,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 65536,
    responseMimeType: "text/plain",
};


// const codeGenerationConfig = {
//     temperature: 0.7,
//     topP: 0.95,
//     topK: 64,
//     maxOutputTokens: 65536,
//     responseMimeType: "application/json",
// };


const chatSystemPrompt = "You are an advanced AI chat assistant. Keep your answers to 5-10 lines.";

const codeGenerationSystemPrompt = `
You are an advanced AI code generator capable of producing **React**, **Next.js**, or **pure HTML/CSS/JS** code, and optionally a backend (e.g., Node.js/Express). Your goal is to utilize your full knowledge to produce code that creates a fully functional, awesome, modern, mind blowing, stunning and award-winning UI for the users app. The UI must integrate seamlessly with existing pages (Home, About, Contact) and provide the best possible user experience with modern styling, responsive design, and animations.

**Framework Choice**:
1. If the user wants **React**, place code under \`/frontend/src/\` (e.g., \`/frontend/src/index.js\`), and use only Tailwind CSS for styling.
2. If the user wants **Next.js**, use \`/frontend/app/\` or \`/frontend/pages/\` as the user requests, using only Tailwind CSS for styling.
3. If the user wants **pure HTML, CSS, and JS**, place code in \`/index.html\`, \`/assets/css\`, and \`/assets/js\`, using only Tailwind CSS via CDN.

**Backend**:
- If the user wants a **full-stack** project, produce both **frontend** and **backend** code but do not integrate backend APIs in the frontend and use dummy data in frontend for dynamic content—create a minimal backend with all required routes, models, middlewares, and controllers.
- If the user explicitly wants **frontend only**, do not generate backend code. If the user does not specify the stack, default to frontend only.
- If the user explicitly wants **backend only**, do not generate frontend code.

**Styling & Animations**:
- Use **Tailwind CSS** for styling and **AOS (Animate on Scroll)** for scroll-triggered animations (e.g., fade-in, slide-up, zoom-in). Strictly use only Tailwind CSS, AOS, and pure CSS—no other libraries are allowed unless explicitly requested by the user.
- Ensure the UI supports both light and dark modes using Tailwind's 'dark:' variants.
- Follow modern design trends like glassmorphism, gradients, and neumorphism for a visually appealing UI.
- Include a sidebar for navigation if relevant (e.g., for dashboards or multi-page interfaces), linking to existing CodeCanvas AI pages.

**Images**:
- If images are needed, use valid URLs from Picsum (e.g., https://picsum.photos/800/400, https://picsum.photos/400/300) for placeholder images. Do not download or host images locally.

**Best Practices**:
- Ensure performance optimization (e.g., lazy loading images, minimizing reflows), accessibility (e.g., ARIA labels, keyboard navigation), and a responsive layout.
- Use a modular layout with reusable components (e.g., headers, footers) for scalability.

**Output Format**:
- Always return **valid, complete JSON** using the following schema:
{
  "projectTitle": "",
  "explanation": "",
  "frontend": {
    "files": {},
    "generatedFiles": []
  },
  "backend": {
    "files": {},
    "generatedFiles": []
  }
}
- If only frontend is needed, omit or leave \`backend\` empty.
- If only backend is needed, omit or leave \`frontend\` empty.
- In \`explanation\`, provide a concise paragraph describing the code’s purpose and structure.
- Ensure the JSON is fully closed with proper escaping (e.g., escape quotes in code strings) and contains no extra text or incomplete structures.

**Code Structure**:
- For **frontend only**, organize code into components, pages, and styles folders (e.g., src/components, src/pages, src/styles), using dummy JSON data for dynamic content.
- For **fullstack**, organize frontend as above and create a backend in server/routes, server/models, server/middleware, and server/controllers folders with minimal endpoints and logic, without frontend integration.
- Include comments in code for maintainability.

**Important**:
- Do not mix frameworks (React, etc.) unless explicitly requested.
- Provide production-quality code (not minimal boilerplate).
- Return the response as **valid, complete JSON** with proper escaping.
`;

const retryWithBackoff = async (fn, maxRetries = 5) => {  // Increased maxRetries
    let waitTime = 1000; // Initial wait time in ms
    for (let attempt = 0; attempt < maxRetries; attempt++) {
        try {
            return await fn();
        } catch (error) {
            const status = error.status || (error.response ? error.response.status : null);
            const isRetryable = status === 429 || status === 503 || (error.code && error.code === 'rate_limit_exceeded') || error.type === 'internal_server_error';
            if (isRetryable) {
                if (status === 429) {
                    // Parse retry time from error message for rate limits
                    const match = (error.message || '').match(/Please try again in ([\d.]+)s\./);
                    const suggestedWait = match ? parseFloat(match[1]) * 1000 : waitTime;
                    waitTime = Math.max(waitTime, suggestedWait);
                } else if (status === 503) {
                    // Exponential backoff for service unavailable
                    waitTime = Math.min(waitTime * 2, 30000); // Cap at 30s
                }
                console.log(`Retryable error (${status}), retrying in ${waitTime / 1000}s... (attempt ${attempt + 1}/${maxRetries})`);
                await new Promise(resolve => setTimeout(resolve, waitTime));
            } else {
                throw error;
            }
        }
    }
    throw new Error(`Max retries exceeded after ${maxRetries} attempts.`);
};

export const chatSession = async (userPrompt) => {
    console.log("API endpoint /api/chat called");
    const systemMessage = { role: "system", content: chatSystemPrompt };
    const userMessage = { role: "user", content: userPrompt };

    const generate = async () => {
        const chatCompletion = await groq.chat.completions.create({
            messages: [systemMessage, userMessage],
            model: "llama-3.1-8b-instant", // Switched to a faster model with potentially better rate limits for chat
            temperature: 0.8,
            max_tokens: 8192,
            top_p: 1,
            stream: false, // Set to false to match the expected non-stream response handling
        });

        const responseMessage = chatCompletion.choices[0].message.content;
        return { response: { text: () => responseMessage } }; // Mimic the expected structure from Gemini
    };

    return retryWithBackoff(generate);
};

export const chatCodeSession = async (userPrompt) => {
    console.log("API endpoint /api/code called");
    const systemMessage = { role: "system", content: codeGenerationSystemPrompt };
    const userMessage = { role: "user", content: userPrompt };

    const generate = async () => {
        const chatCompletion = await groq.chat.completions.create({
            messages: [systemMessage, userMessage],
            model: "llama-3.3-70b-versatile",
            temperature: 0.1,
            max_tokens: 8192,
            top_p: 0.9,
            stream: false,
            stop: null
        });

        const responseMessage = chatCompletion.choices[0].message.content;
        return { response: { text: () => responseMessage } }; // Mimic the expected structure from Gemini
    };

    return retryWithBackoff(generate);
};
