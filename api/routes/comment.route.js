import express from "express";
import {
  createComment,
  getPostComments,
  likeComment,
  editComment,
  deleteComment,
  getComments,
} from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createComment);
router.put("/likeComment/:commentId", verifyToken, likeComment);
router.put("/editComment/:commentId", verifyToken, editComment);
router.get("/getPostComments/:postId", getPostComments);
router.get("/getComments", verifyToken, getComments);
router.delete("/deleteComment/:commentId", verifyToken, deleteComment);

export default router;
