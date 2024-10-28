import express from "express";
import authenticationController from "../controller/authentication.controller.js";
// import { sign } from "jsonwebtoken";
class AuthenticationRoute {
  constructor() {
    this.router = express.Router();
    this.authenticateRoutes();
  }

  authenticateRoutes() {
    this.router.post("/login", (req,res) => authenticationController.login(req,res));
    this.router.post("/signup",(req, res)=> authenticationController.signup(req, res));
  }

  
}

const authenticateRoutes = new AuthenticationRoute();

export default authenticateRoutes.router;
