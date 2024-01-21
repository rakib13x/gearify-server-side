import { Product } from "./../models/product.js";
import mongoose from "mongoose";
import { invalidateCacheProps } from "../types/types.js";
import { myCache } from "../app.js";

export const connectDB = () => {
  mongoose
    //database connection
    .connect(
      "mongodb+srv://Rakibbb:z00NXAvacaUxRFCY@cluster0.kyfxv.mongodb.net/?retryWrites=true&w=majority",
      {
        dbName: "gearify",
      }
    )
    .then((c) => console.log(`Db Connected to ${c.connection.host}`))
    .catch((e) => console.log(e));
};

export const invalidateCache = async ({
  product,
  order,
  admin,
}: invalidateCacheProps) => {
  if (product) {
    const productKeys: string[] = [
      "latest-products",
      "categories",
      "all-products",
    ];

    const products = await Product.find({}).select("_id");

    products.forEach((i) => {
      productKeys.push(`product-${i._id}`);
    });

    myCache.del(productKeys);
  }
  if (order) {
  }
  if (admin) {
  }
};
