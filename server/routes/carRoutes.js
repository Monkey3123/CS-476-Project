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

router.get("/:id", getCar);

router.get("/getlisterCars?listerid=:id", getlisterCars);

export default router;
