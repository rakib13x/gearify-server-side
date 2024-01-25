import { Product } from "./../models/product.js";
import mongoose from "mongoose";
import { OrderItemType, invalidateCacheProps } from "../types/types.js";
import { myCache } from "../app.js";
import { Order } from "../models/order.js";

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
  userId,
  orderId,
  productId,
}: invalidateCacheProps) => {
  if (product) {
    const productKeys: string[] = [
      "latest-products",
      "categories",
      "all-products",
    ];

    if (typeof productId === "string") productKeys.push(`product-${productId}`);
    if (typeof productId === "object")
      productId.forEach((i) => productKeys.push(`product-${i}`));
    myCache.del(productKeys);
  }
  if (order) {
    const orderKeys: string[] = [
      "all-orders",
      `my-orders-${userId}`,
      `order-${orderId}`,
    ];

    myCache.del(orderKeys);
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
