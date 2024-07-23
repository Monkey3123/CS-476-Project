import Car from "../models/carModel.js";
import mongoose from "mongoose";
const listCar = async (req, res) => {
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
      booked: false,
    });

    carmodel.save();
    res.status(200).send({ message: "Car listed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to list car" });
  }
};

const getallCar = async (req, res) => {
  try {
    const cars = await Car.find({ booked: false });

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
  const lid = req.body.listerid;

  if (!lid) {
    return res.status(400).json({ message: "Lister ID is required" });
  }

  try {
    const cars = await Car.find({ listerid: lid });

    if (!cars || cars.length === 0) {
      return res.status(404).json({ message: "No cars found for this lister" });
    }

    res.status(200).json(cars);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to fetch cars" });
  }
};

const booked = async (req, res) => {
  const cid = req.body.cid;
  if (!cid) {
    return res.status(400).json({ message: "Error: Car ID not found" });
  }
  try {
    const cars = await Car.findById(cid);

    if (!cars) {
      return res.status(404).json({ message: "Car not found" });
    }
    cars.booked = true;
    const result = await Car.replaceOne({ _id: cid }, cars);

    res.status(200).json({ message: "Car sucessfully Booked" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Failed to fetch cars" });
  }
};

export default listCar;
export { getallCar };
export { getCar };
export { getlisterCars };
export { booked };
