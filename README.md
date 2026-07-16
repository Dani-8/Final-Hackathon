<div align="center">
  <h1>🚀 MaintainIQ (Final Hackathon Project)</h1>

  <p><i>“Code so good, it survived a Wi-Fi apocalypse.” 🧟‍♂️📶</i></p>
  
  [![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
  [![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  <br />
  [![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
  [![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
  [![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
</div>

<br />

Welcome to my final hackathon project! I battled through the darkest depths of internet connectivity issues (seriously, the Wi-Fi was held together by duct tape and dreams) to bring you this beautiful, full-stack application.

## 🌟 Live Demo
[✨ **Click here to see the magic!** ✨](https://maintain-iq-final-hackathon.vercel.app/) *(Live now!)*

---

## 🍰 What's inside this delicious tech cake?

This project is a labor of love split into frontend and backend. It uses modern tools to ensure it runs smoothly and is easy to extend.

### 🎨 Frontend
- **React 19 & Vite**: Because waiting for builds is so last decade.
- **TailwindCSS 4**: For making things look spicy and very easy on the eyes.
- **Recharts**: Beautiful, interactive charts to visualize our data.
- **Motion (Framer Motion)**: Sprinkling in those sweet, buttery smooth animations.
- **Lucide Icons**: Because every good UI needs pretty icons.

### ⚙️ Backend
- **Node.js & Express**: Doing all the heavy lifting so the frontend can look pretty!
- **MongoDB & Mongoose**: Storing our data safely in the cloud (or on your local machine).
- **Google Gemini AI Integration**: Infused with smart AI capabilities.
- **Cloudinary & Multer**: For flawless media and image uploads.
- **JWT & Bcryptjs**: Keeping user data locked down and secure.

---

## 🛠️ Getting Started

Prefer to try the live demo above? Great — otherwise, follow the instructions below to run the app locally on your machine.

### Prerequisites
Make sure you have these installed:
- [Node.js](https://nodejs.org/en/) (v18 or higher)
- [Docker](https://www.docker.com/) (Optional, but highly recommended)

### 🔑 Environment Variables
Before running the app, you need to set up your `.env` files. 

**Backend (`backend/.env`):**
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/maintainiq
JWT_SECRET=maintainiq-secret-key-12345!
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
CLOUDINARY_CLOUD_NAME=YOUR_CLOUDINARY_NAME
CLOUDINARY_API_KEY=YOUR_CLOUDINARY_KEY
CLOUDINARY_API_SECRET=YOUR_CLOUDINARY_SECRET
APP_URL=http://localhost:3000

# OR

# Make sure APP_URL is your LIVE Frontend URL in production!
# APP_URL=https://maintain-iq-final-hackathon.vercel.app
```
*(Check `backend/.env.example` for the full list of required variables!)*

---

## 🚀 Running the App

### 🐳 The Docker Way (Super Easy Mode)
1. Ensure Docker is running on your machine.
2. Open your terminal in the root folder.
3. Run this magical command:
   ```bash
   docker compose up --build
   ```
4. Sip your coffee ☕. The frontend will be available at `http://localhost`, and the backend at `http://localhost:3000`.

### 💻 The Manual Way (For the brave)

**1. Start the Backend:**
```bash
cd backend
npm install
npm run dev
```

**2. Start the Frontend:**
Open a new terminal window:
```bash
cd frontend
npm install
npm run dev
```

---

## 📂 Project Structure

```text
📦 Final Hackathon Project
 ┣ 📂 backend
 ┃ ┣ 📂 app          # Express routes, controllers, and models
 ┃ ┣ 📂 src          # Server entry point
 ┃ ┣ 📜 Dockerfile   # Backend container instructions
 ┃ ┗ 📜 package.json
 ┣ 📂 frontend
 ┃ ┣ 📂 public       # Static assets
 ┃ ┣ 📂 src          # React components and pages
 ┃ ┣ 📜 Dockerfile   # Frontend container instructions
 ┃ ┗ 📜 package.json
 ┣ 📜 docker-compose.yml
 ┣ 📜 .github/workflows/ci.yml
 ┗ 📜 README.md
```

---

## 💖 A Little Backstory

*Real talk:* I experienced some legendary internet dropouts during the hackathon (literally couldn't even install packages without shedding a tear 😢). While this project didn't finish on time, I was basically just sitting at the hackathon with my laptop, staring at the Wi-Fi speed on my Task Manager like 😅😭. 

But guess what? A few days post-hackathon, I locked in and finally finished this bad boy. 🚀

HUGE shoutout to **SMIT** for giving us this institute and creating so many W opportunities for us to level up our careers! 🙌 And a massive THANK YOU to my mentor and course instructor for all the guidance and carrying us through—y'all are the real MVPs. (Go stalk his GitHub here: [@AdilAhmedShekhani](https://github.com/AdilAhmedShekhani) 👀).

Thanks for your time! If you like what you see, feel free to drop a ⭐ on the repo to make my day!