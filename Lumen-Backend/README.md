# Lumen Captures – Backend

**Lumen Captures** is the backend API powering an image-based platform where users can upload, manage, and explore public images.  
It’s built using **Flask + MongoDB** with a focus on modular design, security, and scalability.

---

## 🧠 Overview

This backend handles:

- 🔐 **JWT Authentication** (Access + Refresh)
- 🧑 **User management** (profiles, passwords, avatars)
- 🖼️ **Image upload & management**
- 📦 **Collections and favorites**
- 💬 **Feedback and reporting**
- 🔍 **Image search and public discovery**

All routes are protected using **JWT tokens** stored securely in HTTP-only cookies.

---

## ⚙️ Tech Stack

| Layer          | Technology                      |
| -------------- | ------------------------------- |
| Framework      | Flask                           |
| Database       | MongoDB (via PyMongo)           |
| Authentication | flask-jwt-extended              |
| Security       | Werkzeug password hashing, CORS |
| Deployment     | Render                          |

---

## 📁 Project Structure

Lumen-Backend/  
│
├── app/  
│ ├── controllers/  
│ ├── middlewares/  
│ ├── models/  
│ ├── routes/  
│ ├── services/  
│ ├── utils/  
│ ├── config.py # App configuration  
│ ├── extensions.py (JWT, DB, etc.)  
│ └── init.py  
│  
├── Profile  
├── readme.md  
├── run.py # Entry point  
└── requirements.txt

## ⚡ Setup Instructions

```bash
# Clone the repository
git clone https://github.com/satyam-yadav12/Lumen-Captures.git
cd Lumen-Captures/Lumen-Backend

#  Create a virtual environment
python -m venv venv
venv\Scripts\activate      # for Windows


pip install -r requirements.txt

#  Configure environment variables (.env)
SECRET_KEY = "secret key for app"
MONGO_URI="atlas connection string"
JWT_SECRET_KEY="secret key for jwt"
GOOGLE_CLIENT_ID= "your google client id"
GOOGLE_CLIENT_SECRET= "google client secret"
FRONTEND_ORIGIN="http://localhost:5173"
CLOUDINARY_CLOUD_NAME="cloud name"
CLOUDINARY_API_KEY="cloudinary api key"
CLOUDINARY_API_SECRET="cloudinary api secret"

# 5. Run the application
flask --app run run --debug

Server runs at: http://127.0.0.1:5000
```

## 📡 API Routes Documentation

### 🔐 Authentication Routes

| Method | Endpoint                 | Description                           |
| ------ | ------------------------ | ------------------------------------- |
| POST   | `/register`              | Register a new user                   |
| POST   | `/login`                 | Authenticate user and set JWT cookies |
| POST   | `/logout`                | Clear authentication cookies          |
| GET    | `/me`                    | Get currently authenticated user      |
| GET    | `/google/login`          | Initiate Google OAuth login           |
| GET    | `/google/login/callback` | OAuth callback handler                |
| GET    | `/healthz`               | Health check endpoint                 |

### 🖼 Public Image & Search Routes

| Method | Endpoint        | Description                   |
| ------ | --------------- | ----------------------------- |
| GET    | `/search`       | Search images by keyword      |
| GET    | `/allimages`    | Fetch paginated public images |
| GET    | `/source`       | Filter user-uploaded images   |
| GET    | `/uploads/<id>` | Fetch single image details    |

### 👤 User Profile Routes

| Method      | Endpoint                  | Description                |
| ----------- | ------------------------- | -------------------------- |
| GET         | `/profile`                | Get user profile details   |
| PUT / PATCH | `/editprofile`            | Update profile information |
| PUT         | `/changepassword`         | Change account password    |
| PUT / PATCH | `/change-profile-picture` | Update profile picture     |

### 📸 User Content Routes

| Method      | Endpoint               | Description                 |
| ----------- | ---------------------- | --------------------------- |
| POST        | `/upload-new`          | Upload new image            |
| GET         | `/uploads`             | Get images uploaded by user |
| PUT / PATCH | `/uploads/<id>/update` | Update image details        |
| DELETE      | `/uploads/<id>/delete` | Delete uploaded image       |

### ❤️ Collection & Likes Routes

| Method | Endpoint           | Description                   |
| ------ | ------------------ | ----------------------------- |
| POST   | `/save/<img_id>`   | Save image to user collection |
| DELETE | `/unsave/<img_id>` | Remove image from collection  |
| GET    | `/collection`      | Get user collection           |
| GET    | `/likes`           | Fetch all liked images        |

### 💬 Feedback & Reporting Routes

| Method | Endpoint              | Description                |
| ------ | --------------------- | -------------------------- |
| POST   | `/feedback`           | Submit general feedback    |
| GET    | `/fetchfeedback`      | Fetch feedback entries     |
| POST   | `/reportcontent/<id>` | Report image for violation |
