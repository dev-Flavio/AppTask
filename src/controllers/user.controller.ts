import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user-model";
import { IUser } from "../types";
import { Types } from "mongoose";

const getUserToken = (_id: string | Types.ObjectId) => {
  const token = jwt.sign({ _id }, "express", {
    expiresIn: "7d",
  });
  return token;
};

export const createUser = async (request: Request, response: Response) => {
  try {
    const { name, email, password } = request.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return response.status(409).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    return response.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.log("error in createUser", error);
    throw error;
  }
};

export const loginUser = async (request: Request, response: Response) => {
  try {
    const { email, password }: IUser = await request.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return response.status(409).send("User not found");
    }

    const isPasswordIdentical = await bcrypt.compare(
      password,
      (
        await existingUser
      ).password
    );
    if (isPasswordIdentical) {
      const token = getUserToken(existingUser._id);
      return response.send({
        token,
        user: {
          email: existingUser.email,
          name: existingUser.name,
        },
      });
    } else {
      return response.status(409).send("Password is incorrect");
    }
  } catch (error) {
    console.log("error in loginUser", error);
    throw error;
  }
};
