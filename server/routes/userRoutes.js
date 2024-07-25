import express from "express";
import loginUser, { getUserById } from "../controllers/userController.js";

import { signupUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/login", loginUser);

router.post("/signup", signupUser);

router.get("/:id", getUserById); // New route to fetch user by ID

//all info in local storage

export default router;
