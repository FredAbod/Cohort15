const express = require("express"); // Import express module
const morgan = require("morgan"); // Import morgan module for logging
const connectDb = require("./config/db");
const router = require("./routes/cars.routes");

const app = express(); // Create an express application
const port = 3000; // Define the port number

app.use(morgan("dev")); // Use morgan middleware for logging in dev mode
app.use(express.json()); // Use express middleware to parse JSON

// Define a route for the root URL
app.get("/", (req, res) => {
  res.send("Hello World"); // Send a response to the client
});

app.use('/api/v1', router);

// Start the server and listen on the defined port
app.listen(port, () => {
  connectDb(); // Ensure the database connection function is called
  console.log(`Server is running on port ${port}`); // Log that the server is running
});
