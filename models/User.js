import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  department: { type: String, enum: ["Finance", "HR", "IT", "Sales"], required: true },
});

export default mongoose.model("User", userSchema);
