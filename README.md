# Full Stack Students Management Table Application

This project is a complete full-stack web application consisting of a React (Vite) frontend and a NestJS backend. Data is stored in memory as an array without requiring a database. 

## Complete Project Folder Structure

```
Student_table/
├── backend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── src/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   │   ├── app.controller.ts
│   │   ├── app.service.ts
│   │   └── students/
│   │       ├── students.module.ts
│   │       ├── students.controller.ts
│   │       ├── students.service.ts
│   │       ├── dto/
│   │       │   ├── create-student.dto.ts
│   │       │   └── update-student.dto.ts
│   │       └── entities/
│   │           └── student.entity.ts
│   └── test/
├── frontend/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── index.html
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   ├── components/
│   │   │   ├── StudentTable.jsx
│   │   │   ├── StudentForm.jsx
│   │   │   └── Loading.jsx
│   │   └── utils/
│   │       └── exportExcel.js
│   └── public/
└── README.md
```

## Installation Commands

**1. Clone or download the repository.**

**2. Install Backend Dependencies:**
```bash
cd backend
npm install
npm install uuid class-validator class-transformer
npm install -D @types/uuid
```

**3. Install Frontend Dependencies:**
```bash
cd ../frontend
npm install
npm install -D tailwindcss postcss autoprefixer
npm install axios react-icons xlsx file-saver
npx tailwindcss init -p
```

## Steps to Run Frontend and Backend

**1. Start the Backend:**
```bash
cd backend
npm run start:dev
```
*The backend will be running on `http://localhost:3000`*

**2. Start the Frontend:**
Open a new terminal window:
```bash
cd frontend
npm run dev
```
*The frontend will typically be accessible on `http://localhost:5173`*

## Steps to Deploy Both Services

### Backend Deployment (Render or Railway)

**Render:**
1. Push your code to a GitHub repository.
2. Sign in to [Render](https://render.com) and click **New > Web Service**.
3. Connect your repository.
4. Set the Root Directory to `backend` (if you are deploying from a monorepo) or leave blank if deploying a standalone backend repo.
5. Set Build Command to: `npm install && npm run build`
6. Set Start Command to: `npm run start:prod`
7. Click **Create Web Service**.

**Railway:**
1. Push code to GitHub.
2. Go to [Railway](https://railway.app) and create a New Project.
3. Select "Deploy from GitHub repo" and choose your repo.
4. Railway will automatically detect the NestJS environment (`npm run start` or `npm run build`). Use Custom start commands if necessary: `npm run start:prod`.

### Frontend Deployment (Vercel or Netlify)

*Note: Before deploying, ensure `API_URL` in `src/App.jsx` points to your newly deployed backend URL instead of `localhost:3000`.*

**Vercel:**
1. Push your code to GitHub.
2. Sign in to [Vercel](https://vercel.com) and click **Add New > Project**.
3. Import your repository.
4. If it's a monorepo, set the Root Directory to `frontend`.
5. Framework preset should be auto-detected as **Vite**. Build command: `npm run build` Output directory: `dist`.
6. Click **Deploy**.

**Netlify:**
1. Push your code to GitHub.
2. Sign in to [Netlify](https://netlify.com) and click **Add new site > Import an existing project**.
3. Choose your repository.
4. Set Base directory to `frontend`.
5. Set Build command to `npm run build`.
6. Set Publish directory to `frontend/dist`.
7. Click **Deploy site**.
