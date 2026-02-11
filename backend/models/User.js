const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, minlength: 2 },
    lastName: { type: String, required: true, minlength: 2 },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    location: { type: String, required: true },
    avatarUrl: { type: String },
    avatarPublicId: { type: String },
    profileImage: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
