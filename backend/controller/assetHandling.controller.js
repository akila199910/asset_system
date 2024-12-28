import assetModel from "../models/asset.model.js";
import assetHandlingModel from "../models/assetHandling.model.js";
import userModel from "../models/user.model.js";
import { assetUpdateValidate } from "../validators/asset/asset.update.validate.js";
import { assetHandlingCreateValidation } from "../validators/assetHandling/assetHandling.create.validation.js";

class AssetHandlingController {
  async getHandlingAsset(req, res) {
    const business_id = req.session.business_id;
    try {
      const assetHandling = await assetHandlingModel
        .find({
          business_id: business_id,
        })
        .populate({
          path: "asset_id",
          select: "name",
        })
        .populate({
          path: "employee_id",
          select: "firstName lastName",
        })
        .populate({
          path: "created_by",
          select: "firstName lastName",
        })
        .populate({
          path: "given_by",
          select: "firstName lastName",
        })
        .populate({
          path: "handover_to",
          select: "firstName lastName",
        });

      const users = await userModel.find({ business_id: business_id });
      const activeAssets = await assetModel.find({
        business_id: business_id,
        status: true,
      });

      res.status(200).json({
        assetHandling: assetHandling,
        activeAssets: activeAssets,
        users: users,
        status: true,
      });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while fetching assets",
        error: error.message,
      });
    }
  }

  async createAssetHandling(req, res) {
    const business_id = req.session.business_id;
    const { asset_id, employee_id, given_by, created_by, given_date, status } =
      req.body;

    const new_asset_handling = {
      asset_id,
      employee_id,
      given_by,
      created_by,
      given_date,
      status,
      business_id,
    };

    try {
      const isValid = await assetHandlingCreateValidation(
        res,
        new_asset_handling
      );

      if (!isValid) return;
      const assetHandling = await assetHandlingModel.create(new_asset_handling);
      res.status(201).json({ assetHandling, status: true });
    } catch (error) {
      const status = error.status || 500;
      res.status(status).json({
        message: error.message || "Internal Server Error",
        errors: error.errors || {},
        status: false,
      });
    }
  }
  async getAssetHandlingById(req, res) {
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
  async updateAssetHandling(req, res) {
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
const assetsHandlingController = new AssetHandlingController();
export default assetsHandlingController;
