import express from "express";
import employeeController from "../controller/employee.controller.js";
// import jsonRequestBodyValidator from "../middleware/validators/requestbody.json.validater.js";
// import userSchema from "../schema/user.schema.js";

class EmployeeRoute {
  constructor() {
    this.router = express.Router();
    this.employeeRoutes();
  }

  employeeRoutes() {
    this.router.post("/", (req, res) =>
      employeeController.createUser(req, res)
    );
    this.router.get("/", (req, res) =>
      employeeController.getAllUsers(req, res)
    );
    this.router.get("/:id", (req, res) =>
      employeeController.getUserById(req, res)
    );
    this.router.put("/", (req, res) => employeeController.updateUser(req, res));
    // this.router.delete("/:id", this.deleteUser.bind(this));
    this.router.get("/role", (req, res) =>
      employeeController.getUsersByRole(req, res)
    );
    this.router.get("/profile", (req, res) =>
      employeeController.getUserProfile(req, res)
    );
  }
}

const employeeRoute = new EmployeeRoute();
export default employeeRoute.router; 
