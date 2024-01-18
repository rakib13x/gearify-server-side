import { adminOnly } from "./../middlewares/auth.js";
import express from "express";
import { deleteUser, getAllUsers, getUser, newUser, } from "../controllers/user.js";
const app = express.Router();
// route - /api/v1/user/new
app.post("/new", newUser);
// route - /api/v1/user/all
app.get("/all", adminOnly, getAllUsers);
// route - /api/v1/user/:id
// app.get("/:id", getUser);
// // route - /api/v1/user/:id
// app.get("/:id", deleteUser);
app.route("/:id").get(getUser).delete(adminOnly, deleteUser);
export default app;
