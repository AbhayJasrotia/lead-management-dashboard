# Lead Management Dashboard

A full-stack CRM application built with MERN stack.

## Features
- User authentication
- Lead management with search and filters
- Analytics dashboard
- Mobile responsive

## Tech Stack
- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Database:** MongoDB Atlas

## Setup Instructions

### Backend
```bash
cd backend
npm install
cp .env.example .env  # Add your MongoDB URI
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

### Backend (.env)
```
MONGO_URI=your_mongodb_uri
PORT=5000
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

## Seeding Data
```bash
cd backend
node seed.js
```

## Demo Credentials
- Username: `admin`
- Password: `admin123`

## Screenshot
![Screenshot 2026-01-16 161518](https://github.com/user-attachments/assets/06741bf7-e455-4974-b945-d69dbd2157dd)

## Deployed Links
- Frontend: [Your Vercel URL]
- Backend: [Your Render URL]

## Author
Abhay
