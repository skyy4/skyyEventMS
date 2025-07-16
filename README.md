# Eventify

<p align="center">
  <a href="https://skyy-event-ms.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/Live%20Demo-Visit-green?style=for-the-badge&logo=vercel" alt="Live Demo"/>
  </a>
</p>

<p align="center">
  <b>Effortless Event Management for Universities</b><br/>
  <i>Plan, manage, and celebrate campus events with style.</i>
</p>

---

## 🚀 Features

- User authentication (signup, login, JWT-based sessions)
- Create, edit, and delete events (with image upload)
- Browse and search events by category
- Register for events and manage your registrations
- Add events to favorites
- Leave reviews and ratings for events
- Admin dashboard for event and user management
- Contact form for feedback and support
- Responsive, modern UI with animations

---

## 🛠️ Tech Stack

- **Frontend:** React, Material-UI, Framer Motion, Axios, React Router, Vite
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, Multer
- **Other:** EmailJS, Bootstrap, Notistack

---

## 📁 Project Structure

```text
Eventer-main/
  backend/           # Node.js/Express API
    config/          # DB config
    controllers/     # Route controllers
    middleware/      # Auth, error, upload
    models/          # Mongoose schemas
    routes/          # API endpoints
    index.js         # App entrypoint
  frontend/          # React app
    public/          # Static assets
    src/
      components/    # React components
      asset/         # Images, icons
      context/       # Auth context
      hooks/         # Custom hooks
      style/         # Theme and CSS
      App.jsx        # Main app
      main.jsx       # Entrypoint
```

---

## 🧑‍💻 Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn
- MongoDB instance (local or Atlas)

### Backend Setup
1. `cd backend`
2. `npm install`
3. Create a `.env` file with:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. `npm start` (runs on port 3001 by default)

### Frontend Setup
1. `cd frontend`
2. `npm install`
3. `npm run dev` (runs on port 3000 by default)

---

## 📡 API Endpoints (Sample)

### Event Routes
- `GET    /api/event/getEvent`         - List all events
- `GET    /api/event/getEvent/:id`     - Get event by ID
- `POST   /api/event/createEvent`      - Create event (auth, image upload)
- `PUT    /api/event/edit/:id`         - Edit event (auth)
- `DELETE /api/event/delete/:id`       - Delete event (auth)

### User Routes
- `POST   /api/user/signup`            - Register new user
- `POST   /api/user/login`             - Login
- `GET    /api/user/`                  - List all users (auth)
- `PUT    /api/user/edit/:id`          - Edit user (auth)
- `DELETE /api/user/delete/:id`        - Delete user (auth)

### Review Routes
- `GET    /api/review/getReview/:event_id` - Get reviews for event (auth)
- `POST   /api/review/addReview`           - Add review (auth)
- `PUT    /api/review/edit`                - Edit review (auth)
- `DELETE /api/review/deleteReview/:id`    - Delete review (auth)

### Contact Routes
- `POST   /api/contact/addContact`         - Submit contact/feedback

---

## 📸 Screenshots

| Home Page | Event Details | Admin Dashboard |
|---|---|---|
| ![Home Page](./frontend/public/Screenshot%202025-07-16%20at%209.45.06 AM.png) | ![Event Details](./frontend/public/Screenshot%202025-07-16%20at%209.45.17 AM.png) | ![Admin Dashboard](./frontend/public/Screenshot%202025-07-16%20at%209.45.54 AM.png) |

> _Below are some key screens of Eventify. Replace the image paths with your actual screenshots for best results._

---

## 👤 Developer
**Shashi Kumar Yadav**  
Lucknow/Mumbai  
Email: sky593499@gmail.com  

> Passionate about building beautiful web experiences. Loves React, Node.js, and all things tech. Always learning, always curious.

---

## 📝 License
This project is licensed under the MIT License.