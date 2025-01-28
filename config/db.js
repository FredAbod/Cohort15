const mongoose = require("mongoose"); // Import mongoose module for MongoDB

// Function to connect to MongoDB
const connectDb = async () => {
  await mongoose.connect("mongodb://localhost:27017/ch15"); // Connect to MongoDB
  console.log("Connected to database"); // Log successful connection
};
module.exports = connectDb(); // Call the function to connect to the database
