

const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
const ConnectDB = require('./src/config/db')
require("dotenv").config();

ConnectDB();

const app = express()

app.use(cors())
app.use(express.json())



