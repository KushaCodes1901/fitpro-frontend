# FitPro Frontend

FitPro is a SaaS fitness coaching platform that connects **trainers and clients**.
This repository contains the **frontend application** built with React and TypeScript.

The frontend provides dashboards and tools for three roles:

* **Admin** – manage trainers, clients, and platform settings
* **Trainer** – manage clients, workout plans, nutrition, and schedules
* **Client** – view workouts, track progress, and communicate with trainers

---

## Tech Stack

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router
* Axios

---

## Features

### Authentication

* Login
* Register
* Forgot password
* Reset password
* Role-based access (Admin / Trainer / Client)

### Admin Dashboard

* Trainer management
* Client management
* Platform settings
* Announcements

### Trainer Dashboard

* Client management
* Workout plan creation
* Nutrition plans
* Session scheduling
* Messaging with clients

### Client Dashboard

* Workout tracking
* Nutrition plans
* Progress tracking
* Session schedule
* Messaging with trainer

---

## Project Structure

src
  components
    shared
    admin
    trainer
    client

  pages
    auth
    admin
    trainer
    client

  hooks
  services
  contexts
  types
  utils

---

## Environment Variables

Create a `.env` file in the root of the project.

Example:

VITE_API_URL=http://localhost:5000/api/v1
VITE_APP_NAME=FitPro

---

## Installation

Clone the repository

git clone https://github.com/YOUR_USERNAME/fitpro-frontend.git

Install dependencies

npm install

Start the development server

npm run dev

The application will run at

http://localhost:3000

---

## Backend

This frontend connects to the backend API located in the repository:

fitpro-backend

The backend is built using Node.js, Express, Prisma, and PostgreSQL.

---

## License

This project is created for educational and portfolio purposes.
