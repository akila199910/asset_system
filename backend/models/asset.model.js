import mongoose from "mongoose";

const assetModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Asset name is required"],
      minLength: [3, "Asset name must be at least 3 characters long"],
      maxLength: [30, "Asset name must not exceed 30 characters"],
    },
    business_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Businesses",
      required: [true, "Business ID is required"],
    },
    asset_category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AssetCategories",
      required: [true, "Asset category ID is required"],
    },
    asset_sub_category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AssetSubCategories",
      required: [true, "Asset sub-category ID is required"],
    },
    asset_no: {
      type: String,
      required: [true, "Asset number is required"],
      match: [
        /^[A-Z0-9-]+$/,
        "Asset number must only contain uppercase letters, numbers, or dashes",
      ],
    },
    serial_no: {
      type: String,
      required: [true, "Serial number is required"],
      match: [
        /^[A-Z0-9-]+$/,
        "Serial number must only contain uppercase letters, numbers, or dashes",
      ],
    },
    purchased_date: {
      type: Date,
    },
    warranty: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
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

assetModel.index({ business_id: 1, name: 1,serial_no: 1 }, { unique: true });
assetModel.index({ serial_no: 1,business_id: 1 }, { unique: true });

export default mongoose.model("Assets", assetModel);
