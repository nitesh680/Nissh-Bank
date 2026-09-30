# 🏦 Nissh Bank – Online Banking Application

A modern, responsive online banking application built with **React, Vite, Spring Boot, and MongoDB**. Nissh Bank provides a user-friendly interface for managing accounts, viewing transactions, and accessing banking features securely.

## 👨‍💻 About Me

**Nitesh Kumar**  
- 🎓 Undergraduate Student | Batch 2026
- 💻 Aspiring Software Developer
- 🌱 Interested in Full-Stack Development, Java, Spring Boot, and AI/ML
- 🛠️ Skills: Java, Python, C, JavaScript, React.js, TypeScript, Spring Boot, Node.js, MongoDB, MySQL, Git, and Docker
- 🔗 GitHub: [nitesh680](https://github.com/nitesh680)

## 🚀 Project Overview

Nissh Bank is a full-stack banking application designed to demonstrate modern web development practices, REST API integration, authentication, and database management.

The application includes a React-based frontend and a Spring Boot backend connected to MongoDB.

## ✨ Features

- 🔐 User authentication and JWT-based authorization
- 🏠 Interactive banking dashboard
- 💳 Account information and account number display
- 📊 Banking activity and transaction views
- 🔔 Notifications interface
- 📱 Responsive user interface
- 🔗 REST API integration with the backend
- 🗄️ MongoDB database integration

*Features may depend on the backend implementation and current project configuration.*

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- JavaScript
- HTML5
- CSS3
- Axios

### Backend
- Java
- Spring Boot
- Spring Security
- REST APIs
- JWT Authentication

### Database
- MongoDB

### Tools
- Visual Studio Code
- Git & GitHub
- Postman
- npm

## 📂 Project Structure

```text
bank-frontend/
├── public/
├── src/
│   ├── Image/
│   ├── components/
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   └── Notifications.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── ...
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## ⚙️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/nitesh680/Nissh-Bank.git
```

### 2. Navigate to the frontend directory

```bash
cd Nissh-Bank
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the frontend root directory:

```env
VITE_API_URL=http://localhost:8080
```

Set `VITE_API_URL` to the URL of your Spring Boot backend.

### 5. Start the development server

```bash
npm run dev
```

Open the local URL shown in the terminal, usually:

```text
http://localhost:5173
```

## 🔧 Available Scripts

| Command | Description |
|---|---|
| `npm install` | Install project dependencies |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the application for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint checks |

## 🔒 Security

- JWT-based authentication for protected requests
- Backend authorization using Spring Security
- Environment variables for API configuration
- Sensitive credentials should not be committed to GitHub

## 🌐 Deployment

The frontend can be deployed using **Vercel**, with the backend hosted separately and the database managed through MongoDB Atlas.

Configure the `VITE_API_URL` environment variable with the deployed backend URL before building for production.

## 🎯 Learning Objectives

This project helps demonstrate practical experience with:

- Building reusable React components
- Developing responsive user interfaces
- Integrating frontend applications with REST APIs
- Implementing JWT-based authentication
- Connecting applications to MongoDB through a backend
- Managing source code using Git and GitHub
- Preparing a full-stack application for deployment

## 👨‍💻 Developer

**Nitesh Kumar**

GitHub: [@nitesh680](https://github.com/nitesh680)

---

⭐ If you find this project useful, feel free to explore the repository and share your feedback.

**Built with ❤️ by Nitesh Kumar**
