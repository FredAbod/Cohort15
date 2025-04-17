const request = require("supertest");
const express = require("express");
const morgan = require("morgan");
const router = require("./routes/cars.routes");

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use('/api/v1', router);

app.get("/", (req, res) => {
  res.send("Hello World");
});

describe("GET /", () => {
  it("should return Hello World", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
    expect(res.text).toBe("Hello World");
  });
});

describe("API routes", () => {
  // Add tests for your API routes here
  // Example:
  // it("should return a list of cars", async () => {
  //   const res = await request(app).get("/api/v1/cars");
  //   expect(res.statusCode).toEqual(200);
  //   expect(res.body).toHaveProperty("cars");
  // });
});
