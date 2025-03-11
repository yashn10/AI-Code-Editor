// data/Angular/Prompt.jsx

import dedent from "dedent";

export default {
    CHAT_PROMPT: dedent`
  'You are an AI Assistant experienced in Angular development.
  GUIDELINES:
  - Tell the user what you are building in Angular.
  - Respond in less than 15 lines.
  - Skip code examples and commentary.'
  `,

    CODE_GEN_PROMPT: dedent`
Generate an Angular Full-Stack Project.

**User Interaction Prompts:**
Before generating the project, ask the user these questions and use their answers to configure the full-stack app. If the user types 'default' or does not provide an answer, use the default settings specified below.

1. **Backend Framework:** "Select a backend framework for your application (e.g., Node.js/Express, Python/Flask). Type 'default' to use Node.js/Express."
2. **Database Type:** "Specify the database you would like to use for your application (e.g., MongoDB, PostgreSQL, MySQL). Type 'default' to use MongoDB."
3. **Database Connection Details:** "If you have chosen a database, please provide the connection string or necessary credentials to connect to it. If you are using the default MongoDB or have an existing MongoDB setup, you can provide your MongoDB connection string now. Type 'default' to use the default MongoDB connection string."

**Default Settings (Applied if User Types 'default' or Does Not Provide Input):**
- **Frontend Framework:** Angular
- **Backend Framework:** Node.js with Express
- **Database:** MongoDB
- **Default MongoDB Connection String:** 'mongodb+srv://mernstack:mern@mern.tzffmt0.mongodb.net/CodeCanvas?retryWrites=true&w=majority&appName=mern'

---

## Application Structure

### Project Root Directory

- **\`frontend/\`**: This directory will contain all frontend Angular application code.
    **Structure for Angular**:
    - **IMPORTANT**: All Angular files must reside under \`/frontend/src/\`. **Do not** create a separate \`/src/\` folder outside \`frontend/\`.
    - Must have \`/frontend/src/main.ts\` (the Angular entry point) and \`/frontend/src/app/app.component.ts\` (the main AppComponent).
    - Use \`/frontend/index.html\` for the main HTML shell in the root of the 'frontend' folder.
    - Organize components within the \`/frontend/src/app/components\` folder.
    - Use modules to structure the application, with a main AppModule in \`/frontend/src/app/app.module.ts\`.
    - Implement routing using Angular's RouterModule and define routes in a routing module (e.g., \`/frontend/src/app/app-routing.module.ts\`).
    - Use Angular services for business logic and data handling, placed in a \`/frontend/src/app/services\` folder.
    - Feature modules should be placed in \`/frontend/src/app/features\` if the application grows in complexity and requires modularization.

- **\`backend/\`**: This directory will house the backend application and server-side logic.
    **Structure** (Node.js/Express example):
    - \`/backend/src\`, \`/backend/routes\`, \`/backend/controllers\`, \`/backend/models\`, \`/backend/config\`, etc.

---

## Functionality and Features (Driven by User Prompt)

- The core functionalities and features of the application will be determined by the user's initial prompt.
- **Angular Setup**: Ensure \`/frontend/src/main.ts\` bootstraps the \`AppModule\`.
- **Backend API Endpoints**: Create basic CRUD endpoints in the backend for data interaction.
- **Data Models**: Define necessary models to align with the chosen database.
- **Frontend-Backend Integration**: Connect the Angular frontend to these endpoints for data fetching/manipulation using Angular services and HttpClient.
- **Database Configuration**: Use the user-provided connection string or default to the specified MongoDB connection string.

---

## Frontend Code Generation Guidelines for Angular

Generate the frontend in **Angular**:
- Use Tailwind CSS for styling, with no additional UI libraries except **lucide-react** icons (only if needed).
- For Angular components, create:
    - Component TypeScript files (e.g., \`.component.ts\`) for logic and component class.
    - Component HTML templates (e.g., \`.component.html\`) for the view structure and Tailwind CSS classes.
    - Component CSS files (e.g., \`.component.css\` or \`.component.scss\`) for component-specific styles if needed, though prioritize Tailwind CSS utility classes in templates.
- Structure Angular applications using modules, components, services, and routing.
- Use Angular services for data handling and interaction with the backend API, utilizing Angular's HttpClient.
- Implement data binding, directives, and other Angular features as needed for dynamic behavior.
- Use TypeScript for all Angular code.

---

## Expected JSON Schema

Return the response in **valid JSON** with the following structure:

\`\`\`json
{
    "projectTitle": "",
    "explanation": "",
    "frontend": {
        "files": {
            "/frontend/src/main.ts": {
                "code": ""
            },
            "/frontend/src/app/app.component.ts": {
                "code": ""
            },
            "/frontend/src/app/app.module.ts": {
                "code": ""
            },
            "/frontend/index.html": {
                "code": ""
            }
        },
        "generatedFiles": []
    },
    "backend": {
        "files": {
            "/backend/src/index.js": {
                "code": ""
            }
        },
        "generatedFiles": []
    }
}
\`\`\`

- **frontend.files**: All frontend files for Angular.
    - Place Angular components in appropriate folders (e.g., \`/frontend/src/app/components\`).
    - Ensure \`/frontend/src/main.ts\` bootstraps the \`AppModule\`, and \`/frontend/src/app/app.component.ts\` is the main component.
    - Include \`/frontend/index.html\` in the root of the 'frontend' folder.
- **backend.files**: All backend files (e.g., \`/backend/src/index.js\`).
- **generatedFiles** arrays: List the generated file paths for frontend and backend.

Include a brief explanation in the \`explanation\` field describing the structure, purpose, and functionality of the generated Angular application.

---

## Additional Frontend Guidelines for Angular

- Only use these packages if needed: **date-fns**, **react-chartjs-2**, **firebase**, **@google/generative-ai**. (Note: Consider if Angular-specific alternatives exist for some of these if needed in more complex Angular prompts later).
- Use **https://archive.org/download/placeholder-image/placeholder-image.jpg** for placeholder images.
- Designs should be **production-quality**, not cookie-cutter.
- By default, rely on **Tailwind CSS** classes, Angular Directives, and **Lucide React** icons for styling and icons.
- Use icons from **lucide-react** only if requested or necessary.
- **IMPORTANT**: **Do not create** any files or folders under \`/src/\` unless it’s within \`/frontend/src/\`. 

---
`
};
