import {
  allOrders,
  getSingleOrder,
  myOrders,
  newOrder,
} from "../controllers/order.js";
import { adminOnly } from "./../middlewares/auth.js";
import express from "express";

const app = express.Router();

//route --/api/v1/order/new
app.post("/new", newOrder);
//route --/api/v1/order/my
app.get("/my", myOrders);
//route --/api/v1/order/all
app.get("/all", adminOnly, allOrders);

app.route("/:id").get(getSingleOrder);
export default app;
