import mongoose from "mongoose";

const userModel = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
    pattern: "^[a-zA-Z]+$",
  },
  lastName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
    pattern: "^[a-zA-Z]+$",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 10,
    maxLength: 30,
    pattern: "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",
  },
  contact: {
    type: String,
    required: true,
    length: 10,
    pattern: "^[0-9]+$",
  },

  role: {
    type: String,
    enum: ["super_admin", "admin", "business_user", "user", "guest"],
    default: "guest",
  },
});

export default mongoose.model("Users", userModel);
