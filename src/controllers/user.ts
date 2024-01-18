import { NextFunction, Request, Response } from "express";
import { User } from "../models/user.js";
import { NewUserRequestBody } from "../types/types.js";
import { TryCatch } from "../middlewares/error.js";
import ErrorHandler from "../utils/utility-class.js";
import user from "../routes/user.js";
export const newUser = TryCatch(
  async (
    req: Request<{}, {}, NewUserRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { name, email, photo, gender, _id, dob } = req.body;

    let existingUser = await User.findById(_id);
    if (existingUser)
      return res.status(200).json({
        success: true,
        message: `Welcome, ${existingUser.name}`,
      });

    if (!_id || !name || !email || !photo || !gender || !dob)
      return next(new ErrorHandler("Please add all fields", 400));

    const newUser = await User.create({
      name,
      email,
      photo,
      gender,
      _id,
      dob: new Date(dob),
    });

    return res
      .status(200)
      .json({ success: true, message: `Welcome, ${newUser.name}` });
  }
);

export const getAllUsers = TryCatch(async (req, res, next) => {
  try {
    console.log("Inside getAllUsers controller");
    const users = await User.find({});
    console.log("Users:", users);
    return res.status(201).json({
      success: true,
      users,
      message: "Hello from getAllUsers!",
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return next(new ErrorHandler("Error fetching users", 500));
  }
});

export const getUser = TryCatch(async (req, res, next) => {
  const id = req.params.id;
  console.log("ID:", id);
  const user = await User.findById(id);

  if (!user) return next(new ErrorHandler("Invalid Id", 400));

  return res.status(201).json({
    success: true,
    user,
  });
});
export const deleteUser = TryCatch(async (req, res, next) => {
  const id = req.params.id;
  console.log("ID:", id);
  const user = await User.findById(id);

  if (!user) return next(new ErrorHandler("Invalid Id", 400));
  await user.deleteOne();

  return res.status(201).json({
    success: true,
    message: "User Deleted Successfully",
  });
});
