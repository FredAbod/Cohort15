const Car = require("../models/car.model");

// Get all cars
exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    return res.status(200).json({ data: cars, length: cars.length });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// Get car by ID
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }
    return res.status(200).json(car);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Create a new car
exports.createCar = async (req, res) => {
  const { name, model, year, price } = req.body;
  try {
    if (!name || !model || !year || !price) {
      return res.status(400).json({ message: "Please Fill All Required Fields" });
    }
    
    const newCar = await Car.create({ name, model, year, price });
    return res.status(201).json({ message: "Car Created Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Server Error" });
  }
};

// Update car details
exports.updateCar = async (req, res) => {
  const { name, model, year, price } = req.body;
  try {
    const id = req.params.id;
    const updatedCar = await Car.findByIdAndUpdate(
      { _id: id },
      { name, model, year, price },
      { new: true }
    );

    if (!updatedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    return res.status(200).json({ message: "Car Updated Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Delete a car
exports.deleteCar = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedCar = await Car.findByIdAndDelete(id);

    if (!deletedCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    return res.status(200).json({ message: "Car Deleted Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
