import { Request } from "express";
import { TryCatch } from "../middlewares/error.js";
import { NewProductRequestBody } from "../types/types.js";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/utility-class.js";
import { rm } from "fs";
import products from "../routes/products.js";
export const newProduct = TryCatch(
  async (req: Request<{}, {}, NewProductRequestBody>, res, next) => {
    const { name, price, stock, category } = req.body;

    const photo = req.file;
    if (!photo) return next(new ErrorHandler("Please Add Photo", 400));

    if (!name || !price || !stock || !category) {
      rm(photo.path, () => {
        console.log("Deleted");
      });
      return next(new ErrorHandler("Please enter all field", 400));
    }

    await Product.create({
      name,
      price,
      stock,
      category: category.toLowerCase(),
      photo: photo?.path,
    });

    return res
      .status(201)
      .json({ success: true, message: "Product Created Successfully" });
  }
);

export const getLatestProducts = TryCatch(
  async (req: Request<{}, {}, NewProductRequestBody>, res, next) => {
    const products = await Product.find({}).sort({ createdAt: -1 }).limit(5);
    return res.status(200).json({ success: true, products });
  }
);
export const getAllCategories = TryCatch(async (req, res, next) => {
  const categories = await Product.distinct("category");

  return res.status(200).json({ success: true, categories });
});

export const getAdminProducts = TryCatch(async (req, res, next) => {
  const products = await Product.find({});
  return res.status(200).json({ success: true, products });
});
export const getSingleProduct = TryCatch(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  return res.status(200).json({ success: true, product });
});

export const updateProduct = TryCatch(
  async (
    req: Request<{ id: string }, {}, NewProductRequestBody>,
    res,
    next
  ) => {
    const { id } = req.params;

    const { name, price, stock, category } = req.body;

    const photo = req.file;
    const product = await Product.findById(id);
    if (!product) return next(new ErrorHandler("Invalid Product Id", 404));

    if (photo) {
      rm(product.photo, () => {
        console.log("Old Photo Deleted");
      });
      product.photo = photo.path;
      return next(new ErrorHandler("Please enter all field", 400));
    }

    if (name) product.name = name;
    if (price) product.price = price;
    if (stock) product.stock = stock;
    if (category) product.category = category;

    await product.save();

    return res
      .status(200)
      .json({ success: true, message: "Product Updated Successfully" });
  }
);

export const deleteProduct = TryCatch(async (req, res, next) => {
  const productId = req.params.id;
  const product = await Product.findById(productId);

  if (!product) {
    return next(new ErrorHandler("Product Not Found", 404));
  }

  // Delete the product photo from the file system
  rm(product.photo!, (err) => {
    if (err) {
      console.error("Error deleting product photo:", err);
    } else {
      console.log("Product Photo Deleted");
    }
  });

  // Delete the product from the database
  await product.deleteOne();

  return res
    .status(200)
    .json({ success: true, message: "Product Deleted Successfully." });
});

export const SearchProducts = TryCatch(async (req, res, next) => {
  const products = await Product.find({}).sort({ createdAt: -1 }).limit(5);
  return res.status(200).json({ success: true, products });
});
