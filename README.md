# FitPro Frontend

Frontend app for the FitPro SaaS platform.

This application provides role-based dashboards for:

- Admin
- Trainer
- Client

It connects directly to the FitPro backend API.

---

## 1. Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Axios
- React Router

---

## 2. Requirements

Before running the frontend, install:

### Required
- Node.js 20+ recommended
- npm
- Git

### Required for full app usage
- FitPro backend must already be running
- PostgreSQL must already be set up for backend

---

## 3. Clone the Repository

```bash
git clone <YOUR_FRONTEND_REPO_URL>
cd fitpro-frontend
4. Install Dependencies
npm install
5. Create Environment File

Create a file named:

.env

in the frontend root.

Use:

VITE_API_URL=http://localhost:5000/api/v1
VITE_APP_NAME=FitPro
6. Important Backend Requirement

Before starting the frontend, make sure the backend is already running.

Backend should run on:

http://localhost:5000

And backend .env should include:

FRONTEND_URL=http://localhost:8080

Without that, login may fail because of CORS.

7. Start the Frontend
npm run dev

Frontend should run on:

http://localhost:8080

Open that URL in your browser.

8. Login / Test Users

Use users that exist in the backend database.

Recommended test users:

Admin
Email: admin@fitpro.com
Password: Admin123!
Trainer
Email: sarah_j.trainer@fitpro.com
Password: SarahJTrainer123!
Client
Email: mike_c.client@fitpro.com
Password: MikeCClient123!

If these users do not exist, create them through:

backend seed
frontend register page
Postman
9. Frontend Routes
Public Routes
/
/login
/register
/forgot-password
/reset-password/:token
Admin Routes
/admin/dashboard
/admin/trainers
/admin/clients
/admin/settings
/admin/announcements
/admin/profile
Trainer Routes
/trainer/dashboard
/trainer/clients
/trainer/plans
/trainer/nutrition
/trainer/schedule
/trainer/messages
/trainer/profile
Client Routes
/client/dashboard
/client/workouts
/client/nutrition
/client/progress
/client/schedule
/client/messages
/client/profile
10. Main Features
Authentication
login
register
forgot password
reset password
persistent session after refresh
Admin
analytics dashboard
trainers list
clients list
settings
announcements
notifications
profile
Trainer
dashboard
clients list
assign client
workout plans
nutrition plans
edit nutrition plans
sessions
messages
notifications
profile
Client
dashboard
workouts
nutrition
progress
sessions
messages
notifications
profile
11. Running the Full App
Terminal 1 — backend
cd fitpro-backend
npm run dev
Terminal 2 — frontend
cd fitpro-frontend
npm run dev

Then open:

http://localhost:8080
12. Recommended First-Time Setup Checklist
Step 1

Install Node.js

Step 2

Clone frontend repo

Step 3

Run:

npm install
Step 4

Create .env

Step 5

Make sure backend is already running

Step 6

Run:

npm run dev
Step 7

Open browser at:

http://localhost:8080
Step 8

Login with an existing seeded user

13. Common Commands
Install dependencies
npm install
Start dev server
npm run dev
Build production bundle
npm run build
Preview production build
npm run preview
14. Project Structure
fitpro-frontend/
├── public/
├── src/
│   ├── components/
│   ├── contexts/
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   │   ├── admin/
│   │   ├── auth/
│   │   ├── client/
│   │   └── trainer/
│   ├── services/
│   ├── test/
│   ├── types/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env
├── package.json
└── README.md
15. API Connection

Frontend uses:

VITE_API_URL=http://localhost:5000/api/v1

That means all frontend services point to backend routes like:

/auth/login
/users/me
/trainer/clients
/nutrition/client
/notifications
16. Notifications

The bell icon in the dashboard layout reads real notifications from backend.

Users can receive notifications for:

new messages
new sessions
workout plan assigned
nutrition plan assigned
account status changes
announcements
17. Troubleshooting
Invalid credentials

Usually one of these:

backend not running
wrong email/password
backend CORS issue
wrong VITE_API_URL
Blank page or broken route

Check:

backend is running
frontend console
App.tsx routes
user role
Login works in Postman but not frontend

Usually backend .env has wrong FRONTEND_URL

Correct value:

FRONTEND_URL=http://localhost:8080
Notifications not showing

Check:

backend notifications endpoint
user has notifications in DB
page refreshed or bell polling has run
