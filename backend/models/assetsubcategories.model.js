import mongoose from "mongoose";

const assetSubCategoryModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    status: {
      type: Boolean,
      default: true,
    },
    business_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Businesses",
      required: true,
    },
  },
  { timestamps: true }
);

assetSubCategoryModel.index({ business_id: 1, name: 1 }, { unique: true });

export default mongoose.model("AssetSubCategories", assetSubCategoryModel);
