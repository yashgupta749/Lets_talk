import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    console.log("Cookies: ", req.cookies); // Log the cookies
    console.log(jwt);
    const token = req.cookies.jwt;
    console.log("Token: ", token); // Log the token

    if (!token) {
      return res.status(401).json({
        error:
          "You are not authorized to access this route - no token provided",
      });
    }
    console.log("JWT TOKEN", process.env.JWT_SECRET);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded: ", decoded); // Log the decoded token

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Unauthorized - invalid token" });
    }
    console.log("Error in protection middleware", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default protectRoute;
