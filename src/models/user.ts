import mongoose from "mongoose";
import validator from "validator";

interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  photo: string;
  role: "admin" | "user";
  gender: "male" | "feamle";
  dob: Date;
  createdAt: Date;
  updateAt: Date;
  //virtual attribute
  age: number;
}
const schema = new mongoose.Schema(
  {
    _id: { type: String, required: [true, "Please enter id"] },
    name: { type: String, required: [true, "Please enter your name"] },
    email: {
      type: String,
      unique: [true, "Email already exist."],
      required: [true, "Please enter your email"],
      validate: validator.default.isEmail,
    },
    photo: { type: String, required: [true, "Please add photo"] },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: [true, "Please select your gender"],
    },
    dob: {
      type: Date,
      reuqired: [true, "Please enter your Date of birth"],
    },
  },
  { timestamps: true }
);

schema.virtual("age").get(function (this: { dob: Date }) {
  const today = new Date();
  const dob = this.dob;

  let age = dob?.getFullYear
    ? today.getFullYear() - dob.getFullYear()
    : undefined;

  if (
    today.getMonth() < dob.getMonth() ||
    (today.getMonth() === dob?.getMonth() && today.getDate() < dob.getDate())
  ) {
    age--;
  }

  return age;
});

export const User = mongoose.model<IUser>("User", schema);
