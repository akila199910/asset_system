import express from "express";
import userRoute from "./user.route.js";
import businessRoute from "./business.route.js";
import authenticateRoutes from "./authentication.route.js";
import dashboardRoute from "./dashboard.route.js";
import assetCategoryRoutes from "./assetsCategory.route.js";
import employeeRoutes from "./employee.route.js";
import departmentRoutes from "./department.route.js";
import { authenticateToken } from "../middleware/authenticateToken.js";

class MainRouter {
  constructor() {
    this.router = express.Router();
    this.usersMainRoutes();
    this.businessMainRoutes();
    this.authenticateRoutes();
    this.dashboardMainRoutes();
    this.employeeMainRoutes();
    this.departmentMainRoutes();
    this.assetsCategoryMainRoutes();
  }

  dashboardMainRoutes() {
    this.router.use("/dashboard", dashboardRoute);
  }
  usersMainRoutes() {
    this.router.use("/users", userRoute);
  }

  businessMainRoutes() {
    this.router.use("/business", businessRoute);
  }

  authenticateRoutes() {
    this.router.use("/auth", authenticateRoutes);
  }
  employeeMainRoutes() {
    this.router.use("/employee", employeeRoutes);
  }
  departmentMainRoutes() {
    this.router.use("/department", departmentRoutes);
  }
  assetsCategoryMainRoutes() {
    this.router.use("/assets_category", assetCategoryRoutes);
  }
}

const mainRouter = new MainRouter();
export default mainRouter.router;
