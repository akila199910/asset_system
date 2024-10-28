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
    this.router.post(
      "/",
      jsonRequestBodyValidator(userSchema),
      this.createUser.bind(this)
    ); // Bind to the instance
    this.router.get("/", this.getAllUsers.bind(this));
    this.router.get("/:id", this.getUserById.bind(this));
    this.router.put("/:id", this.updateUser.bind(this));
    this.router.delete("/:id", this.deleteUser.bind(this));

    this.router.get("/role", this.getUsersByRole.bind(this));
  }

  async createUser(req, res) {
    const newUser = req.body;
    try {
      const result = await userController.createUser(newUser, res);
      res.status(201).json(result);
    } catch (error) {
      const status = error.status || 500;
      const message = error.message || "Internal Server Error";

      res.status(status).json({
        message,
        errors: error.errors || {},
      });
    }
  }

  async getUserById(req, res) {
    try {
      const user = await userController.getUserById(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
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
      const status = error.status || 500;
      const message = error.message || "Internal Server Error";

      res.status(status).json({
        message,
        errors: error.errors || {},
      });
    }
  }

  async deleteUser(req, res) {
    try {
      const deletedUser = await userController.deleteUser(req.params.id);
      res.status(200).json(deletedUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getUsersByRole(req, res) {
    try {
      const users = await userController.getUsersByRole(req.query.role);
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

const userRoute = new UserRoute();
export default userRoute.router; // Export the router directly
