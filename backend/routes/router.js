import express from "express";
import userRoute from "./user.route.js";
import businessRoute from "./business.route.js";

class MainRouter {
  constructor() {
    this.router = express.Router();
    this.usersMainRoutes();
    this.businessMainRoutes();
  }
  usersMainRoutes() {
    this.router.use("/users", userRoute); // Define the user-related routes
  }
  businessMainRoutes() {
    this.router.use("/business", businessRoute);
  }
}

const mainRouter = new MainRouter();

export default mainRouter.router;
