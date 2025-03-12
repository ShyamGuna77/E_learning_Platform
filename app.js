

const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors")
require("dotenv").config();

const app = express()

app.use(cors())
app.use(express.json())


async function ConnectDB () {

    try {
         await mongoose.connect(process.env.MONGO_URL)
         console.log("Connected to database");
         const port = process.env.PORT || 5000;  
         app.listen(port,() => {
            console.log("Port listening on server 3000");
         })
        
    } catch (error) {
         console.error(
           "Failed to connect to the database or start the server",
           error
         );
        
    }
 
}
ConnectDB()