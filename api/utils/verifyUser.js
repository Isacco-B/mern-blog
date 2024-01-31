import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookie.access_token;
  console.log(token)
  if (!token) {
    return next(errorHandler(401, "Unathorized"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, "Unathorized"));
    }
    req.user = user
    next()
  });
};
