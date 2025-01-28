const mongoose = require("mongoose"); // Import mongoose module for MongoDB

// Define a schema for the Car model
const carSchema = new mongoose.Schema(
    {
      make: String,
      model: { type: String, unique: true },
      year: { type: Number, unique: true },
    },
    {
      versionKey: false, // Disable the __v field
      timestamps: true, // Add createdAt and updatedAt fields
    }
  );
  
  // Create a model for Car using the schema
  const Car = mongoose.model("Car", carSchema);
  module.exports = Car; // Export the Car model
