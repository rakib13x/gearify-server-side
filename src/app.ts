import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
import NodeCache from "node-cache";
import { config } from "dotenv";
import morgan from "morgan";

//Importing routes
import userRoute from "./routes/user.js";
import productRoute from "./routes/products.js";
import orderRoute from "./routes/order.js";
import paymentRoute from "./routes/payment.js";

config({
  path: "./.env",
});

console.log(process.env.PORT);
console.log(process.env.MONGODB_URI);

const port = process.env.PORT || 3000;

const mongoURI = process.env.MONGODB_URI || "";

connectDB(mongoURI);
export const myCache = new NodeCache();
const app = express();
app.use(express.json());
app.use(morgan("dev"));

//using Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/order/payment", paymentRoute);

app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("API Working with /api/v1");
});

app.listen(port, () => {
  console.log(`Server is working on http:localhost:${port}`);
});
