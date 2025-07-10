const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const eventRoutes = require("./routes/eventRoutes");

const userProfileRoutes = require("./routes/userProfileRoutes");

const userRoutes = require("./routes/userRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const contactRoutes = require("./routes/contactRoutes");

const errorHadler = require("./middleware/errorHandler");
const bodyParser = require("body-parser");
const multer = require("multer");

const upload = multer();

//enviromental variable form .env
require("dotenv").config();

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://skyy-event-ms.vercel.app"
];

// Temporary CORS debug middleware - REMOVE BEFORE PRODUCTION
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  if (req.method === "OPTIONS") {
    console.log('CORS DEBUG: Preflight request allowed for all origins');
    return res.sendStatus(200);
  }
  next();
});

// CORS configuration
const corsOptions = {
  origin: function(origin, callback){
    console.log('CORS request from origin:', origin); // Log the origin
    if(!origin) {
      console.log('CORS: No origin, allowing request');
      return callback(null, true);
    }
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not allow access from the specified Origin: ' + origin;
      console.error('CORS: Blocked origin:', origin, '| Error:', msg);
      return callback(new Error(msg), false);
    }
    console.log('CORS: Allowed origin:', origin);
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  optionsSuccessStatus: 200
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

app.use(express.json()); // To parse JSON bodies
app.use(bodyParser.json());
// Connect to MongoDB
connectDB();

// Routes
app.use("/api/event", eventRoutes);

app.use("/api", userProfileRoutes);

app.use("/api/user", userRoutes);

app.use("/api/review", reviewRoutes);

app.use("/api/contact/", contactRoutes);

// Error handling
app.use(errorHadler);

// Start server
const PORT = process.env.PORT || 3001;
const HOST = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
