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
  "http://127.0.0.1:3000"
];

// Middleware
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.options('*', cors({
  origin: allowedOrigins,
  credentials: true
}));

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
// trigger redeploy
