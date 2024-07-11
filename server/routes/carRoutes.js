import express from "express";
import listCar from "../controllers/carController.js";
import { getallCar } from "../controllers/carController.js";
import { getCar } from "../controllers/carController.js";
import requiretoke from "../middleware/requiretoke.js";

const router = express.Router();

router.use(requiretoke);
router.post("/list", listCar);

router.get("/getCar", getallCar);

router.get("/:id", getCar);

//all info in local storage

export default router;
