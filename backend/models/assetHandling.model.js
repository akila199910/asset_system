import mongoose from "mongoose";

const assetHandlingModel = new mongoose.Schema(
  {
    asset_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Assets",
      required: [true, "Asset field is required"],
    },
    employee_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Employee field is required"],
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Created by is required"],
    },
    given_date: {
      type: Date,
      required: [true, "Given date is required"],
    },
    given_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Given by is required"],
    },
    handover_date: {
      type: Date,
      required: [true, "Handover date is required"],
    },
    handover_to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "Handover to is required"],
    },
    business_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Businesses",
      required: [true, "Business ID is required"],
    },
    status: {
      type: Boolean,
      default: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("AssetHandlings", assetHandlingModel);
