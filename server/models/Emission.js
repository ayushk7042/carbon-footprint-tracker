// import mongoose from "mongoose";

// const emissionSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
//   category: { type: String, required: true }, // e.g., Transport, Energy
//   amount: { type: Number, required: true },   // CO₂ in kg
//   date: { type: Date, default: Date.now }
// });

// export default mongoose.model("Emission", emissionSchema);
import mongoose from 'mongoose';

const emissionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  electricity: Number,
  transport: Number,
  food: String,
  fuelType: String,
  vehicleType: String,
  electricityType: String,
  waste: Number,
  totalEmissions: Number,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Emission", emissionSchema);
