

const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const ConnectDB = require('./src/config/db')
require("dotenv").config();

ConnectDB();

//Routes
const authRoutes = require('./src/routes/authRoutes')

const app = express()

app.use(cors())
app.use(express.json())
app.use(cors())






