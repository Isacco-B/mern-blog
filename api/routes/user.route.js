import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  test,
  updateUser,
  deleteUser,
  signout,
  getUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/test", test);
router.get("/getusers", verifyToken, getUser);
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.post("/signout", signout);

export default router;
