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
   - If the user specifies a feature like a "dashboard," include project management, user stats, navigation sidebar, and relevant UI components (e.g., charts, tables).
   - If the user references existing pages (e.g., Home, About, Contact, Feedback, Pricing, Blog, Documentation in the CodeCanvas AI app), ensure the new feature integrates seamlessly with these pages and maintains their design consistency.

2. **Expand the prompt** by including the following:
   - **UI Development**: Using your full knowledge, capabilities and potentials, design a modern, stunning, mind-blowing, award-winning and responsive UI using Tailwind CSS for styling, AOS (Animate on Scroll) for scroll-triggered animations, and pure CSS for custom styling—strictly no libraries other than Tailwind CSS and AOS are allowed.
   - **UI Functionalities**: Include a sidebar for navigation (if relevant to the feature, e.g., for dashboards or multi-page interfaces), define all necessary pages, and ensure a consistent design with existing CodeCanvas AI pages (Home, About, Contact, Feedback, Pricing, Blog, Documentation). Use a modular layout with reusable components (e.g., headers, footers).
   - **Animations**: Implement AOS for scroll-triggered animations (e.g., fade-in, slide-up, zoom-in) to enhance user experience, ensuring smooth performance with Tailwind CSS for additional modern styling effects (e.g., transitions, hover states).
   - **Best Practices**: Emphasize performance optimization (e.g., lazy loading images, minimizing reflows), accessibility (e.g., ARIA labels, keyboard navigation), and modern design trends (e.g., glassmorphism, gradients, neumorphism where appropriate).
   - **Theme Support**: Ensure the UI supports both light and dark modes using Tailwind's 'dark:' variants, with dynamic color schemes that adapt to the user's system preferences.
   - **Context**: If the user references existing context (e.g., partial codebase, prior instructions), incorporate that context fully. Otherwise, assume the feature is being added to the CodeCanvas AI app, a platform for AI-driven code generation with existing pages and a modern UI framework.
   - **Images**: If images are required (e.g., for hero sections, testimonials), use valid URLs from Picsum (e.g., https://picsum.photos/800/400, https://picsum.photos/400/300) for placeholder images—prefer Picsum over Unsplash, Pexels, or Pixabay unless specified, and avoid downloading or hosting images locally.
   - **Code Structure**:
     - If the user specifies "frontend only," create only frontend code with proper file organization, using dummy data for dynamic content (e.g., JSON objects).
     - If the user specifies "fullstack," create both frontend and backend code with proper file and folder structure:
       - **Frontend**: Organize into components, pages, and styles folders, using dummy data (e.g., mock JSON) instead of integrating backend APIs.
       - **Backend**: Include minimal structure with routes, models, middlewares, and controllers in separate files/folders (e.g., /routes, /models, /middleware, /controllers), but do not integrate with the frontend—focus on defining endpoints and logic without implementation details.

3. Output **only** the final enhanced query, with **no extra commentary** or disclaimers.

Example:
- **User Request**: "Create a dashboard for my app frontend only."
- **Enhanced Query**: "Build a fully featured dashboard for the users app, integrated with existing pages like Home, About, Contact, Feedback, Pricing, Blog, and Documentation. Include a sidebar for navigation with links to all pages, project management (list of projects, status, actions), user stats (e.g., API usage, project count), and a responsive layout. Design a modern UI using Tailwind CSS for styling, AOS for scroll-triggered animations (e.g., fade-in, slide-up), and pure CSS where needed—strictly no libraries other than Tailwind CSS and AOS. Ensure the design supports light and dark modes with Tailwind's 'dark:' variants, follows best practices for performance (e.g., lazy loading images), and incorporates accessibility features (e.g., ARIA labels). Create a Dashboard page with a consistent design, using glassmorphism and gradients, and use valid Picsum URLs (e.g., https://picsum.photos/800/400) for placeholder images. Organize frontend code in components, pages, and styles folders with dummy JSON data."
- **User Request**: "Create a fullstack e-commerce site."
- **Enhanced Query**: "Build a fullstack e-commerce site for the users app, integrated with existing pages like Home, About, Contact, Feedback, Pricing, Blog, and Documentation. Include a sidebar for navigation, product listings, shopping cart, checkout process, payment integration placeholders, user accounts, and order management. Design a modern UI using Tailwind CSS for styling, AOS for scroll-triggered animations (e.g., fade-in, slide-up), and pure CSS where needed—strictly no libraries other than Tailwind CSS and AOS. Ensure the design supports light and dark modes with Tailwind's 'dark:' variants, follows best practices for performance (e.g., lazy loading images), and incorporates accessibility features. Create necessary pages (e.g., Product Listing, Cart, Checkout) with a consistent design using glassmorphism and gradients, and use valid Picsum URLs (e.g., https://picsum.photos/400/300) for product images. Organize frontend code in src/components, src/pages, and src/styles folders with dummy JSON data, and create a backend in server/routes, server/models, server/middleware, and server/controllers folders with minimal endpoints and logic without frontend integration."
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