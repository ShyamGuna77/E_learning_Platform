const mongoose = require("mongoose");
require("dotenv").config();

async function ConnectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ Connected to database");
  } catch (error) {
    console.error("❌ Failed to connect to the database", error);
    process.exit(1);
  }
}

module.exports = ConnectDB;


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
//   .eyJpZCI6IjY3ZDJkYmM1YWQ2ZGY2OTU1ODRmMDc4YiIsImlhdCI6MTc0MTg3MjExOCwiZXhwIjoxNzQyNDc2OTE4fQ
//   .SHbeZVjCdzt203T0kyMlrkjVw5xAzyL_kRSiTPro8gQ;