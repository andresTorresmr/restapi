import { Router } from "express";
import {
  getUsers,
  getUser,
  insertUser,
  updateUser,
} from "../controllers/users.controller.js";

const router = Router();

router.get("/users/", getUsers);

router.get("/users/:id", getUser);

router.post("/users/insert/", insertUser);

router.patch("/users/update/:id", updateUser);

export default router;
