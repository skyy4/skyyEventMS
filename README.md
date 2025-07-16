# Eventify

Effortless Event Management for Universities

Eventify is your go-to tool for planning and managing university events. From campus activities to student gatherings, our app makes it easy to organize, track, and execute events smoothly. With Eventify, you can handle everything in one place and ensure your events are a success.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Developer](#developer)
- [License](#license)

---

## Features
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

## Tech Stack
- **Frontend:** React, Material-UI, Framer Motion, Axios, React Router, Vite
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, Multer
- **Other:** EmailJS, Bootstrap, Notistack

---

## Project Structure
```
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

## Getting Started

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

## API Endpoints (Sample)

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

## Screenshots

| Home Page | Event Details | Admin Dashboard |
|---|---|---|
| ![Home Page](./screenshots/homepage.png) | ![Event Details](./screenshots/event-details.png) | ![Admin Dashboard](./screenshots/admin-dashboard.png) |

> _Below are some key screens of Eventify. Replace the image paths with your actual screenshots for best results._

## Developer
**Shashi Kumar Yadav**  
Lucknow/Mumbai
Email: sky593499@gmail.com  

> Passionate about building beautiful web experiences. Loves React, Node.js, and all things tech. Always learning, always curious.

---

## License
This project is licensed under the MIT License.