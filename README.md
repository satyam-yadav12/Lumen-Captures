# Lumen Captures

[![React](https://img.shields.io/badge/React-17.0.2-blue?logo=react)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-2.3.0-orange?logo=flask)](https://flask.palletsprojects.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green?logo=mongodb)](https://www.mongodb.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.0-blue?logo=tailwind-css)](https://tailwindcss.com/)
[![Material UI](https://img.shields.io/badge/Material%20UI-5.0-blueviolet?logo=mui)](https://mui.com/)

Lumen Captures is a **portfolio image exploration and sharing platform** built with **Flask, React, MongoDB, Tailwind CSS, and Material UI**.  
Users can upload, browse, like, and interact with images with secure JWT authentication, OAuth login, and infinite scrolling over a large dataset (~25k images).

---

## 🔹 Features

- User registration, login, and OAuth authentication
- JWT-based HttpOnly cookie sessions with refresh tokens
- Upload, edit, delete images (user-owned)
- Infinite scroll gallery (~25k images)
- Like/Dislike system & “Liked Images” view
- Feedback submission
- Responsive mobile-first design
- Dark/Light theme toggle
- MIT license & Terms page

---

## 📂 Project Structure

Lumen-Captures/  
├─ Lumen-Backend/  
├─ Lumen-Frontend/  
├─ .gitignore  
├─ LICENSE  
└─ README.md

---

## ⚡ Getting Started

This project has **two parts**: backend and frontend. Each has its own setup instructions.  
Please follow the links below for detailed guides:

- [Backend Setup & API Docs](./Lumen-Backend/README.md)
- [Frontend Setup & UI Docs](./Lumen-Frontend/README.md)

---

## 🚀 Tech Stack

| Layer            | Technology                          |
| ---------------- | ----------------------------------- |
| Frontend         | React, Tailwind CSS, Material UI    |
| Backend          | Flask, PyMongo                      |
| Database         | MongoDB                             |
| Auth             | JWT (HttpOnly cookies), OAuth login |
| Hosting          | Netlify, Render                     |
| State Management | React Context API                   |
| Pagination       | Cursor-based infinite scrolling     |

---

## 🏗 Architecture Overview

- Client: React SPA (Netlify)
- API: Flask REST API (Render)
- Auth: JWT Access + Refresh stored in HttpOnly cookies
- Storage: Cloudinary for media
- Database: MongoDB Atlas

## ⚡ Live Demos:

Frontend: [https://lumen-captures.netlify.app/](https://lumen-captures.netlify.app/)  
Backend health check: [https://lumen-captures.onrender.com/healthz](https://lumen-captures.onrender.com/healthz)

Backend may take few seconds to wake up so please check server status first from above health check route bofore visiting frotend

## ⚖️ License

MIT License © 2026
