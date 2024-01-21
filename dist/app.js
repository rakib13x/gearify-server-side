import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
//Importing routes
import userRoute from "./routes/user.js";
import productRoute from "./routes/products.js";
import NodeCache from "node-cache";
const port = 3000;
connectDB();
export const myCache = new NodeCache();
const app = express();
app.use(express.json());
//using Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);
app.get("/", (req, res) => {
    res.send("API Working with /api/v1");
});
app.listen(port, () => {
    console.log(`Server is working on http:localhost:${port}`);
});
