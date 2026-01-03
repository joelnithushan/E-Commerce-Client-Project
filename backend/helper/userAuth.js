import HandleError from "./handleError.js";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const verifyUser = async (req, res, next) => {
  const { token } = req.cookies;
  //console.log(token);

  if (!token) {
    return next(new HandleError("Access denied please login to access", 401));
  }

  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
    //console.log(decodedData);

    req.user = await User.findById(decodedData.id);
    
    if (!req.user) {
      return next(new HandleError("User not found", 401));
    }
  } catch (error) {
    return next(new HandleError("Invalid or expired token", 401));
  }
  //console.log(req.user);

  next();
};


//["admin", "superadmin"]
//["user"]
export const roleBasedAccess = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new HandleError("User not authenticated", 401));
    }
    if (!roles.includes(req.user.role)) {
      return next(new HandleError(`Role- ${req.user.role} is not allowed to access this resource`, 403));
    }
    next();
  };
};