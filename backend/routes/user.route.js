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
    this.router.post("/",jsonRequestBodyValidator(userSchema),this.createUser.bind(this)); // Bind to the instance
    this.router.get("/", this.getAllUsers.bind(this));
    this.router.put("/:id",jsonRequestBodyValidator(userSchema), this.updateUser.bind(this));
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

  async getAllUsers(req, res) {
    try {
      const all_users = await userController.getAllUsers();
      res.status(200).json(all_users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateUser(req, res) {
    try {
      const updatedUser = await userController.updateUser(
        req.params.id,
        req.body
      );
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

const userRoute = new UserRoute();
export default userRoute.router; // Export the router directly