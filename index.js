const express = require("express"); // Import express module
const morgan = require("morgan"); // Import morgan module for logging
const mongoose = require("mongoose"); // Import mongoose module for MongoDB

const app = express(); // Create an express application
const port = 3000; // Define the port number

app.use(morgan("dev")); // Use morgan middleware for logging in dev mode
app.use(express.json()); // Use express middleware to parse JSON

// Function to connect to MongoDB
const connectDb = async () => {
  await mongoose.connect("mongodb://localhost:27017/ch15"); // Connect to MongoDB
  console.log("Connected to database"); // Log successful connection
};
connectDb(); // Call the function to connect to the database

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

// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("Hello World"); // Send a response to the client
});

// Define a route to save a car
app.post("/save-car", async (req, res) => {
  const { make, model, year } = req.body; // Destructure the request body
  try {
    const saveCar = new Car({ make, model, year }); // Create a new Car instance
    await saveCar.save(); // Save the car to the database
    return res
      .status(201)
      .json({
        success: true,
        message: "Car saved successfully",
        data: saveCar,
      }); // Send success response
  } catch (err) {
    console.log(err); // Log the error
    return res.status(500).json({ success: false, message: err.message }); // Send error response
  }
});

app.get("/get-car", async (req, res) => {
  try {
    const cars = await Car.find();
    return res.json({
      success: true,
      message: "Cars fetched successfully",
      data: cars,
      count: cars.length,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ success: false, message: err.message });
  }
});

app.put("/update/:id", async (req, res) => {
  const { make, model, year } = req.body;
  try {
    const updatedCar = await Car.findByIdAndUpdate(
      { _id: req.params.id},
      { make, model, year },
      { isNew: true }
    );
    return res.status(200).json({message: "CAR updated successfully", data: updatedCar});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/findCar', async (req, res) => {
  try {
    const car = await Car.findOne({model: req.query.model});
    return res.status(200).json({message: "Car found", data: car});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: err.message });
  }
})

// Delete a car
app.delete("/delete/:id", async (req, res) => {
  try {   
    await Car.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: err.message });
  }
});

// Start the server and listen on the defined port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`); // Log that the server is running
});
