import express from "express";
import { createComments, getComments } from "../controllers/comment.js";

const router = express.Router();

router.post("/create", createComments)
router.get('/get/:postId', getComments)

export default router;