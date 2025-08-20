import express from "express";
import { createUser, getUsers, getUserById, deleteUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/create", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.delete("/:id", deleteUser);

export default router;
