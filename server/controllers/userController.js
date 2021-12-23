const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

updateUser = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "User not found!",
      });
    }
    console.log(user);

    //user.UserName = body.UserName;

    //user.Password = body.Password;

    user.FirstName = body.FirstName;

    user.LastName = body.LastName;

    user.Email = body.Email;

    user.PassportNumber = body.PassportNumber;

    user
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: user.id,
          message: "User updated!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "User not updated!",
        });
      });
  });
};

deleteUser = async (req, res) => {
  await User.findByIdAndDelete({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!user) {
      return res.status(404).json({ success: false, error: `User not found` });
    }

    return res.status(200).json({ success: true, data: user });
  }).catch((err) => console.log(err));
};

checkEmail = async (req, res) => {
  const user = req.body;
  //Check if email already exists
  let existingUser = await User.findOne({ Email: user.Email });
  if (existingUser) {
    return res.json({ invalidEmail: true, message: "Email already exists" });
  }
  return res.json({ invalidEmail: false });
};

checkUserName = async (req, res) => {
  //Check if username already exists
  const user = req.bpdy;
  let existingUser = await User.findOne({ UserName: user.UserName });
  if (existingUser) {
    return res.json({
      invalidUsername: true,
      message: "Username already exists",
    });
  }
  return res.json({ invalidUsername: false });
};

createUser = async (req, res) => {
  const user = req.body;
  //Check if email already exists
  let existingUser = await User.findOne({ Email: req.body.Email });
  if (existingUser) {
    return res.status(400).send("Email already exists");
  }
  //Check if username already exists
  existingUser = await User.findOne({ UserName: req.body.UserName });
  if (existingUser) {
    return res.status(400).send("Username already exists.");
  }
  user.Password = await bcrypt.hash(req.body.Password, 10);

  User.create(user)
    .then((user) =>
      res.json({ msg: "User added successfully", data: req.body })
    )
    .catch((err) => res.status(400).json({ error: "Unable to add this user" }));
};

getUser = (req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(404).json({ nousersfound: "No User found" }));
};

getUserById = async (req, res) => {
  await User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: err });
    }

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }
    return res.status(200).json({ success: true, data: user });
  }).catch((err) => console.log(err));
};

login = (req, res) => {
  const userLoggingIn = req.body;
  User.findOne({ UserName: userLoggingIn.UserName }).then((dbUser) => {
    if (!dbUser) {
      return res.json({ message: "Invalid Username or Password" });
    }
    bcrypt
      .compare(userLoggingIn.Password, dbUser.Password)
      .then((isCorrect) => {
        if (isCorrect) {
          const payload = {
            id: dbUser._id,
            username: dbUser.UserName,
          };
          jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: "10h" },
            (err, token) => {
              if (err) {
                return res.json({ message: err });
              }
              return res.json({ message: "Success", token: "Bearer " + token });
            }
          );
        } else {
          res.json({ message: "Invalid Username or Password" });
        }
      });
  });
};

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
changeUserPassword = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must provide a body to update",
    });
  }

  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(404).json({
        err,
        message: "User not found!",
      });
    }
    console.log(user);
    var x = "$2b$10$zBxIyN3CXf1sjX10yilLs.Kr6GB9ehk6AcVFiRY6Dq1db4ri4pPoS";
    console.log(x);
    bcrypt
    .compare(body.oldPassword,user.Password)
    .then(async(isCorrect) => {
      if (isCorrect) {
        user.Password =  await bcrypt.hash(body.newPassword, 10);
        
        console.log("YESSS");
        }
    
    
    user
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: user.id,
          message: "Password updated!",
        });
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: "Password not updated!",
        });
      });
  });
});}

module.exports = {
  updateUser,
  deleteUser,
  checkEmail,
  checkUserName,
  createUser,
  changeUserPassword,
  getUser,
  getUserById,
  login,
  verifyJwT,
};
