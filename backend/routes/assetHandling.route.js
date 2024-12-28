import express from "express";
import assetsHandlingController from "../controller/assetHandling.controller.js";

class AssetHandlingRoute {
  constructor() {
    this.router = express.Router();
    this.assetHandlingRoutes();
  }

  assetHandlingRoutes() {
    this.router.get("/", (req, res) =>
      assetsHandlingController.getHandlingAsset(req, res)
    );
    this.router.post("/", (req, res) =>
      assetsHandlingController.createAssetHandling(req, res)
    );
    this.router.get("/:id", (req, res) =>
      assetsHandlingController.getAssetHandlingById(req, res)
    );
    this.router.put("/", (req, res) =>
      assetsHandlingController.updateAssetHandling(req, res)
    );
    // this.router.delete("/:id", (req, res) =>
    //   assetsHandlingController.deleteAsset(req, res)
    // );
    // this.router.post("/select_business", (req, res) =>
    //   assetsHandlingController.select_business(req, res)
    // );

    // this.router.post("/dashboard", (req, res) =>
    //   assetsHandlingController.moveToDashboard(req, res)
    // );
  }
}

const assetHandlingRoutes = new AssetHandlingRoute();
export default assetHandlingRoutes.router;
