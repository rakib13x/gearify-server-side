import { Product } from "./../models/product.js";
import mongoose from "mongoose";
import { OrderItemType, invalidateCacheProps } from "../types/types.js";
import { myCache } from "../app.js";

export const connectDB = (uri: string) => {
  mongoose
    //database connection
    .connect(uri, {
      dbName: "gearify",
    })
    .then((c) => console.log(`Db Connected to ${c.connection.host}`))
    .catch((e) => console.log(e));
};
//@ts-ignore
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

export const reduceStock = async (orderItems: OrderItemType[]) => {
  for (let i = 0; i < orderItems.length; i++) {
    const order = orderItems[i];
    const product = await Product.findById(order.productId);
    if (!product) throw new Error("Product Not Found");
    product.stock -= order.quantity;
    await product.save();
  }
};
