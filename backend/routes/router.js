import express from "express";
import userRoute from "./user.route.js";

class MainRouter {
  constructor() {
    this.router = express.Router();
    this.usersMainRoutes();
  }
  usersMainRoutes() {
    this.router.use("/users", userRoute); // Define the user-related routes
    this.router.use("/users/update", userRoute);
  }
}

const mainRouter = new MainRouter();

export default mainRouter.router;
