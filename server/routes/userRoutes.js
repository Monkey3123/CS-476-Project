import express from "express";
import loginUser from "../controllers/userController.js";

import { signupUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/login", loginUser);

router.post("/signup", signupUser);

export default router;
