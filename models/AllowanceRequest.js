import mongoose from "mongoose";

const allowanceSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId,  // Reference hamesha ObjectId hota hai
    ref: "User",                           // Yeh User model ko refer karega
    required: true 
  },
  amount: { type: Number, required: true },
  description: { type: String },
  date: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
});

export default mongoose.model("AllowanceRequest", allowanceSchema);
