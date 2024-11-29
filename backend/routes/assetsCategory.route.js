import express from "express";
import assetCategoryController from "../controller/assetcategoy.controller.js";

class AssetCategoryRoute {
  constructor() {
    this.router = express.Router();
    this.getAssetCategoryRoutes();
  }

  getAssetCategoryRoutes() {
    this.router.get("/", (req, res) =>
      assetCategoryController.getAssetCategory(req, res)
    );
    this.router.post("/", (req, res) =>
      assetCategoryController.createAssetCategory(req, res)
    );
    this.router.get("/:id", (req, res) =>
      assetCategoryController.getAssetCategoryById(req, res)
    );
    this.router.put("/", (req, res) =>
      assetCategoryController.updateAssetCategory(req, res)
    );
    // this.router.delete("/:id", (req, res) =>
    //   assetCategoryController.deleteBusiness(req, res)
    // );
    // this.router.post("/select_business", (req, res) =>
    //   assetCategoryController.select_business(req, res)
    // );

    // this.router.post("/dashboard", (req, res) =>
    //   businessController.moveToDashboard(req, res)
    // );
  }
}

const assetCategoryRoutes = new AssetCategoryRoute();
export default assetCategoryRoutes.router;
