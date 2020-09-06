import express from "express";

import bcrypt from "bcryptjs";
import config from "../../config/index.mjs";
import jwt from "jsonwebtoken";
import auth from "../../middleware/auth.mjs";
// User Model
import User from "../../models/User.mjs";

const { JWT_SECRET } = config;

const router = express.Router();

/**
 * @route GET api/user/
 * @desc Get user if authenticated
 * @access Private
 */
router.get("/auth/user", auth("USER"), async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) throw Error("User not found");

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @route   POST api/auth/login
 * @desc    Login user
 * @access  Public
 */

router.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).json("Please enter all fields");
  }

  try {
    // Check for existing user
    const user = await User.findOne({ email });
    if (!user) throw Error("Invalid username or password");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw Error("Invalid username or password");

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: 60 * 60 * 24,
    });
    if (!token) throw Error("Couldnt sign the token");

    res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        displayPicture: user.displayPicture,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @route POST api/auth/register
 * @desc Post a user
 * @access Public
 */

router.post("/auth/register", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json("Please enter all fields");
  }

  try {
    const user = await User.findOne({ email });
    if (user) throw Error("User already exists");

    const salt = await bcrypt.genSalt(10);
    if (!salt) throw Error("Something went wrong with bcrypt");

    const hash = await bcrypt.hash(password, salt);
    if (!hash) throw Error("Something went wrong hashing the password");

    const newUser = new User({
      ...req.body,
      password: hash,
      role: ["PUBLIC", "USER"],
    });

    const savedUser = await newUser.save();
    if (!savedUser) throw Error("Something went wrong saving the user");

    const token = jwt.sign(
      { id: savedUser._id, role: savedUser.role },
      JWT_SECRET,
      {
        expiresIn: 60 * 60 * 24,
      }
    );
    if (!token) throw Error("Couldnt sign the token");

    res.status(200).json({
      token,
      user: {
        id: savedUser.id,
        email: savedUser.email,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName,
        role: savedUser.role,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 *
 */
// router.patch("users/:id", auth("SELF"), async (req, res) => {
//   try {
//     const user = await user.findByIdAndUpdate(
//       req.params.id,
//       { ...req.body },
//       { new: true }
//     );

//     if (!user) throw Error("user not found");
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

/**
 * @route   DELETE api/users/:id
 * @desc    Delete a user
 * @access  Private
 */

router.delete("/users/:id", auth("ADMIN"), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw Error("No user found");

    const removed = await user.remove();
    if (!removed)
      throw Error("Something went wrong while trying to delete the user");

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
});

export default router;
