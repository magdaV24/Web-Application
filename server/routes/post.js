import express from "express";
import { getPosts, getPost, editPost, likeDislikePost, deletePost } from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.delete('/:id', deletePost)
router.put('/edit/:id', editPost)
router.put('/:id', likeDislikePost)

export default router;
