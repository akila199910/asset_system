import express from "express";
import jsonRequestBodyValidator from "../middleware/validators/requestbody.json.validater.js";
import businessSchema from "../schema/business.schema.js";
import departmentController from "../controller/department.controller.js";

class DepartmentRoute {
  constructor() {
    this.router = express.Router();
    this.departmentRoutes();
  }

  departmentRoutes() {
    this.router.get("/", (req, res) =>
      departmentController.getAllDepartment(req, res)
    );
    this.router.post("/", (req, res) =>
      departmentController.createDepartment(req, res)
    );
    this.router.get("/:id", (req, res) =>
      departmentController.getDepartmentById(req, res)
    );
    this.router.put("/", (req, res) =>
      departmentController.updateDepartment(req, res)
    );
    // this.router.delete("/:id", (req, res) =>
    //   departmentController.deleteBusiness(req, res)
    // );
    this.router.post("/select_business", (req, res) =>
      departmentController.select_business(req, res)
    );

    this.router.post("/dashboard", (req, res) =>
      departmentController.moveToDashboard(req, res)
    );
  }
}

const departmentRoutes = new DepartmentRoute();
export default departmentRoutes.router;
