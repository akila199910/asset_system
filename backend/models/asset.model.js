import mongoose from "mongoose";

const assetModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 30,
    },
    business_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Businesses",
      required: true,
    },
    asset_category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AssetCategories",
      required: true,
    },
    asset_sub_category_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AssetSubCategories",
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

assetModel.index({ business_id: 1, name: 1 }, { unique: true });

export default mongoose.model("Assets", assetModel);
