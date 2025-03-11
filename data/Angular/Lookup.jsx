// data/Angular/Lookup.jsx

export default {
  DEFAULT_FILE: {
    // -------------------------
    // 1. FRONTEND PACKAGE.JSON
    // -------------------------
    "/frontend/package.json": {
      code: `{
  "name": "my-angular-app",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "test": "ng test"
  },
  "dependencies": {
    "@angular/animations": "~16.2.0",
    "@angular/common": "~16.2.0",
    "@angular/compiler": "~16.2.0",
    "@angular/core": "~16.2.0",
    "@angular/forms": "~16.2.0",
    "@angular/platform-browser": "~16.2.0",
    "@angular/platform-browser-dynamic": "~16.2.0",
    "@angular/router": "~16.2.0",
    "bootstrap": "^5.3.0",
    "aos": "^3.0.0-beta.6",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0",
    "zone.js": "~0.13.0",
    "@angular/common/http": "latest"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "~16.2.0",
    "@angular/cli": "~16.2.0",
    "@angular/compiler-cli": "~16.2.0",
    "@types/jasmine": "~4.3.0",
    "@types/node": "^18.0.0",
    "typescript": "~4.9.5"
  }
}
`
    },

    // -------------------------
    // 2. ANGULAR HTML ENTRY
    // -------------------------
    "/frontend/index.html": {
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Angular App</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <app-root></app-root>
</body>
</html>`
    },

    // -------------------------
    // 3. POLYFILLS FOR ZONE.JS
    // -------------------------
    "/frontend/src/polyfills.ts": {
      code: `/***************************************************************************************************
 * Load Zone.js for the Angular application.
 */
import 'zone.js/dist/zone'; // Required for Angular > 2
`
    },

    // -------------------------
    // 4. MAIN.TS - BOOTSTRAP
    // -------------------------
    "/frontend/src/main.ts": {
      code: `import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import './polyfills'; // Make sure polyfills are imported

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
`
    },

    // -------------------------
    // 5. ROOT COMPONENT
    // -------------------------
    "/frontend/src/app/app.component.ts": {
      code: `import { Component, OnInit } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-app';

  ngOnInit(): void {
    AOS.init();
  }
}
`
    },
    "/frontend/src/app/app.component.html": {
      code: `<div class="container mt-5">
  <h1 class="text-3xl font-bold text-blue-700 mb-4">Welcome to My Angular App!</h1>
  <p class="text-gray-700">This is a basic Angular app using Tailwind, Bootstrap, and AOS.</p>
  <button class="btn btn-primary mt-3" data-aos="fade-up">Test AOS Animation</button>
</div>`
    },
    "/frontend/src/app/app.component.css": {
      code: `/* You can add custom component styles here. */`
    },

    // -------------------------
    // 6. APP MODULE & ROUTING
    // -------------------------
    "/frontend/src/app/app.module.ts": {
      code: `import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
`
    },
    "/frontend/src/app/app-routing.module.ts": {
      code: `import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
`
    },

    // -------------------------
    // 7. TAILWIND / POSTCSS
    // -------------------------
    "/frontend/tailwind.config.js": {
      code: `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
`
    },
    "/frontend/postcss.config.js": {
      code: `/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};

export default config;
`
    },

    // -------------------------
    // 8. BACKEND PACKAGE + CODE
    // -------------------------
    "/backend/package.json": {
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
    "mongodb": "^5.6.0",
    "nodemon": "^3.0.0"
  }
}`
    },
    "/backend/index.js": {
      code: `import express from 'express';
import cors from 'cors';
import { MongoClient } from 'mongodb';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://username:password@cluster.mongodb.net/myDB?retryWrites=true&w=majority';

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
  res.send('Hello FullStack App from Angular + Express!');
});

app.listen(port, () => {
  console.log(\`Server is running on port \${port}\`);
});
`
    },

    // -------------------------
    // 9. GITIGNORE
    // -------------------------
    "/.gitignore": {
      code: `node_modules
/frontend/node_modules
/backend/node_modules
.env
`
    }
  },

  // ---------------------------------------
  // 10. DEPENDENCIES FOR SANDPACK (OPTIONAL)
  // ---------------------------------------
  DEPENDANCY: {
    frontend: {
      "@angular/animations": "~16.2.0",
      "@angular/common": "~16.2.0",
      "@angular/compiler": "~16.2.0",
      "@angular/core": "~16.2.0",
      "@angular/forms": "~16.2.0",
      "@angular/platform-browser": "~16.2.0",
      "@angular/platform-browser-dynamic": "~16.2.0",
      "@angular/router": "~16.2.0",
      "bootstrap": "^5.3.0",
      "aos": "^3.0.0-beta.6",
      "rxjs": "~7.8.0",
      "tslib": "^2.3.0",
      "zone.js": "~0.13.0"
    }
  }
};
