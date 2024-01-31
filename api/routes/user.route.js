import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { test, updateUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/test", test);
router.put("/update/:userId", verifyToken, updateUser);

export default router;
