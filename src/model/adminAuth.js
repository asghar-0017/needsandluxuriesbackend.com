const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const authSchema = new mongoose.Schema(
  {
    adminId: {
      type: Number,
      unique: true,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    verifyToken: {
      type: String,
      default: "",
    },
    resetCode: {
      type: String,
      default: "",
    },
    sessions: [sessionSchema],
  },
  {
    timestamps: true,
    collection: "adminauth",
  }
);

module.exports = mongoose.model("Auth", authSchema);
