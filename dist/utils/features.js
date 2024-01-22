import { Product } from "./../models/product.js";
import mongoose from "mongoose";
import { myCache } from "../app.js";
export const connectDB = (uri) => {
    mongoose
        //database connection
        .connect(uri, {
        dbName: "gearify",
    })
        .then((c) => console.log(`Db Connected to ${c.connection.host}`))
        .catch((e) => console.log(e));
};
export const invalidateCache = async ({ product, order, admin, }) => {
    if (product) {
        const productKeys = [
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
