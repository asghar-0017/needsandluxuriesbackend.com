const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
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
}, {
  timestamps: true, 
  collection: "adminauth", 
});

module.exports = mongoose.model("Auth", authSchema);
