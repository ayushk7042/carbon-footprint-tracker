// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import cors from "cors";
// import authRoutes from "./routes/auth.js";

// import connectDB from "./config/db.js";

// dotenv.config();
// const app = express();

// app.use(cors({
//     origin: 'http://localhost:5173' // your frontend port (Vite default)
//   }));
// //app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/api/auth", authRoutes);

// // Connect DB and start server
// mongoose.connect(process.env.MONGO_URI, {
//   //useNewUrlParser: true,
//   //useUnifiedTopology: true,
// }).then(() => {
//   console.log("MongoDB connected");
//   app.listen(5000, () => console.log("Server running on port 5000"));
// }).catch((err) => console.error(err));
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.js";

import emissionRoutes from './routes/emission.js';
//app.use("/api/emissions", emissionRoutes);

// Load .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/emissions", emissionRoutes);


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error("❌ DB Error:", err));
