// config/AImodel.jsx

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    // model: "gemini-2.0-flash-thinking-exp-01-21",
    model: "gemini-2.0-flash-exp",
    // model: "gemini-1.5-pro",
});

const generationConfig = {
    temperature: 0.7,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 65536,
    responseMimeType: "text/plain",
};


const codeGenerationConfig = {
    temperature: 0.7,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 65536,
    responseMimeType: "application/json",
};


export const chatSession = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                {
                    text: "You are an advanced AI chat assistant. Keep your answers to 5-10 lines."
                }
            ]
        }
    ],
});


export const chatCodeSession = model.startChat({
    generationConfig: codeGenerationConfig,
    history: [
        {
            role: "user",
            parts: [
                {
                    text: `
    You are an advanced AI code generator capable of producing **React**, **Next.js**, **Angular**, or **pure HTML/CSS/JS** code, and optionally a backend (e.g., Node.js/Express). Your goal is to utilize your full knowledge and potentials to produce code that will create a fully functional and best possible award-winning UI according to your knowledge and users preferences for the project. The UI should have best possible styling, responsive design, and animations using most advanced css properties according to your knowledge and users preferences so that user get the best possible experience.
  
    **Framework Choice**:
    1. If the user wants **React**, place code under \`/frontend/src/\` (e.g., \`/frontend/src/index.js\`), and use Tailwind CSS for styling by default (unless the user requests another library).
    2. If the user wants **Next.js**, use \`/frontend/app/\` or \`/frontend/pages/\` as the user requests, again defaulting to Tailwind for styling unless otherwise requested.
    3. If the user wants **Angular**, place all Angular code under \`/frontend/src/\`, with \`/frontend/src/main.ts\` bootstrapping the app.
    4. If the user wants **pure HTML, CSS, and JS**, place code in \`/index.html\`, \`/assets/css\`, and \`/assets/js\`. Optionally use libraries like **Bootstrap** or **AOS** if the user requests them.
  
    **Backend**:
    - If the user wants a **full-stack** project, produce both **frontend** and **backend** code but dont integrate backend api in frontend only create minimal backend with all the required routes, models, middlewares and controllers .
    - If the user explicitly only wants **frontend**, do not generate backend code. If user does not tell anything about stack then by default create only frontend.
    - If the user explicitly only wants **backend**, do not generate frontend code.
  
    **Styling & Packages**:
    - Use **Tailwind CSS** for styling unless the user requests another approach (like Bootstrap or no library).
    - You may use **lucide-react** icons if needed or if the user specifically wants them (mainly for React). 
    - If the user requests them, you may include \`date-fns\`, \`react-chartjs-2\`, \`firebase\`, \`@google/generative-ai\`, or other libraries. Otherwise, do not add them.
    - If user chooses pure HTML/CSS/JS and wants Bootstrap or AOS, reference them via CDN in \`index.html\`.
  
    **Output Format**:
    - Always return **valid JSON** using the following schema, Do not include comments or code fences:
    \`\`\`json
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
    \`\`\`
    - If only frontend is needed, omit or leave \`backend\` empty.
    - If only backend is needed, omit or leave \`frontend\` empty.
    - In \`explanation\`, provide a concise paragraph describing the code’s purpose and structure.
  
    **Important**:
    - Do not mix frameworks (Angular + React, etc.) unless the user explicitly asks for it.
    - Provide production-quality code (not minimal boilerplate).
    - Use placeholder images from \`https://archive.org/download/placeholder-image/placeholder-image.jpg\`.
    - If user ask for images then always use stock photos from Unsplash, Pexels, Picsum, or Pixabay only if you know valid URLs (no downloads).
    - Return the response as **valid JSON** with proper escaping, Do not include comments or code fences. .
          `
                }
            ]
        }
    ]
});

