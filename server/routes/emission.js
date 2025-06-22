// import express from 'express';
// import Emission from '../models/Emission.js';
// import jwt from 'jsonwebtoken';

// const router = express.Router();

// // Middleware to get userId from token
// const verifyUser = (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   if (!token) return res.status(401).json({ error: "Access Denied" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.id;
//     next();
//   } catch {
//     res.status(400).json({ error: "Invalid token" });
//   }
// };

// // Add emission
// router.post("/add", verifyUser, async (req, res) => {
//   try {
//     const { category, amount } = req.body;
//     const newEmission = new Emission({ userId: req.userId, category, amount });
//     await newEmission.save();
//     res.status(201).json(newEmission);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// // Get emissions for logged-in user
// router.get("/my", verifyUser, async (req, res) => {
//   try {
//     const data = await Emission.find({ userId: req.userId });
//     res.json(data);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// export default router;
import express from 'express';
import Emission from '../models/Emission.js';
import verifyToken from '../middleware/verifyToken.js';

const router = express.Router();

// Save emission data
router.post('/save', verifyToken, async (req, res) => {
  try {
    const { electricity, transport, food, fuelType, vehicleType, electricityType, waste, totalEmissions } = req.body;
    const emission = new Emission({
      userId: req.user.id,
      electricity,
      transport,
      food,
      fuelType,
      vehicleType,
      electricityType,
      waste,
      totalEmissions
    });
    await emission.save();
    res.status(201).json({ message: 'Emission data saved' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get emission history for user
router.get('/', verifyToken, async (req, res) => {
  try {
    const emissions = await Emission.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(emissions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
