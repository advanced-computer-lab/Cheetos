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

createUser = async (req, res) => {
  const user = req.body;

  let existingEmail = await User.findOne({ Email: user.Email });
  let existingUserName = await User.findOne({ UserName: user.UserName });

  if (existingEmail && existingUserName) {
    return res.status(400).send({ message: "invalid" });
  } else if (existingEmail) {
    return res.status(400).send({ message: "invalid email" });
  } else if (existingUserName) {
    return res.status(400).send({ message: "invalid username" });
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

login = async (req, res) => {
  const userLoggingIn = req.body;
  console.log("LOGIN ");
  await User.findOne({ UserName: userLoggingIn.UserName }).then((dbUser) => {
    if (!dbUser) {
      res.status(400).send({ message: "invalid username" });
    } else {
      bcrypt
        .compare(userLoggingIn.Password, dbUser.Password)
        .then((isCorrect) => {
          if (isCorrect) {
            const payload = {
              userId: dbUser._id,
              username: dbUser.UserName,
            };
            jwt.sign(
              payload,
              process.env.JWT_SECRET,
              { expiresIn: "10h" },
              (err, token) => {
                if (err) {
                  return res.json({ message: "line 151 f controller" });
                }
                return res.json({
                  message: "Success",
                  token: "Bearer " + token,
                  data: payload,
                  type : dbUser.admin
                });
              }
            );
          } else {
            res.status(400).send({ message: "invalid password" });
          }
        });
    }
  });
};

changeUserPassword = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).send({ message: "invalid" });
  }

  User.findOne({ _id: req.params.id }, (err, user) => {
    if (err) {
      return res.status(400).send({ message: "invalid" });
    }
    bcrypt.compare(body.oldPassword, user.Password).then(async (isCorrect) => {
      if (isCorrect) {
        user.Password = await bcrypt.hash(body.newPassword, 10);
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
  });
};

module.exports = {
  updateUser,
  deleteUser,
  createUser,
  changeUserPassword,
  getUser,
  getUserById,
  login,
};
