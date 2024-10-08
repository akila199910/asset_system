import express from "express";
import userController from "../controller/user.controller.js";
import jsonRequestBodyValidator from "../middleware/validators/requestbody.json.validater.js";
import userSchema from "../schema/user.schema.js";

class UserRoute {
  constructor() {
    this.router = express.Router(); // Use express.Router(), not new Route()
    this.userRoutes();
  }

  userRoutes() {
    this.router.post("/", jsonRequestBodyValidator(userSchema), this.createUser.bind(this)); // Bind to the instance
  }

  async createUser(req, res) {
    const newUser = req.body;
    try {
      const result = await userController.createUser(newUser);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

const userRoute = new UserRoute();
export default userRoute.router; // Export the router directly
