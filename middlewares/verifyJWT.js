import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";

export const verifyJWT = async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
 if (!token) {
      return res.status(401).json({ message: "Access token not provided" });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

     if (!user) {
      return res.status(401).json({ message: "Invalid Access Token" });
    }

    req.user = user;
    next();
  } catch (error) {
   return res.status(401).json({ message: error?.message || "Invalid access token" });
  }
};
