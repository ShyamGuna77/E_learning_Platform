console.log("🔥 Server is starting...");

const app = require("./app");

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`❌ Error: ${err.message}`);
  server.close(() => process.exit(1));
});
