

<img width="1536" height="1024" alt="Bookshelf Life Library Logo" src="https://github.com/user-attachments/assets/d673e1cf-5f9b-4636-aa92-8c5f0ff3a785" />


# 📚 Shelf Life
### Library Management System

**A smarter way to organize, manage, and access library resources.**

Shelf Life is a web-based Library Management System developed as part of **COMP229 – Web Application Development** at Centennial College. The project aims to simplify everyday library operations by providing a centralized platform for managing books, library members, and borrowing activities.

Our goal is to develop an organized, user-friendly application that makes library management more efficient while providing users with an easier way to explore and access library resources.

---

## 📌 Table of Contents

- [Project Overview](#-project-overview)
- [Key Features](#-key-features)
- [Technology Stack](#-technology-stack)
- [Project Architecture](#-project-architecture)
- [Getting Started](#-getting-started)
- [Running the Application](#-running-the-application)
- [API Health Check](#-api-health-check)
- [Development Tools](#-development-tools)
- [Project Team](#-project-team)
- [Project Status](#-project-status)

---

## 🎯 Project Overview

Managing a library involves keeping track of books, members, availability, and borrowing records. Shelf Life is designed to bring these operations together in one centralized application.

The system is being developed with two main types of users in mind:

- **Administrators:** Manage the library's books, members, and borrowing records.
- **Members:** Browse the book collection, search for books, and check their availability.

The application will continue to evolve as our team develops and integrates additional functionality throughout the project.

---

## ✨ Key Features

The planned application features include:

| Feature | Description |
|---|---|
| 🔐 User Authentication | User registration and secure login. |
| 👥 User Management | Manage library member accounts and user information. |
| 📚 Book Management | Add, view, update, and delete book records. |
| 🔎 Book Search | Search for books by title, author, ISBN, or category. |
| 📊 Dashboard | Display important library statistics and information. |
| 📖 Borrowing Management | Track borrowed books and borrowing records. |
| ↩️ Return Management | Manage returned books and update availability. |
| 🛡️ Role-Based Access | Provide different permissions for administrators and members. |

*Note: These are the planned features. Functionality will be implemented progressively as development continues.*

---

## 🛠️ Technology Stack

Shelf Life uses modern web development technologies to build its frontend, backend, and database components.

### Frontend
- **React.js** – Component-based user interface development.
- **JavaScript** – Application functionality and interactions.
- **HTML5** – Web page structure.
- **CSS3** – Styling and responsive layouts.
- **Vite** – Frontend development server and build tool.

### Backend
- **Node.js** – JavaScript runtime environment.
- **Express.js** – Backend framework for building REST APIs.
- **MongoDB** – NoSQL database for storing application data.
- **Mongoose** – Object Data Modeling (ODM) for MongoDB.

### Development & Collaboration
- **Visual Studio Code** – Code editor and development environment.
- **GitHub** – Source code hosting and team collaboration.
- **Jira** – Agile project planning and task management.
- **Thunder Client** – API testing and debugging.

---

## 🏗️ Project Architecture

The project follows a frontend/backend architecture, separating the user interface from the server-side application.

```text
Shelf-Life/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   ├── .env.example
│   └── package.json
│
├── documentation/
│
├── .gitignore
└── README.md
```

### Architecture Components

- **Frontend:** Handles the user interface and user interactions.
- **Backend:** Processes application requests and provides API endpoints.
- **Database:** Stores and manages application information.
- **API:** Allows communication between the frontend and backend.

---

## 🚀 Getting Started

Follow these instructions to download and run Shelf Life on your computer.

### Prerequisites

Before starting, make sure you have installed:

1. [Node.js and npm](https://nodejs.org/)
2. [Visual Studio Code](https://code.visualstudio.com/)
3. A modern web browser (Chrome, Edge, Firefox, etc.).

### 1. Download the Repository

1. Open this GitHub repository.
2. Click the green **Code** button.
3. Select **Download ZIP**.
4. Extract the downloaded ZIP file to your computer.

### 2. Open the Project in Visual Studio Code

1. Launch Visual Studio Code.
2. Select **File → Open Folder**.
3. Locate the extracted `Shelf-Life` folder.
4. Select the folder and open it.

---

## 💻 Running the Application

The frontend and backend run separately. Keep both running while developing and testing the application.

### Step 1: Start the Frontend

1. Open Visual Studio Code.
2. Select **Terminal → New Terminal**.
3. Enter the following commands:

```bash
cd frontend
npm install
npm run dev
```

Vite will start the frontend development server.

Open the local address displayed in your terminal. The default address is:

**http://localhost:5173**

### Step 2: Start the Backend

1. Open another terminal using **Terminal → New Terminal**.
2. Enter:

```bash
cd backend
npm install
npm run dev
```

The Express backend will start on port `5000`.

### Step 3: Verify the Backend

Open your browser and visit:

**http://localhost:5000/api/health**

If the backend is running correctly, you should receive a successful health-check response.

---

## 🔌 API Health Check

The initial backend includes the following endpoint:

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Checks whether the backend server is running. |
| GET | `/api/books` | Initial book API endpoint. |

Additional API endpoints and functionality will be developed as the project progresses.

---

## 🧰 Development Tools

Our team uses the following tools to organize and manage development:

- **GitHub:** Central repository for application source code and collaboration.
- **Jira:** Tracking tasks, assigning responsibilities, and managing project progress.
- **Visual Studio Code:** Main development environment.
- **Thunder Client:** Testing backend API requests and responses.

---

## 👨‍💻 Project Team

Shelf Life is a collaborative software development project completed by a team of five students.

Each team member contributes to the planning, development, testing, and documentation of the application.

**Project Manager:** Coordinates project activities, monitors progress, and supports team collaboration.

**Team Members:** Contribute to frontend development, backend development, database implementation, security, and testing.

---

## 📈 Project Status

**Current Stage:** Initial Development / First Release

Shelf Life is under active development. The initial project structure and starter application have been established, and additional functionality will be implemented throughout the development process.

Our development priorities include:

- Building the frontend interface.
- Developing backend REST APIs.
- Implementing database connectivity.
- Creating user authentication and authorization.
- Developing book and member management functionality.
- Testing and integrating application components.

---

## 🎓 Academic Information

| Detail | Information |
|---|---|
| Project Name | Shelf Life – Library Management System |
| Course Code | COMP229 |
| Course Name | Web Application Development |
| Institution | Centennial College |
| Team Size | 5 Students |
| Project Type | Academic Group Project |

---

**Shelf Life – Making Library Management Simpler.** 📚
