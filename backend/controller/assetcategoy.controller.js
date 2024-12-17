import assetCategoryModel from "../models/assetcategories.model.js";
import { assetCategoryUpdateValidate } from "../validators/assetCatogory/assetCategory.update.validate.js";
import { assetCategoryCreateValidation } from "../validators/assetCatogory/assetCatogory.create.validation.js";
class AssetCategoryController {
  async getAssetCategory(req, res) {
    const business_id = req.session.business_id;
    try {
      const assetCategory = await assetCategoryModel.find({
        business_id: business_id,
      });
      res.status(200).json({ assetCategory: assetCategory, status: true });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while fetching assetCategory",
        error: error.message,
      });
    }
  }

  async createAssetCategory(req, res) {
    const business_id = req.session.business_id;
    const { name, status } = req.body;

    const new_assetCategory = { name, status, business_id };

    try {
      const isValid = await assetCategoryCreateValidation(
        res,
        new_assetCategory
      );

      if (!isValid) return;
      const assetCategory = await assetCategoryModel.create(new_assetCategory);
      res.status(201).json({ assetCategory, status: true });
    } catch (error) {
      const status = error.status || 500;
      res.status(status).json({
        message: error.message || "Internal Server Error",
        errors: error.errors || {},
        status: false,
      });
    }
  }
  async getAssetCategoryById(req, res) {
    try {
      const assetCategory = await assetCategoryModel.findById(req.params.id);
      if (!assetCategory) {
        return res
          .status(404)
          .json({ error: "AssetCategory not found", status: false });
      }

      res.status(200).json({ assetCategory: assetCategory, status: true });
    } catch (error) {
      res.status(400).json({ error: error.message, status: false });
    }
  }
  async updateAssetCategory(req, res) {
    const update_assetCategory = req.body;
    const business_id = req.session.business_id;
    update_assetCategory.business_id = business_id;

    try {
      await assetCategoryUpdateValidate(update_assetCategory);
      const updatedCategory = await assetCategoryModel.findByIdAndUpdate(
        update_assetCategory._id,
        {
          name: update_assetCategory.name,
          status: update_assetCategory.status,
          business_id: update_assetCategory.business_id,
        },
        { new: true }
      );
      if (!updatedCategory) {
        return res
          .status(404)
          .json({ error: "AssetCategory not found", status: false });
      }
      res.status(200).json({
        assetCategory: updatedCategory,
        status: true,
        message: "Asset category updated successfully",
      });
    } catch (error) {
      const status = error.status || 500;
      res.status(status).json({
        message: error.message || "Internal Server Error",
        errors: error.errors || {},
        status: false,
      });
    }
  }
}
const assetCategoryController = new AssetCategoryController();
export default assetCategoryController;
