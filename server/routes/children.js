import express from "express";
import { createChildren, getChildren, deleteChild, editChild, likeDislikeChild } from "../controllers/children.js";

const router = express.Router();

router.post("/create", createChildren);
router.get("/get/:parentId", getChildren);
router.put("/delete/:id", deleteChild);
router.put("/edit/:id", editChild);
router.put("/:id", likeDislikeChild);

export default router;