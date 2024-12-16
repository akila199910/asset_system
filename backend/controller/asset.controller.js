import assetModel from "../models/asset.model.js";
import { assetCreateValidation } from "../validators/asset/asset.create.validation.js";

class AssetController {
  async getAsset(req, res) {
    const business_id = req.session.business_id;
    try {
      const asset = await assetModel.find({
        business_id: business_id,
      });
      res.status(200).json({ asset: asset, status: true });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while fetching assets",
        error: error.message,
      });
    }
  }

  async createAsset(req, res) {
    const business_id = req.session.business_id;
    const {
      name,
      asset_category_id,
      asset_sub_category_id,
      asset_no,
      serial_no,
      purchased_date,
      warranty,
      description,
      status,
    } = req.body;

    const new_asset = {
      name,
      asset_category_id,
      asset_sub_category_id,
      asset_no,
      serial_no,
      purchased_date,
      warranty,
      description,
      status,
      business_id,
    };

    try {
      const isValid = await assetCreateValidation(res, new_asset);

      if (!isValid) return;
      const asset = await assetModel.create(new_asset);
      res.status(201).json({ asset, status: true });
    } catch (error) {
      const status = error.status || 500;
      res.status(status).json({
        message: error.message || "Internal Server Error",
        errors: error.errors || {},
        status: false,
      });
    }
  }
//   async getAssetById(req, res) {
//     try {
//       const assetCategory = await assetCategoryModel.findById(req.params.id);
//       if (!assetCategory) {
//         return res
//           .status(404)
//           .json({ error: "AssetCategory not found", status: false });
//       }

//       res.status(200).json({ assetCategory: assetCategory, status: true });
//     } catch (error) {
//       res.status(400).json({ error: error.message, status: false });
//     }
//   }
//   async updateAsset(req, res) {
//     const update_assetCategory = req.body;

//     try {
//       await assetCategoryUpdateValidate(update_assetCategory);
//       const updatedCategory = await assetCategoryModel.findByIdAndUpdate(
//         update_assetCategory._id,
//         {
//           name: update_assetCategory.name,
//           status: update_assetCategory.status,
//           business_id: update_assetCategory.business_id,
//         },
//         { new: true }
//       );
//       if (!updatedCategory) {
//         return res
//           .status(404)
//           .json({ error: "AssetCategory not found", status: false });
//       }
//       res.status(200).json({
//         assetCategory: updatedCategory,
//         status: true,
//         message: "Asset category updated successfully",
//       });
//     } catch (error) {
//       const status = error.status || 500;
//       res.status(status).json({
//         message: error.message || "Internal Server Error",
//         errors: error.errors || {},
//         status: false,
//       });
//     }
//   }
}
const assetsController = new AssetController();
export default assetsController;
