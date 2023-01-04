import express from "express";
import { createChildren, getChildren } from "../controllers/children.js";

const router = express.Router();

router.post("/create", createChildren);
router.get("/get/:parentId", getChildren);

export default router;
