import express from "express";
import userRoute from "./user.route.js";
import businessRoute from "./business.route.js";
import authenticateRoutes from "./authentication.route.js";	
class MainRouter {
  constructor() {
    this.router = express.Router();
    this.usersMainRoutes();
    this.businessMainRoutes();
    this.authenticateRoutes();
  }
  usersMainRoutes() {
    this.router.use("/users", userRoute);
  }
  businessMainRoutes() {
    this.router.use("/business", businessRoute);
  }
  authenticateRoutes() {
    this.router.use("/auth", authenticateRoutes )
  }
}

const mainRouter = new MainRouter();

export default mainRouter.router;
