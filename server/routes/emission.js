import express from "express";
import Emission from "../models/Emission.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

// Save emission data
router.post("/save", verifyToken, async (req, res) => {
  try {
    const {
      electricity,
      transport,
      food,
      fuelType,
      vehicleType,
      electricityType,
      waste,
      totalEmissions,
    } = req.body;
    const emission = new Emission({
      userId: req.user.id,
      electricity,
      transport,
      food,
      fuelType,
      vehicleType,
      electricityType,
      waste,
      totalEmissions,
    });
    await emission.save();
    res.status(201).json({ message: "Emission data saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get emission history for user
router.get("/", verifyToken, async (req, res) => {
  try {
    const emissions = await Emission.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });
    res.status(200).json(emissions);
  } catch (err) {
    console.error("Error fetching emissions:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
