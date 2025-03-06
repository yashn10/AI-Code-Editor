import dedent from "dedent";

export default {
  SUGGSTIONS: ['Create ToDo App in React', 'Create Budget Track App', 'Create Gym Managment Portal Dashboard', 'Create Quizz App On History', 'Create Login Signup Screen'],
  HERO_HEADING: 'What do you want to build?',
  HERO_DESC: 'Prompt, run, edit, and deploy full-stack web apps.',
  INPUT_PLACEHOLDER: 'What you want to build?',
  SIGNIN_HEADING: 'Continue With Bolt.New 2.0',
  SIGNIN_SUBHEADING: 'To use Bolt you must log into an existing account or create one.',
  SIGNIn_AGREEMENT_TEXT: 'By using Bolt, you agree to the collection of usage data for analytics.',


  DEFAULT_FILE: {
    '/frontend/public/index.html': {
      code: `<!DOCTYPE html>
<html lang="en">
 <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="https://cdn.tailwindcss.com"></script>
 </head>
 <body>
  <div id="root"></div>
 </body>
</html>`
    },
    '/frontend/src/App.css': {
      code: `
      @tailwind base;
@tailwind components;
@tailwind utilities;`
    },
    '/frontend/tailwind.config.js': {
      code: `
      /** @type {import('tailwindcss').Config} */
module.exports = {
 content: [
  "./src/**/*.{js,jsx,ts,tsx}",
 ],
 theme: {
  extend: {},
 },
 plugins: [],
}`
    },
    '/frontend/postcss.config.js': {
      code: `/** @type {import('postcss-load-config').Config} */
const config = {
 plugins: {
  tailwindcss: {},
 },
};

export default config;
`
    },
    '/backend/package.json': {
      code: `{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
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
    "mongodb": "^7.1.0",
    "nodemon": "^3.3.3"
  }
}`
    },
    '/backend/index.js': {
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

  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close(); // Keep connection open for API to work
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello FullStack App from Bolt.New!');
});

app.listen(port, () => {
  console.log(\`Server is running on port \${port}\`);
});
`
    },
    '/.gitignore': {
      code: `node_modules
/frontend/node_modules
/backend/node_modules
.env
`
    }
  },
  DEPENDANCY: {
    "frontend": {
      "postcss": "^8",
      "tailwindcss": "^3.4.1",
      "autoprefixer": "^10.0.0",
      "uuid4": "^2.0.3",
      "tailwind-merge": "^2.4.0",
      "tailwindcss-animate": "^1.0.7",
      "lucide-react": "^0.469.0",
      "react-router-dom": "^7.1.1",
      "firebase": "^11.1.0",
      "@google/generative-ai": "^0.21.0",
      "date-fns": "^4.1.0",
      "react-chartjs-2": "^5.3.0",
      "chart.js": "^4.4.7",
    },
    "backend": {
      "cors": "^2.8.5",
      "express": "^4.19.2",
      "mongodb": "^7.1.0",
      "nodemon": "^3.3.3",
      "mongoose": "^8.2.0"
    }
  },
  PRICING_DESC: 'Start with a free account to speed up your workflow on public projects or boost your entire team with instantly-opening production environments.',
  PRICING_OPTIONS: [
    {
      name: 'Basic',
      tokens: '50K',
      value: 50000,
      desc: 'Ideal for hobbyists and casual users for light, exploratory use.',
      price: 4.99
    },
    {
      name: 'Starter',
      tokens: '120K',
      value: 120000,
      desc: 'Designed for professionals who need to use Bolt a few times per week.',
      price: 9.99
    },
    {
      name: 'Pro',
      tokens: '2.5M',
      value: 2500000,
      desc: 'Designed for professionals who need to use Bolt a few times per week.',
      price: 19.99
    },
    {
      name: 'Unlimted (License)',
      tokens: 'Unmited',
      value: 999999999,
      desc: 'Designed for professionals who need to use Bolt a few times per week.',
      price: 49.99
    }
  ]


}