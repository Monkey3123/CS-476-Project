import { check, validationResult } from "express-validator";
import Car from "../models/carModel.js";
import mongoose from "mongoose";
const validateCar = [
  check("make").notEmpty().withMessage("Make is required"),
  check("model").notEmpty().withMessage("Model is required"),
  check("year").isInt({ min: 1886 }).withMessage("Valid year is required"),
  check("odometer").isNumeric().withMessage("Odometer must be a number"),
  check("transmission").notEmpty().withMessage("Transmission is required"),
  check("fuelType").notEmpty().withMessage("Fuel type is required"),
  check("seatingCapacity")
    .isInt({ min: 1 })
    .withMessage("Seating capacity must be at least 1"),
  check("color").notEmpty().withMessage("Color is required"),
  check("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 50 })
    .withMessage("Description must be at least 50 characters long"),
  check("dailyRate").isNumeric().withMessage("Daily rate must be a number"),
  check("lat").isNumeric().withMessage("Latitude must be a number"),
  check("long").isNumeric().withMessage("Longitude must be a number"),
];

const listCar = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const carmodel = new Car({
      make: req.body.make,
      model: req.body.model,
      year: req.body.year,
      odometer: req.body.odometer,
      transmission: req.body.transmission,
      fuelType: req.body.fuelType,
      seatingCapacity: req.body.seatingCapacity,
      color: req.body.color,
      description: req.body.description,
      dailyRate: req.body.dailyRate,
      lat: req.body.lat,
      long: req.body.long,
      fromDate: req.body.fromDate,
      toDate: req.body.toDate,
      fromTime: req.body.fromTime,
      toTime: req.body.toTime,
      photo: req.body.photo,
      listerid: req.body.listerid,
    });

    await carmodel.save();
    res.status(200).send({ message: "Car listed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to list car" });
  }
};
const getallCar = async (req, res) => {
  try {
    const cars = await Car.find({});

    res.status(200).json(cars);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to fetch cars" });
  }
};

const getCar = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid" });
  }

  const car = await Car.findById(id);
  if (!car) {
    return res.status(404).json({ error: "Doesn't exist" });
  }

  res.status(200).json(car);
};

const getlisterCars = async (req, res) => {
  const { listerid } = req.params;

  if (!listerid) {
    return res.status(400).json({ message: "Lister ID is required" });
  }

  try {
    const cars = await Car.find({ listerid });

    if (!cars || cars.length === 0) {
      return res.status(404).json({ message: "No cars found for this lister" });
    }

    res.status(200).json(cars);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to fetch cars" });
  }
};
export { validateCar, listCar, getallCar, getCar, getlisterCars };
