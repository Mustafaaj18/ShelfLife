# Shelf Life – Library Management System

## About the Project

Shelf Life is a Library Management System developed as part of **COMP229 – Web Application Development** at Centennial College.

The purpose of this project is to simplify library operations by providing a system for managing books, library members, and borrowing activities. Users will be able to search for books, check availability, and manage borrowing and returning processes.

## Project Features

The planned features include:

- User registration and login
- User authentication and authorization
- Dashboard with library statistics
- Add, view, update, and delete books
- Search books by title, author, ISBN, or category
- Manage library members
- Track borrowed and returned books

## Technologies Used

**Frontend:**
- React.js
- JavaScript
- HTML5
- CSS3
- Vite

**Backend:**
- Node.js
- Express.js
- MongoDB
- Mongoose

**Development Tools:**
- Visual Studio Code
- GitHub
- Jira
- Thunder Client

## Project Structure

```text
Shelf-Life/
│
├── frontend/
│   └── src/
│
├── backend/
│   └── src/
│       ├── config/
│       ├── controllers/
│       ├── middleware/
│       ├── models/
│       └── routes/
│
├── documentation/
│
├── README.md
└── .gitignore
```

## How to Run the Project

### 1. Download the Project

Download the ZIP file from this GitHub repository and extract it.

### 2. Open in Visual Studio Code

Open Visual Studio Code, select **File → Open Folder**, and choose the extracted Shelf-Life folder.

### 3. Start the Frontend

Open a terminal in VS Code:

```bash
cd frontend
npm install
npm run dev
```

### 4. Start the Backend

Open a second terminal:

```bash
cd backend
npm install
npm run dev
```

### 5. Open the Application

Open the local frontend address shown in your terminal, usually:

http://localhost:5173

Backend health check:

http://localhost:5000/api/health

## Team Project

This project is being developed collaboratively by a team of five students. Each team member contributes to the development, testing, and documentation of the application.

**Course:** COMP229 – Web Application Development  
**Institution:** Centennial College  
**Project Name:** Shelf Life – Library Management System
