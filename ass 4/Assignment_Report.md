# Assignment 4: Complete To-Do List Web Application

## Title
Development and Deployment of a Complete To-Do List Web Application using React.js

## Aim
To build, test, and deploy a responsive and fully functional To-Do List web application using React.js, incorporating state management and persistent local storage.

## Objective
- To implement React functional components and React hooks (`useState`, `useEffect`, `useMemo`).
- To store and retrieve tasks dynamically using browser `localStorage` ensuring data persistence.
- To create a modern, visually clean user interface with functional features (Add, Edit, Delete, Check off).
- To organize functionality using routes or filters (All, Completed, Pending).
- To successfully deploy the final build via Netlify or Vercel.

## Theory (React + State + LocalStorage)
**React.js** is a component-based frontend library used to build interactive user interfaces efficiently. It follows the principles of one-way data binding and uses a Virtual DOM.
**State Management** is handled primarily using the `useState` hook in functional React components. State allows components to reactively update the UI when data (like adding a task) changes.
**LocalStorage** is a part of the Web Storage API, offering a way for web pages to store key/value pairs in a web browser with no expiration date. This persists the tasks even if the user refreshes or closes the page. By combining React state with local storage using custom hooks (`useLocalStorage`), the app seamlessly retains user data.

## Tools Used
- **Vite:** Build tool and development server.
- **Library:** React.js, `lucide-react` (icons), `react-router-dom` (routing/filters).
- **Environment:** Node.js, NPM.
- **Hosting / Deployment Platform:** Vercel or Netlify.

## Procedure
1. Create the Vite + React boilerplate using `npm create vite@latest "ass 4" -- --template react`.
2. Install necessary dependencies including icons and routing functionalities via `npm install react-router-dom lucide-react`.
3. Create a structured component architecture: `TaskInput`, `TaskList`, `TaskItem`.
4. Apply modern CSS styling prioritizing clean UI, interactive feedback, and proper states (like strikethrough for completed tasks).
5. Add custom hook `useLocalStorage` to synchronize React state with browser's Local Storage.
6. Build out `App.jsx` to coordinate state between adding, editing, completing, toggling, and routing filters.

## Code Snippets

**Custom `useLocalStorage` Hook (`src/hooks/useLocalStorage.js`):**
```javascript
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    setStoredValue(value);
    window.localStorage.setItem(key, JSON.stringify(value));
  };
  return [storedValue, setValue];
}
```

**Task Filter / Stats Rendering (`src/App.jsx`):**
```javascript
  const filteredTasks = useMemo(() => {
    if (location.pathname === '/active') return tasks.filter((task) => !task.completed);
    if (location.pathname === '/completed') return tasks.filter((task) => task.completed);
    return tasks; 
  }, [tasks, location.pathname]);
```

## Folder Structure
```text
ass 4/
├── index.html        (Main HTML File)
├── package.json      (Dependencies and Scripts)
├── public/           (Static assets)
│   └── _redirects    (SPA routing rules for Netlify)
├── src/              (Source Code)
│   ├── App.jsx       (Main Application component & Routes)
│   ├── index.css     (Global custom CSS and App layout)
│   ├── main.jsx      (React Bootstrap file)
│   ├── components/ 
│   │   ├── TaskInput.jsx
│   │   ├── TaskItem.jsx
│   │   └── TaskList.jsx
│   └── hooks/
│       └── useLocalStorage.js
└── vite.config.js
```

## Step-by-Step Setup
1. **Move to repository folder:** `cd "ass 4"`
2. **Install Node Packages:** Run `npm install` to download dependencies perfectly.
3. **Run Development Server:** Use `npm run dev` to serve the web application locally for testing. The app will usually run at `http://localhost:5173`.

## Output
*(Placeholders below)*
- **[Placeholder: Screenshot of the Initial Empty State layout]**
- **[Placeholder: Screenshot of multiple tasks including Strikethrough/Completed Tasks]**
- **[Placeholder: Screenshot of active routes/filtered view "Completed"]**

## Deployment Steps

This application can easily be deployed onto Netlify or Vercel. 

### Pre-requisites (Build Command):
- Framework preset: Vite
- Build Command: `npm run build`
- Output Directory: `dist`

### Option 1: Netlify Deployment
**Via Web UI:**
1. Login to Netlify and click "Add new site".
2. Choose "Deploy manually".
3. Inside your terminal run `npm run build`. This generates a `dist` folder.
4. Drag and drop the `dist` folder into Netlify's deploy zone.
*(For Git integrations, connect your Github fork and set `dist` as the build output).*

### Option 2: Vercel Deployment
1. Login to Vercel (vercel.com) and link your Github.
2. Select your repository holding the code.
3. When asked for Framework Preset, select "Vite" (Vercel automatically fills build/output commands).
4. Click **Deploy**. Vercel will install dependencies, build the project, and give a live scalable URL within seconds.

**Getting the Live URL:** Once the deployment finishes, both Netlify and Vercel will provide a prominent "Domain" or "Production URL" (e.g. `your-app.vercel.app`), which represents the final access link.

## Conclusion 
The assignment successfully demonstrated the application of functional React components and React Router for view abstractions. Utilizing variables scoped iteratively alongside browser state technologies enabled a rich, persistence-ready client-side single page web application without backend overhead requirements.
