import mongoose from "mongoose";
import { type } from "os";

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
  password: {
    type: String,
    required: false,
    minLength: 8,
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
  business_id: {
    type: String,
    default: 1,
  },
});

userModel.virtual("profile", {
  ref: "UserProfiles",
  localField: "_id",
  foreignField: "userId",
  justOne: true,
});

userModel.set("toObject", { virtuals: true });
userModel.set("toJSON", { virtuals: true });

export default mongoose.model("Users", userModel);
