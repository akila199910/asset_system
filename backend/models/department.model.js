import mongoose from "mongoose";

const departmentModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
  },
  status: {
    type: Boolean,
    required: true,
    enum: [true, false],
    default: true,
  },
  business_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Businesses",
    required: true,
  },
});

export default mongoose.model("Departments", departmentModel);
