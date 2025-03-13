

const express = require("express")

const helmet = require("helmet");
const cors = require("cors")
const rateLimit = require("express-rate-limit");
const ConnectDB = require('./src/config/db')
const {errorHandler} = require('./src/middleware/errorHandler')
require("dotenv").config();

ConnectDB();

//Routes
const authRoutes = require('./src/routes/authRoutes')
const courseRoutes = require('./src/routes/courseRoutes')

const app = express()


app.use(express.json())
//enable cors
app.use(cors())

//using helmet for security Headers

app.use(helmet())


const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // Limit each IP to 100 requests per `window`
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

//Routers

app.use('/api/auth',authRoutes)
app.use('/api/courses',courseRoutes)

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is running' });
});

app.use(errorHandler)

module.exports = app;


