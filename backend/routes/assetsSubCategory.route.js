import express from "express";
import assetSubCategoryController from "../controller/assetsubcategoy.controller.js";

class AssetSubCategoryRoute {
  constructor() {
    this.router = express.Router();
    this.getAssetSubCategoryRoutes();
  }

  getAssetSubCategoryRoutes() {
    this.router.get("/", (req, res) =>
      assetSubCategoryController.getAssetSubCategory(req, res)
    );
    this.router.post("/", (req, res) =>
      assetSubCategoryController.createAssetSubCategory(req, res)
    );
    this.router.get("/:id", (req, res) =>
      assetSubCategoryController.getAssetSubCategoryById(req, res)
    );
    this.router.put("/", (req, res) =>
      assetSubCategoryController.updateAssetSubCategory(req, res)
    );
    // this.router.delete("/:id", (req, res) =>
    //   assetSubCategoryController.deleteAssetCategory(req, res)
    // );
    // this.router.post("/select_business", (req, res) =>
    //   assetSubCategoryController.select_business(req, res)
    // );

    // this.router.post("/dashboard", (req, res) =>
    //   businessController.moveToDashboard(req, res)
    // );
  }
}

const assetSubCategoryRoutes = new AssetSubCategoryRoute();
export default assetSubCategoryRoutes.router;
