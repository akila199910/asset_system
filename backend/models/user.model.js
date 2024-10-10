import mongoose from "mongoose";

const userModel = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minLength: 10,
    maxLength: 30,
  },
  contact: {
    type: String,
    required: true,
    length: 10,
    unique: true,
  },
  status: {
    type: Boolean,
    enum: [true, false],
    default: true,
  },
  role: {
    type: String,
    enum: ["super_admin", "admin", "business_user", "user", "guest"],
    default: "guest",
  },
});

export default mongoose.model("Users", userModel);
