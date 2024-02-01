import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  create,
  getposts,
  deleteposts,
  updateposts,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getposts", getposts);
router.delete("/deletepost/:postId/:userId",verifyToken, deleteposts);
router.put("/updatepost/:postId/:userId", verifyToken, updateposts);

export default router
