# AI Code Review Tool

An AI-powered code assistant built with the MERN stack. Chat with AI to review, fix, and explain your code — just like ChatGPT but specifically for developers.

## 🚀 Live Demo
[Coming Soon]

## ✨ Features

- **AI Chat Interface** — ChatGPT-like interface to chat about your code
- **Code Review** — Paste any code and get instant AI feedback
- **Bug Detection** — AI finds bugs and suggests fixes
- **Code Explanation** — Understand any code line by line
- **Chat History** — All conversations saved and accessible from sidebar
- **User Authentication** — Secure JWT-based login/signup

## 🛠️ Tech Stack

**Frontend:**
- React.js (Vite)
- Tailwind CSS
- React Router DOM
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Groq AI API (LLaMA 3.3)

## 📁 Project Structure

ai-code-review/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Landing.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── Dashboard.jsx
│   │   └── services/
│   │       └── api.js
└── backend/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── chatController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Chat.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── chatRoutes.js
│   └── server.js

## ⚙️ Installation & Setup

### Prerequisites
- Node.js v18+
- MongoDB
- Groq API Key (free at console.groq.com)

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in backend folder:
PORT=5000
MONGO_URI=mongodb://localhost:27017/ai-code-review
JWT_SECRET=your_secret_key
GROQ_API_KEY=your_groq_api_key

Start backend:
```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Open App
http://localhost:5173


## 🔑 Environment Variables

| Variable | Description |
|----------|-------------|
| PORT | Backend server port |
| MONGO_URI | MongoDB connection string |
| JWT_SECRET | Secret key for JWT tokens |
| GROQ_API_KEY | Groq AI API key |

## 📸 Screenshots

### Landing Page
![Landing Page](screenshots/landing.png)

### Dashboard — AI Chat
![Dashboard](screenshots/dashboard.png)

## 🚀 Deployment

- **Frontend** — Vercel
- **Backend** — Render
- **Database** — MongoDB Atlas

## 👨‍💻 Author

**Arun Kumar**
- GitHub: [@arunk-web](https://github.com/arunk-web)

## 📄 License

MIT License