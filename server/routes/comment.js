import express from "express";
import {
  createComments,
  getComments,
  deleteComment,
  editComment,
  likeDislikeComment,
} from "../controllers/comment.js";

const router = express.Router();

router.post("/create", createComments);
router.get("/get/:postId", getComments);
router.put("/delete/:id", deleteComment);
router.put("/edit/:id", editComment);
router.put("/:id", likeDislikeComment);

export default router;
