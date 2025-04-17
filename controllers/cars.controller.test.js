const { getCars, getCarById, createCar, updateCar, deleteCar } = require("./cars.controller");
const Car = require("../models/car.model");

jest.mock("../models/car.model", () => ({
  find: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn()
}));

describe("Car Controller", () => {
  let res;

  beforeEach(() => {
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.clearAllMocks();
  });

  describe("getCars", () => {
    it("should return a list of cars with count", async () => {
      const req = {};
      const mockCars = [{ name: "Car1" }, { name: "Car2" }];
      Car.find.mockResolvedValue(mockCars);
      
      await getCars(req, res);
      
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: mockCars,
        length: mockCars.length
      });
    });

    it("should handle errors", async () => {
      const req = {};
      Car.find.mockRejectedValue(new Error("Database error"));
      
      await getCars(req, res);
      
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Server Error" });
    });
  });

  describe("getCarById", () => {
    it("should return a car by id", async () => {
      const req = { params: { id: "1" } };
      Car.findById.mockResolvedValue({ name: "Car1" });
      
      await getCarById(req, res);
      
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ name: "Car1" });
    });

    it("should return 404 if car not found", async () => {
      const req = { params: { id: "1" } };
      Car.findById.mockResolvedValue(null);
      
      await getCarById(req, res);
      
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Car not found" });
    });
  });

  describe("createCar", () => {
    it("should create a new car", async () => {
      const req = {
        body: {
          name: "Car1",
          model: "Corolla",
          year: 2020,
          price: 20000
        }
      };
      const mockCar = { ...req.body };
      Car.create.mockResolvedValue(mockCar);
      
      await createCar(req, res);
      
      expect(Car.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: "Car Created Successfully" });
    });

    it("should return 400 if required fields are missing", async () => {
      const req = {
        body: {
          name: "Car1"
        }
      };
      
      await createCar(req, res);
      
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Please Fill All Required Fields" });
    });
  });

  describe("updateCar", () => {
    it("should update a car by id", async () => {
      const req = {
        params: { id: "1" },
        body: { name: "Updated Car", model: "Camry", year: 2021, price: 25000 }
      };
      Car.findByIdAndUpdate.mockResolvedValue({ ...req.body });
      
      await updateCar(req, res);
      
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Car Updated Successfully" });
    });

    it("should return 404 if car not found", async () => {
      const req = {
        params: { id: "1" },
        body: { name: "Updated Car" }
      };
      Car.findByIdAndUpdate.mockResolvedValue(null);
      
      await updateCar(req, res);
      
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Car not found" });
    });
  });

  describe("deleteCar", () => {
    it("should delete a car by id", async () => {
      const req = { params: { id: "1" } };
      Car.findByIdAndDelete.mockResolvedValue({ name: "Deleted Car" });
      
      await deleteCar(req, res);
      
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "Car Deleted Successfully" });
    });

    it("should return 404 if car not found", async () => {
      const req = { params: { id: "1" } };
      Car.findByIdAndDelete.mockResolvedValue(null);
      
      await deleteCar(req, res);
      
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "Car not found" });
    });
  });
});
