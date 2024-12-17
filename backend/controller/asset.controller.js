import assetModel from "../models/asset.model.js";
import assetcategoriesModel from "../models/assetcategories.model.js";
import assetsubcategoriesModel from "../models/assetsubcategories.model.js";
import { assetCreateValidation } from "../validators/asset/asset.create.validation.js";
import { assetUpdateValidate } from "../validators/asset/asset.update.validate.js";

class AssetController {
  async getAsset(req, res) {
    const business_id = req.session.business_id;
    try {
      const asset = await assetModel
        .find({
          business_id: business_id,
        })
        .populate({
          path: "asset_category_id",
          select: "name",
        })
        .populate({
          path: "asset_sub_category_id",
          select: "name",
        });

      const assetCategories = await assetcategoriesModel.find({
        business_id,
        status: true,
      });
      const assetSubCategories = await assetsubcategoriesModel.find({
        business_id,
        status: true,
      });

      res
        .status(200)
        .json({
          asset: asset,
          status: true,
          assetCategories: assetCategories,
          assetSubCategories: assetSubCategories,
        });
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
  async getAssetById(req, res) {
    try {
      const asset = await assetModel.findById(req.params.id);
      if (!asset) {
        return res
          .status(404)
          .json({ error: "Asset not found", status: false });
      }

      res.status(200).json({ asset: asset, status: true });
    } catch (error) {
      res.status(400).json({ error: error.message, status: false });
    }
  }
  async updateAsset(req, res) {
    const {
      _id,
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
    const business_id = req.session.business_id;
    const update_asset = {
      _id,
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
      await assetUpdateValidate(res, update_asset);
      const updateAsset = await assetModel.findByIdAndUpdate(
        update_asset._id,
        {
          name: update_asset.name,
          asset_category_id: update_asset.asset_category_id,
          asset_sub_category_id: update_asset.asset_sub_category_id,
          asset_no: update_asset.asset_no,
          serial_no: update_asset.serial_no,
          status: update_asset.status,
          description: update_asset.description,
          warranty: update_asset.warranty,
          purchased_date: update_asset.purchased_date,
          business_id: update_asset.business_id,
        },
        { new: true }
      );
      if (!updateAsset) {
        return res
          .status(404)
          .json({ error: "Asset not found", status: false });
      }
      res.status(200).json({
        updateAsset: updateAsset,
        status: true,
        message: "Asset updated successfully",
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
const assetsController = new AssetController();
export default assetsController;
