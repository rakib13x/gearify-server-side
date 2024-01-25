import mongoose from "mongoose";
const schema = new mongoose.Schema({
    coupon: {
        type: String,
        required: [true, "Please enter Coupon code"],
        unique: true,
    },
    amount: {
        type: Number,
        required: [true, "Please enter Discount Amount"],
    },
});
export const coupon = mongoose.model("Coupon", schema);
