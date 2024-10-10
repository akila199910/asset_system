import express from "express";
import jsonRequestBodyValidator from "../middleware/validators/requestbody.json.validater.js";
import businessSchema from "../schema/business.schema.js";
import businessController from "../controller/business.controller.js";

class BusinessRoute {
  constructor() {
    this.router = express.Router();
    this.businessRoutes();
  }

  businessRoutes() {
    this.router.post(
      "/",
      jsonRequestBodyValidator(businessSchema),
      this.createBusiness.bind(this)
    );
  }

  async createBusiness(req, res) {
    const new_business = req.body;
    try {
      const result = await businessController.createBusiness(new_business);
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
}

const businessRoutes = new BusinessRoute();
export default businessRoutes.router;
