// import { Request, Response, NextFunction } from "express";
import { UserModel } from "../models/user.model.js";
import { decodeToken } from "../helpers/auth.helper.js";


export const auth = async (
  req,
  res,
  next
  // eslint-disable-next-line consistent-return
) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
        data: null,
      });
    }
    const authHeader = req.headers.authorization;
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];
    if (!token) {
      return res.status(419).json({
        success: false,
        message: "Invalid token",
        data: null,
      });
    }
    const tokenData = decodeToken(token);
    // check validation from database
    const user = await UserModel.findOne({
      _id: tokenData.data.userId,
    });
    if (!tokenData.success) {
      return res.status(419).json({
        success: false,
        message: "Invalid token",
        data: null,
      });
    }
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Access denied",
        data: null,
      });
    }
    req.userData = tokenData.data;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Access denied",
      data: null,
    });
  }
};
