import mongoose from "mongoose";

const businessModel = new mongoose.Schema({
  businessName: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
    unique: true,
  },
  businessEmail: {
    type: String,
    required: true,
    unique: true,
    minLength: 10,
    maxLength: 30,
  },
  address: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 30,
  },
  city: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 30,
  },
  status: {
    type: Boolean,
    required: true,
    enum: [true, false],
    default: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

export default mongoose.model("Businesses", businessModel);