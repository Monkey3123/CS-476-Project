import express from "express";
import listCar from "../controllers/carController.js";
import {
  getallCar,
  getCar,
  getlisterCars,
} from "../controllers/carController.js";
import requiretoke from "../middleware/requiretoke.js";

const router = express.Router();

// router.use(requiretoke);
router.post("/list", listCar);

router.get("/getCar", getallCar);

router.post("/getlisterCars", getlisterCars);

router.get("/:id", getCar);

export default router;
