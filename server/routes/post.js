import express from "express";
import { getPosts, getPost, editPost } from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
// router.delete('/', deletePost)
router.put('/:id', editPost)

export default router;
