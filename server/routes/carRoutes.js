import express from "express";
import {
  validateCar,
  listCar,
  getallCar,
  getCar,
  getlisterCars,
  booked,
  getBookedCars,
  Unbooked,
} from "../controllers/carController.js";
import requiretoke from "../middleware/requiretoke.js";

const router = express.Router();

// router.use(requiretoke);
router.post("/list", validateCar, listCar);

router.get("/getCar", getallCar);

router.post("/getlisterCars", getlisterCars);
router.post("/getBookedCars", getBookedCars);

router.put("/booked", booked);
router.put("/Unbooked", Unbooked);

router.get("/:id", getCar);

export default router;
