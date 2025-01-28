const Car = require("../models/car.model");


// Define a route to save a car
exports.save_car = async (req, res) => {
  const { make, model, year } = req.body; // Destructure the request body
  try {
    const saveCar = new Car({ make, model, year }); // Create a new Car instance
    await saveCar.save(); // Save the car to the database
    return res.status(201).json({
      success: true,
      message: "Car saved successfully",
      data: saveCar,
    }); // Send success response
  } catch (err) {
    console.log(err); // Log the error
    return res.status(500).json({ success: false, message: err.message }); // Send error response
  }
};

exports.get_car = async (req, res) => {
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
};

exports.update_car = async (req, res) => {
  const { make, model, year } = req.body;
  try {
    const updatedCar = await Car.findByIdAndUpdate(
      { _id: req.params.id },
      { make, model, year },
      { isNew: true }
    );
    return res
      .status(200)
      .json({ message: "CAR updated successfully", data: updatedCar });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.find_car = async (req, res) => {
  try {
    const car = await Car.findOne({ model: req.query.model });
    return res.status(200).json({ message: "Car found", data: car });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// Delete a car
exports.delete_car = async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Car deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: err.message });
  }
};
