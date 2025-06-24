import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { signup, login } from "../controllers/authcontroller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/auth", async (req, res) => {
  try {
    if (!req.headers.authorization) {
      console.log(req.headers);
      return res.status(401).json({ error: "No token provided" });
    }
    const token = req.headers.authorization.split(" ")[1];
    const userId = await jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(userId.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ id: userId, user });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Invalid token" });
  }
});

export default router;
