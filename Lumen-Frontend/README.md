# Lumen Captures – Frontend

The frontend of **Lumen Captures** is a modern React Single Page Application (SPA) designed for performance, responsiveness, and secure session-based authentication.

It provides a smooth image exploration and portfolio experience powered by cursor-based pagination and cookie-based JWT authentication.

## 📸 Screenshots

### Home Page

![Homepage](./assets/screenshots/homepage.png)

### Image Layout Desktop

![Liked Images](./assets/screenshots/liked.png)

### Uploads

![Image Upload](./assets/screenshots/upload.png)

### Responsive UI + Dark Mode

![mobile design](./assets\screenshots\mobile.jpeg)

## Project structure

Lumen-Frontend/  
│  
├── src/  
│ ├── components/  
│ ├── pages/  
│ ├── context/  
│ ├── hooks/  
│ ├── services/  
│ ├── utils/  
│ └── App.jsx  
│  
├── public/  
├── .env  
├── package.json  
└── README.md

## Setup Instruction

```bash
cd Lumen-Captures/Lumen-Frontend
npm install

# Configure environment variables
VITE_API_URL=<your-backend-url>
VITE_LICENSE_URL=<license-url>
VITE_OAUTH_URL=google/login

npm run dev

# app runs at
http://localhost:5173
```
