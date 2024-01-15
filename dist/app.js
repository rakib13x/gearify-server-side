import express from "express";
import dotenv from "dotenv";
dotenv.config();
//Importing routes
import userRoute from "./routes/user.js";
import { connectDB } from "./utils/features.js";
import { errorMiddleware } from "./middlewares/error.js";
const port = 3000;
connectDB();
const app = express();
app.use(express.json());
//using Routes
app.use("/api/v1/user", userRoute);
app.use(errorMiddleware);
app.get("/", (req, res) => {
    res.send("API Working with /api/v1");
});
app.listen(port, () => {
    console.log(`Server is working on http:localhost:${port}`);
});
