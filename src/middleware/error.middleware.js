// import { Request, Response, NextFunction } from "express";
import { isCelebrateError } from "celebrate";
export const errorHandler = (
  error,
  req,
  res,
  next
  // eslint-disable-next-line consistent-return
) => {
  if (isCelebrateError(error)) {
    let errorDetails = null;
    if (error.details.get("body")) {
      const { details } = error.details.get("body");
      errorDetails = details;
    }
    if (error.details.get("query")) {
      const { details } = error.details.get("query");
      errorDetails = details;
    }
    if (error.details.get("params")) {
      const { details } = error.details.get("query");
      errorDetails = details;
    }
    if (errorDetails) {
      const message = errorDetails
        .map((i) => i.message.replace(/['"]+/g, ""))
        .join(",");
      return res.status(400).send({
        success: false,
        message,
        data: null,
      });
    }
  }
  next();
};

