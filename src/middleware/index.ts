import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/user-model";

export interface AuthRequest extends Request {
  user: string;
}

export const authenticationMiddleware = async (
  request: AuthRequest,
  response: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = request.headers;

    if (!authorization) {
      return response.status(401).json({ error: "Invalid authorization" });
    }
    const token = authorization;

    let payload: string | JwtPayload;

    try {
      payload = jwt.verify(token, "express");
    } catch (error) {
      return response.status(401).json({ error: "Invalid token" });
    }

    if (typeof payload !== "string") {
      const { _id } = payload;
      const existingUser = await User.findOne({ _id });

      if (existingUser) {
        request.user = existingUser.id;
      }
    }

    next();
  } catch (error) {
    console.log("error in authenticationMiddleware", error);
    throw error;
  }
};
