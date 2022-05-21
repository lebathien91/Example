require("dotenv").config();
const Users = require("../models/User");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

class UserControllers {
  // @route GET Users/
  // @desc Reader list users
  // @access Private
  async reader(req, res) {
    try {
      const users = await Users.find().select("-password");

      res.json({
        success: true,
        message: "List Users",
        users,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  // @route POST users/register
  // @desc Create user
  // @access Private
  async register(req, res) {
    const { username, email, password } = req.body;
    // Simple validation
    if (!username || !password || !email) {
      return res.status(400).json({
        success: false,
        message: "Mising username and/or password and/or email",
      });
    }
    try {
      const hashedPassword = await argon2.hash(password);

      const newUser = new Users({
        username,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      // return token
      const accessToken = jwt.sign(
        { userId: newUser._id },
        process.env.ACCESS_TOKEN_SECRET
      );

      res.json({
        success: true,
        message: "Created users",
        accessToken,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  // @route POST users/login
  // @desc Login user
  // @access Private
  async login(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing username and/or password",
      });
    }
    try {
      const user = await Users.findOne({ username });
      if (!user) {
        return res.json({
          success: false,
          message: "Incorrect username",
        });
      }
      const passwordValid = await argon2.verify(user.password, password);
      if (!passwordValid) {
        return res.json({
          success: false,
          message: "Incorrect password",
        });
      }
      // return token
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.ACCESS_TOKEN_SECRET
      );
      res.json({
        success: true,
        message: "User login successfully",
        accessToken,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  // @route GET users/:username
  // @desc Reader user
  // @access Private
  async detail(req, res) {
    try {
      const user = await Users.findOne({
        username: req.params.username,
      }).select("-password");
      res.json({
        success: true,
        message: "users",
        user,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  // @route PUT users/update/:id
  // @desc Update user
  // @access Private
  async update(req, res) {
    const { password } = req.body;
    const hashedPassword = await argon2.hash(password);

    try {
      let updateUser = {
        password: hashedPassword,
      };
      const userUpdateCondition = { _id: req.params.id };
      updateUser = await Users.findOneAndUpdate(
        userUpdateCondition,
        updateUser,
        { new: true }
      ).select("-password");

      if (!updateUser) {
        return res.status(401).json({
          success: false,
          message: "user not found and don't update",
        });
      }
      res.json({
        success: true,
        message: "Updated user",
        user: updateUser,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }

  // @route PUT users/delete/:id
  // @desc Delete user
  // @access Private
  async trash(req, res) {
    res.json({ success: true, message: "Remove trash users" });
  }

  // @route DELETE users/destroy/:id
  // @desc Destroy post
  // @access Private
  async destroy(req, res) {
    try {
      const destroyUser = await Users.findOneAndDelete({
        _id: req.params.id,
      });
      if (!destroyUser) {
        return res.status(401).json({
          success: false,
          message: "not found user and don't destroy",
        });
      }
      res.json({
        success: true,
        message: "Destroy user",
        user: destroyUser,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  }
}

module.exports = new UserControllers();
