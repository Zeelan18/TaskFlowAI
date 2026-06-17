# 🚀 TaskFlow AI – AI-Powered Task Management System

## 📌 Overview

TaskFlow AI is a full-stack AI-powered task management application designed to help users organize, prioritize, track, and complete tasks efficiently. The platform combines modern web development with Artificial Intelligence to automatically generate structured task plans, improve productivity, and provide a seamless task management experience.

Built using React.js and Flask, the application features secure JWT authentication, AI-powered task generation using Google Gemini AI, analytics dashboards, task tracking, due-date monitoring, and cloud deployment.

---

## 🎯 Problem Statement

Managing tasks manually can become overwhelming, especially when handling multiple projects and deadlines. Users often struggle with planning, prioritization, and tracking progress.

TaskFlow AI addresses this challenge by providing:

* Intelligent task organization
* AI-generated task breakdowns
* Deadline tracking and reminders
* Real-time task analytics
* Secure multi-user access
* Cloud-based accessibility

---

## ✨ Key Features

### 🔐 User Authentication & Security

* User Registration and Login
* JWT-Based Authentication
* Protected Routes
* Secure Password Hashing using Flask-Bcrypt
* Session Management

### 📋 Task Management

* Create Tasks
* Edit Tasks
* Delete Tasks
* Mark Tasks as Completed
* Task Prioritization (High, Medium, Low)
* Task Categorization
* Deadline Management

### 🤖 AI-Powered Task Generation

* Integrated Google Gemini AI
* Generates structured task plans from user prompts
* Breaks large projects into actionable tasks
* Enhances productivity through intelligent planning

### 📊 Analytics Dashboard

* Task Status Overview
* Completion Analytics
* Interactive Pie Charts
* Productivity Insights

### ⏰ Due Date Monitoring

* Due Today Alerts
* Overdue Task Detection
* Deadline Tracking System

### 👤 User Profile Management

* Profile Dashboard
* User Information Display
* Task Statistics Summary

### 🌙 Modern User Experience

* Responsive Design
* Dark Mode Support
* Professional UI with Tailwind CSS
* Mobile-Friendly Layout

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router DOM
* Axios
* Tailwind CSS
* Recharts

### Backend

* Python
* Flask
* Flask-JWT-Extended
* Flask-SQLAlchemy
* Flask-Bcrypt
* Flask-CORS

### Database

* SQLite (Production Deployment)

### Artificial Intelligence

* Google Gemini AI API

### Deployment

* Frontend: Vercel
* Backend: Render

### Version Control

* Git
* GitHub

---

## 📂 Project Architecture

TaskFlowAI

├── frontend/

│ ├── src/

│ ├── pages/

│ ├── components/

│ ├── services/

│ └── App.jsx

│

├── backend/

│ ├── models/

│ ├── routes/

│ ├── config/

│ ├── services/

│ ├── app.py

│ └── requirements.txt

│

└── README.md

---

## 🚀 Live Demo

### Frontend

https://task-flow-ai-livid.vercel.app

### Backend API

https://taskflowai-d7uz.onrender.com

---

## 🔧 Installation & Setup

### Clone Repository

```bash
git clone https://github.com/Zeelan18/TaskFlowAI.git
cd TaskFlowAI
```

### Backend Setup

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

python app.py
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
JWT_SECRET_KEY=YOUR_JWT_SECRET_KEY
SECRET_KEY=YOUR_SECRET_KEY
```

---

## 📈 Skills Demonstrated

* Full Stack Development
* REST API Development
* JWT Authentication
* Database Integration
* AI API Integration
* Cloud Deployment
* Frontend Development
* Backend Development
* Secure Application Design
* Version Control & Collaboration
* Problem Solving & Debugging

---

## 🏆 Project Outcomes

* Successfully developed and deployed a full-stack AI-powered productivity platform.
* Integrated Generative AI to automate task planning and improve user efficiency.
* Implemented secure authentication and authorization workflows.
* Deployed production-ready frontend and backend applications on cloud platforms.
* Gained hands-on experience with modern software development practices and deployment pipelines.

---

## 👨‍💻 Author

**Zeelan I**

B.Tech – Artificial Intelligence & Data Science

Government College of Engineering, Bargur

GitHub: https://github.com/Zeelan18

LinkedIn: [www.linkedin.com/in/zeelan-i-70965b295](http://www.linkedin.com/in/zeelan18)

---

⭐ If you found this project useful, feel free to star the repository and connect with me.
