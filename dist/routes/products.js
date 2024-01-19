import express from "express";
import { deleteProduct, getAdminProducts, getAllCategories, getLatestProducts, getSingleProduct, newProduct, updateProduct, } from "../controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";
const app = express.Router();
//Create New Product - /api/v1/product/new
app.post("/new", singleUpload, newProduct);
//Create New Product - /api/v1/product/latest
app.get("/latest", getLatestProducts);
//Create New Product - /api/v1/product/categories
app.get("/categories", getAllCategories);
//Create New Product - /api/v1/product/admin-products
app.get("/admin-products", getAdminProducts);
app
    .route("/:id")
    .get(getSingleProduct)
    .put(singleUpload, updateProduct)
    .delete(deleteProduct);
export default app;
