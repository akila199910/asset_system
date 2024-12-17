import express from "express";
import dashboardController from "../controller/dashboard.controller.js";


class DashboardRoute {
  constructor() {
    this.router = express.Router();
    this.dashboardRoutes();
  }

  dashboardRoutes() {
    this.router.post("/", (req, res) =>
      dashboardController.moveToDashboard(req, res)
    );
  }
}

const dashboardRoutes = new DashboardRoute();
export default dashboardRoutes.router;
