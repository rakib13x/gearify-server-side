import express from "express";
import {
  SearchProducts,
  deleteProduct,
  getAdminProducts,
  getAllCategories,
  getLatestProducts,
  getSingleProduct,
  newProduct,
  updateProduct,
} from "../controllers/product.js";
import { singleUpload } from "../middlewares/multer.js";
import { adminOnly } from "../middlewares/auth.js";

const app = express.Router();
//Create New Product - /api/v1/product/new
app.post("/new", adminOnly, singleUpload, newProduct);
// To Search Products with filters
app.get("/search", SearchProducts);
//Create New Product - /api/v1/product/latest
app.get("/latest", getLatestProducts);
//Create New Product - /api/v1/product/categories
app.get("/categories", getAllCategories);
//Create New Product - /api/v1/product/admin-products
app.get("/admin-products", getAdminProducts);

app
  .route("/:id")
  .get(getSingleProduct)
  .put(adminOnly, singleUpload, updateProduct)
  .delete(adminOnly, deleteProduct);

export default app;
