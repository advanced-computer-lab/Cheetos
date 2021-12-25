const jwt = require("jsonwebtoken");
const User = require("../models/User");

verifyJwT = (req, res, next) => {
  const token = req.headers["x-access-token"]?.split(" ")[1];
  console.log(token);
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err)
        return res.json({
          isLoggedIn: false,
          message: "Failed To Authenticate",
        });
      req.user = {};
      req.user._id = decoded.id;
      req.user.UserName = decoded.username;
      next();
    });
  } else {
    res.json({ message: "Incorrect Token Given", isLoggedIn: false });
  }
};

authorizeToken = async (req, res, next) => {
  const token = req.headers["x-access-token"]?.split(" ")[1];
  req.token = token;
  const verified = jwt.verify(token, process.env.JWT_SECRET);
  console.log("VERIFIED ", verified);
  await User.findOne({ _id: verified.id }).then((user) => {
    if (user.admin) {
      next();
    } else {
      return res.status(401).send("Unauthorized");
    }
  });
};

module.exports = {
  verifyJwT,
  authorizeToken,
};
