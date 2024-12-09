import express from "express";
import userRoute from "./user.route.js";
import businessRoute from "./business.route.js";
import authenticateRoutes from "./authentication.route.js";
import dashboardRoute from "./dashboard.route.js";
import assetCategoryRoutes from "./assetsCategory.route.js";
import { authenticateToken } from "../middleware/authenticateToken.js";


class MainRouter {
  constructor() {
    this.router = express.Router();
    this.usersMainRoutes();
    this.businessMainRoutes();
    this.authenticateRoutes();
    this.dashboardMainRoutes();
    this.assetsCategoryMainRoutes();
  }

  dashboardMainRoutes() {
    this.router.use("/dashboard", dashboardRoute);
  }
  // Set up user routes with authentication
  usersMainRoutes() {
    this.router.use("/users", userRoute);
  }

  // Set up business routes (authentication can be added if needed)
  businessMainRoutes() {
    this.router.use("/business", businessRoute);
  }

  // Set up authentication routes
  authenticateRoutes() {
    this.router.use("/auth", authenticateRoutes);
  }
  assetsCategoryMainRoutes() {
    this.router.use("/assets_category", assetCategoryRoutes);
  }
}

// Export an instance of MainRouter
const mainRouter = new MainRouter();
export default mainRouter.router;
