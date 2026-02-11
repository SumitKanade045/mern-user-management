# MERN User Management App

A full-stack MERN application for managing users with image uploads, validation, and a responsive UI. The backend is built with Express and MongoDB, using Cloudinary for image storage. The frontend is built with React (Vite) and Material UI.

## Features
- User CRUD (create, read, update, delete)
- Image upload to Cloudinary
- Form validation and error handling
- CSV export support
- Clean UI with Material UI and framer-motion

## Tech Stack
- Backend: Node.js, Express, Mongoose, Cloudinary, Multer, express-validator
- Frontend: React (Vite), Material UI, React Router, React Hook Form, Axios
- Database: MongoDB

## Prerequisites
- Node.js (LTS recommended)
- MongoDB connection string (Atlas or local)
- Cloudinary account for image hosting

## Environment Variables (Backend)
Create a `.env` file inside `backend/` with:
```
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
PORT=5000
```
The frontend expects the backend at `http://localhost:5000`. If you change `PORT`, update the base URL in `frontend/src/api/userApi.js`.

## Getting Started
Install dependencies:
```bash
cd backend
npm install
cd ../frontend
npm install
```

Run in development:
```bash
# backend (nodemon)
cd backend
npm run dev

# frontend (Vite)
cd ../frontend
npm run dev
```
- Frontend dev server: http://localhost:5173
- Backend API: http://localhost:5000

## Scripts
- Backend
  - `npm run dev` — start with nodemon
  - `npm start` — start production server
- Frontend
  - `npm run dev` — start Vite dev server
  - `npm run build` — production build
  - `npm run preview` — preview built app
  - `npm run lint` — run ESLint

## API
- Base path: `/api/users`
- Example route: `GET /api/users` returns list of users

## Build & Deploy
- Build frontend: `cd frontend && npm run build`
- Serve backend with the environment variables set
- Host the built frontend (e.g., on static hosting) and point it to the backend API

## Project Structure
```
mern-project/
├── backend/          # Express API (MongoDB, Cloudinary)
│   ├── config/       # db connection, cloudinary setup
│   ├── controllers/  # route handlers
│   ├── middleware/   # error handling, validation, uploads
│   ├── models/       # Mongoose schemas
│   ├── routes/       # API routes
│   └── server.js     # app entry
└── frontend/         # React (Vite) client
    ├── src/          # pages, components, API client
    └── vite.config.js
```

## Notes
- Ensure MongoDB and Cloudinary credentials are valid before starting the backend.
- If you deploy, set environment variables on the server and update the frontend API base URL if needed.

