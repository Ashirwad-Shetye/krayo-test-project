const asyncHandler = require("express-async-handler");
const { OAuth2Client } = require("google-auth-library");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token

      // client.verifyIdToken({
      //   idToken: token,
      //   audience: process.env.GOOGLE_CLIENT_ID,
      // });

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token available");
  }
});

module.exports = {
  protect,
};
