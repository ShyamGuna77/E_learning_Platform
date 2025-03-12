
const mongoose = require('mongoose')
const express = require('express')
require("dotenv").config();


const app = express()

async function ConnectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to database");
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log("Port listening on server 3000");
    });
  } catch (error) {
    console.error(
      "Failed to connect to the database or start the server",
      error
    );
  }
}

module.exports =ConnectDB