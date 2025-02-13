const jwt = require("jsonwebtoken");

const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authorization failed. Please log in again.",
      });
    }

    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_ADMIN);
    if (decodedToken) {
      req.adminId = decodedToken.id;
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "Invalid token. Authorization denied.",
      });
    }
  } catch (error) {
    console.log("Error in admin auth middleware: ", error);
    return res.status(500).json({
      success: false,
      message: error?.message || "An unexpected error occurred. Please try again later.",
    });
  }
};

module.exports = adminAuth;
