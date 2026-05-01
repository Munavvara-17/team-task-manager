#  Team Task Manager

A full-stack web application to manage tasks, track progress, and collaborate within teams — inspired by tools like Trello and Asana.

---

##  Features

###  Authentication

* User Signup & Login
* Secure authentication using JWT

###  Project Management

* Create projects
* Assign users to projects
* Admin-based control system

###  Task Management

* Create tasks with title, description, priority
* Assign tasks to users
* Update task status:

  *  To Do
  *  In Progress
  *  Done
  * Delete tasks

###  Dashboard

* Total tasks count
* Tasks by status
* Clean and responsive UI

---

##  Tech Stack

| Layer    | Technology        |
| -------- | ----------------- |
| Frontend | React (Vite)      |
| Backend  | Node.js + Express |
| Database | SQLite            |
| Auth     | JWT               |
| Styling  | CSS               |

---

##  Project Structure

```
team-task-manager/
│
├── backend/
│   ├── config/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── src/
│   ├── pages/
│   └── App.jsx
│
└── README.md
```

---

##  Run Locally

###  Backend

```
cd backend
npm install
node server.js
```

Runs on:

```
http://localhost:5000
```

---

###  Frontend

```
cd frontend
npm install
npm run dev
```

Runs on:

```
http://localhost:5173
```

---

##  Environment Variables

Create `.env` in backend:

```
JWT_SECRET=your_secret_key
```

---

##  Deployment

* Backend deployed on Railway
* Frontend deployed on Vercel / Netlify

*(Add your live links here)*

---

##  Demo

*(Add your demo video link here)*

---

##  Screenshots

*(Add dashboard screenshot here)*

---

##  Author

**Munavvara Nayab**

---

##  Final Note

This project demonstrates full-stack development skills including:

* API development
* Database design
* Authentication
* Frontend integration

---

🔥 Built with dedication for placement preparation.
