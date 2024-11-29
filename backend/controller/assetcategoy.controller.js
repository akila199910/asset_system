import assetCategoryModel from "../models/assetcategories.model.js";
import { assetCategoryCreateValidation } from "../validators/assetCatogory/assetCatogory.create.validation.js";
class AssetCategoryController {
  async getAssetCategory(req, res) {
    const business_id = req.body.business_id;
    try {
      const assetCategory = await assetCategoryModel.find({
        business_id: business_id,
        status: true,
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
}
const assetCategoryController = new AssetCategoryController();
export default assetCategoryController;
