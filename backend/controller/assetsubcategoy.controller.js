import assetSubCategoryModel from "../models/assetsubcategories.model.js";
import { assetSubCategoryUpdateValidate } from "../validators/assetSubCatogory/assetSubCategory.update.validate.js";

class AssetSubCategoryController {
  async getAssetSubCategory(req, res) {
    const business_id = req.session.business_id;
    try {
      const assetSubCategory = await assetSubCategoryModel.find({
        business_id: business_id,
      });
      res
        .status(200)
        .json({ assetSubCategory: assetSubCategory, status: true });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while fetching asset sub category",
        error: error.message,
      });
    }
  }

  async createAssetSubCategory(req, res) {
    const business_id = req.session.business_id;
    const { name, status } = req.body;

    const new_assetSubCategory = { name, status, business_id };

    try {
      const isValid = await assetSubCategoryCreateValidation(
        res,
        new_assetCategory
      );

      if (!isValid) return;
      const assetSubCategory = await assetSubCategoryModel.create(
        new_assetSubCategory
      );
      res.status(201).json({ assetSubCategory, status: true });
    } catch (error) {
      const status = error.status || 500;
      res.status(status).json({
        message: error.message || "Internal Server Error",
        errors: error.errors || {},
        status: false,
      });
    }
  }
  async getAssetSubCategoryById(req, res) {
    try {
      const assetSubCategory = await assetSubCategoryModel.findById(
        req.params.id
      );
      if (!assetSubCategory) {
        return res
          .status(404)
          .json({ error: "Asset Sub Category not found", status: false });
      }

      res
        .status(200)
        .json({ assetSubCategory: assetSubCategory, status: true });
    } catch (error) {
      res.status(400).json({ error: error.message, status: false });
    }
  }
  async updateAssetSubCategory(req, res) {
    const update_assetSubCategory = req.body;
    const business_id = req.session.business_id;
    update_assetSubCategory.business_id = business_id;

    try {
      await assetSubCategoryUpdateValidate(update_assetSubCategory);
      const updated_assetSubCategory =
        await assetSubCategoryModel.findByIdAndUpdate(
          update_assetSubCategory._id,
          {
            name: update_assetSubCategory.name,
            status: update_assetSubCategory.status,
            business_id: update_assetSubCategory.business_id,
          },
          { new: true }
        );
      if (!update_assetSubCategory) {
        return res
          .status(404)
          .json({ error: "Asset Sub Category not found", status: false });
      }
      res.status(200).json({
        updated_assetSubCategory: updated_assetSubCategory,
        status: true,
        message: "Asset sub category updated successfully",
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
const assetSubCategoryController = new AssetSubCategoryController();
export default assetSubCategoryController;
