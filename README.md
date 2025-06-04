# StarterBlog

**StarterBlog** is a full-stack blogging application built with modern web technologies, designed for scalability, maintainability, and great user experience. This project demonstrates solid skills in frontend and backend development, API integration, and deployment readiness.

---

## 🚀 Project Overview

StarterBlog allows users to create, edit, and publish blog posts seamlessly. It features a clean UI, responsive design, and a well-structured backend API for managing posts and users. The project showcases best practices in code organization, environment management, and Git workflows.

---

## 🛠️ Technologies Used

- **Frontend:** React, Vite, CSS Modules  
- **Backend:** Node.js, Express.js  
- **Version Control:** Git, GitHub  
- **Environment Management:** `.env` files with proper `.gitignore` handling  
- **Deployment:** Configured for platforms like Vercel  
- **Linting & Formatting:** ESLint

---

## 📁 Project Structure

```text
StarterBlog/
├── client/             # React frontend application
│   ├── src/            # Application source code (components, pages, assets)
│   └── .env            # Environment variables (not committed to Git)
│
├── server/             # Express backend API (if applicable)
│   └── .env            # Server-side environment variables (ignored by Git)
│
├── .gitignore          # Specifies files/folders to exclude from Git tracking
├── README.md           # Project documentation and setup instructions
├── package.json        # Project metadata and root-level dependencies
├── vite.config.js      # Vite configuration for the frontend
└── vercel.json         # Deployment configuration (e.g., for Vercel)

---

## 🔧 Key Features

- User authentication
- CRUD blog post management  
- Responsive and accessible UI  
- Clear client-server separation  
- Secure environment variable handling  
- Optimized build with Vite  

---

## 📌 Getting Started

### Prerequisites

- Node.js and npm installed  
- Git installed  
- Recommended: Vercel account for deployment  


2.	Install dependencies for both client and server:

  cd client
  npm install
  
  cd ../server
  npm install

3.	Setup environment variables:
   
  Create .env files in both client and server folders with your API keys or DB connections.

4.	Run development servers:

   # In separate terminals
  cd client
  npm run dev
  
  cd ../server
  npm start
  
---
