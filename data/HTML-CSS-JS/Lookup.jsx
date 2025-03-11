export default {
  // Example suggestions for plain HTML/CSS/JS with Bootstrap + AOS
  SUGGESTIONS: [
    "Create a simple landing page with Bootstrap",
    "Create a personal portfolio website using AOS animations",
    "Create a small JavaScript game with animated scroll sections",
    "Create a responsive product page with Bootstrap grid",
    "Create a basic multi-section webpage with AOS effects"
  ],

  DEFAULT_FILE: {
    // -------------------------
    // Frontend Files
    // -------------------------
    "index.html": {
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="A plain HTML, CSS, and JavaScript project with Bootstrap and AOS.">
  <title>HTML-CSS-JS Project</title>

  <!-- Bootstrap CSS -->
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
  />

  <!-- AOS CSS (Animate On Scroll) -->
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css"
  />

  <!-- Local CSS -->
  <link rel="stylesheet" href="./assets/css/styles.css" />
</head>
<body>

  <header class="bg-light p-3 mb-4">
    <h1 class="text-center">Welcome to My HTML/CSS/JS + Bootstrap + AOS Project</h1>
  </header>

  <main class="container">
    <p data-aos="fade-up" class="text-muted mb-3">
      This section fades up when scrolling into view, thanks to AOS.
    </p>
    <button id="clickMe" class="btn btn-primary" data-aos="zoom-in">
      Click Me
    </button>
  </main>

  <!-- Bootstrap JS (Bundle includes Popper) -->
  <script
    src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
    defer
  ></script>

  <!-- AOS JS -->
  <script
    src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js"
    defer
  ></script>

  <!-- Initialize AOS on DOMContentLoaded -->
  <script>
    document.addEventListener("DOMContentLoaded", function() {
      AOS.init();
    });
  </script>

  <!-- Local JS -->
  <script src="./assets/js/script.js" defer></script>
</body>
</html>`
    },

    "assets/css/styles.css": {
      code: `/* Custom styles or overrides for Bootstrap/AOS can go here. */

/* Example custom style */
#clickMe {
  margin-top: 20px;
}`
    },

    "assets/js/script.js": {
      code: `document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("clickMe");

  button.addEventListener("click", () => {
    alert("Button Clicked!");
  });
});
`
    },

    // -------------------------
    // Backend Files
    // -------------------------
    "backend/package.json": {
      code: `{
  "name": "backend",
  "version": "1.0.0",
  "description": "Backend for HTML/CSS/JS project",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "cors": "^2.8.5",
    "express": "^4.19.2",
    "mongodb": "^5.6.0",
    "nodemon": "^3.0.0",
    "mongoose": "^8.2.0"
  }
}`
    },

    "backend/index.js": {
      code: `import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://mernstack:mern@mern.tzffmt0.mongodb.net/CodeCanvas?retryWrites=true&w=majority&appName=mern';

const client = new MongoClient(mongoURI);

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("CodeCanvas");
    const dataCollection = db.collection("data");

    app.get('/api/data', async (req, res) => {
      const data = await dataCollection.find({}).toArray();
      res.json(data);
    });

    app.post('/api/data', async (req, res) => {
      const newData = req.body;
      const result = await dataCollection.insertOne(newData);
      res.json(result);
    });

  } catch (error) {
    console.error(error);
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello FullStack App from HTML/CSS/JS + Express!');
});

app.listen(port, () => {
  console.log(\`Server is running on port \${port}\`);
});
`
    },

    // -------------------------
    // Additional Backend Structure
    // -------------------------
    "backend/routes/index.js": {
      code: `// Placeholder for routes
export const placeholder = "This is a placeholder for routes";
`
    },

    "backend/controllers/index.js": {
      code: `// Placeholder for controllers
export const placeholder = "This is a placeholder for controllers";
`
    },

    "backend/models/index.js": {
      code: `// Placeholder for models
export const placeholder = "This is a placeholder for models";
`
    },

    // -------------------------
    // Gitignore
    // -------------------------
    ".gitignore": {
      code: `node_modules
.DS_Store
dist
.env
/backend/node_modules
`
    }
  },

  // Dependencies: Bootstrap & AOS for frontend, Express/MongoDB for backend
  DEPENDANCY: {
    frontend: {
      "bootstrap": "^5.3.0",
      "aos": "^2.3.4"
    },
    backend: {
      "cors": "^2.8.5",
      "express": "^4.19.2",
      "mongodb": "^5.6.0",
      "nodemon": "^3.0.0",
      "mongoose": "^8.2.0"
    }
  }
};