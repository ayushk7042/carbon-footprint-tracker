import { useState } from "react";
import axios from "axios";
import { FaLeaf, FaBus, FaExclamationTriangle } from "react-icons/fa";
import { motion } from "framer-motion";

const saveEmissionData = async (data) => {
  const token = localStorage.getItem("token");
  try {
    const res = await axios.post(
      "http://localhost:5000/api/emissions/save",
      data,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    alert(res.data.message);
  } catch (error) {
    console.error(error);
  }
};

const EmissionCalculator = () => {
  const [formData, setFormData] = useState({
    vehicleType: "car",
    fuelType: "petrol",
    distance: "",
    electricityType: "home",
    electricity: "",
    foodHabit: "average",
    waste: "",
  });

  const [emissionResult, setEmissionResult] = useState(null);
  const [advice, setAdvice] = useState({ icon: null, message: [] });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateEmissions = () => {
    let transportEmissionFactor = 0.21; // default
    if (formData.fuelType === "diesel") transportEmissionFactor = 0.24;
    else if (formData.fuelType === "cng") transportEmissionFactor = 0.18;
    else if (formData.fuelType === "electric") transportEmissionFactor = 0.05;

    const transportEmission =
      parseFloat(formData.distance || 0) * transportEmissionFactor;

    let electricityFactor = 0.92;
    if (formData.electricityType === "industries") electricityFactor = 1.2;
    else if (formData.electricityType === "shop") electricityFactor = 0.8;

    const electricityEmission =
      parseFloat(formData.electricity || 0) * electricityFactor;

    let foodEmission = 2.5;
    if (formData.foodHabit === "vegetarian") foodEmission = 1.2;
    else if (formData.foodHabit === "vegan") foodEmission = 0.8;
    else if (formData.foodHabit === "heavymeat") foodEmission = 3.5;

    const wasteEmission = parseFloat(formData.waste || 0) * 1.8;

    const total =
      transportEmission + electricityEmission + foodEmission + wasteEmission;
    const totalFixed = total.toFixed(2);
    setEmissionResult(totalFixed);
    setAdvice(getAdvice(total));
    saveEmissionData(formData);
  };

  const getAdvice = (emission) => {
    if (emission <= 0) {
      return {
        icon: <FaLeaf className="text-green-600 text-3xl" />,
        message: [
          "Great job! Your emissions are already low.",
          "Continue your sustainable practices.",
          "Consider sharing your tips with others.",
        ],
      };
    } else if (emission < 50) {
      return {
        icon: <FaLeaf className="text-green-600 text-3xl" />,
        message: [
          "Use energy-efficient appliances",
          "Walk or cycle whenever possible",
          "Utilize renewable energy sources",
          "Minimize waste generation",
        ],
      };
    } else if (emission < 150) {
      return {
        icon: <FaBus className="text-yellow-500 text-3xl" />,
        message: [
          "Carpool or use public transport",
          "Reduce meat and dairy consumption",
          "Turn off appliances when not in use",
          "Compost organic waste",
        ],
      };
    } else {
      return {
        icon: <FaExclamationTriangle className="text-red-600 text-3xl" />,
        message: [
          "Switch to clean energy sources",
          "Avoid unnecessary flights and drives",
          "Drastically cut down on single-use items",
          "Consider energy audits for your home",
        ],
      };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Advanced Carbon Emission Calculator
      </h1>

      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md space-y-4">
        {/* Transport */}
        <div>
          <label className="block font-semibold text-gray-700">
            Vehicle Type:
          </label>
          <select
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="car">Car</option>
            <option value="bike">Bike</option>
            <option value="truck">Truck</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold text-gray-700">
            Fuel Type:
          </label>
          <select
            name="fuelType"
            value={formData.fuelType}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="petrol">Petrol</option>
            <option value="diesel">Diesel</option>
            <option value="cng">CNG</option>
            <option value="electric">Electric</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold text-gray-700">
            Distance (km):
          </label>
          <input
            type="number"
            name="distance"
            value={formData.distance}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Electricity */}
        <div>
          <label className="block font-semibold text-gray-700">
            Electricity Use Type:
          </label>
          <select
            name="electricityType"
            value={formData.electricityType}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="home">Home</option>
            <option value="industries">Industries</option>
            <option value="shop">Shop</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold text-gray-700">
            Electricity Usage (kWh):
          </label>
          <input
            type="number"
            name="electricity"
            value={formData.electricity}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Food */}
        <div>
          <label className="block font-semibold text-gray-700">
            Food Habit:
          </label>
          <select
            name="foodHabit"
            value={formData.foodHabit}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="average">Average</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="heavymeat">Heavy Meat Based</option>
          </select>
        </div>

        {/* Waste */}
        <div>
          <label className="block font-semibold text-gray-700">
            Waste Generated (kg):
          </label>
          <input
            type="number"
            name="waste"
            value={formData.waste}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          onClick={calculateEmissions}
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        >
          Calculate Emissions
        </button>

        {emissionResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center text-lg font-semibold text-gray-800 mt-4"
          >
            Total Estimated Emissions: {emissionResult} kg CO₂
          </motion.div>
        )}

        {advice.message.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mt-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-900 rounded"
          >
            <div className="flex items-center gap-3 mb-2">
              {advice.icon}
              <h2 className="text-lg font-bold">
                Tips to Reduce Your Emission
              </h2>
            </div>
            <ul className="list-disc list-inside space-y-1">
              {advice.message.map((tip, index) => (
                <li key={index}>{tip}</li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default EmissionCalculator;
