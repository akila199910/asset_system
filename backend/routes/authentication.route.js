import express from "express";
import authenticationController from "../controller/authentication.controller.js";
class AuthenticationRoute {
  constructor() {
    this.router = express.Router();
    this.authenticateRoutes();
  }

  authenticateRoutes() {
    this.router.post("/login", this.login.bind(this));
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await authenticationController.login(email, password);
      res.json(user);
    } catch (error) {
      res.status(401).json({
        message: error.message || "Login failed. Please try again.",
      });
    }
  }
}

const authenticateRoutes = new AuthenticationRoute();

export default authenticateRoutes.router;
