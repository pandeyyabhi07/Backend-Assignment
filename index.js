import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import allowanceRoutes from "./routes/allowanceRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/api/allowances", allowanceRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
