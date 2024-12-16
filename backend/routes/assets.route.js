import express from "express";
import assetsController from "../controller/asset.controller.js";

class AssetRoute {
  constructor() {
    this.router = express.Router();
    this.assetRoutes();
  }

  assetRoutes() {
    this.router.get("/", (req, res) =>
      assetsController.getAsset(req, res)
    );
    this.router.post("/", (req, res) =>
      assetsController.createAsset(req, res)
    );
    this.router.get("/:id", (req, res) =>
      assetsController.getAssetById(req, res)
    );
    this.router.put("/", (req, res) =>
      assetsController.updateAsset(req, res)
    );
    // this.router.delete("/:id", (req, res) =>
    //   assetsController.deleteAsset(req, res)
    // );
    // this.router.post("/select_business", (req, res) =>
    //   assetsController.select_business(req, res)
    // );

    // this.router.post("/dashboard", (req, res) =>
    //   businessController.moveToDashboard(req, res)
    // );
  }
}

const assetRoutes = new AssetRoute();
export default assetRoutes.router;
