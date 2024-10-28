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
    this.router.get("/", (req, res) => businessController.getAllBusiness(req, res));
    this.router.post("/",jsonRequestBodyValidator(businessSchema),(req,res)=> businessController.createBusiness(req,res));
    this.router.get("/:id", (req, res) => businessController.getBusinessById(req, res));
    this.router.put("/:id", (req, res) => businessController.updateBusiness(req, res))
  }
}

const businessRoutes = new BusinessRoute();
export default businessRoutes.router;
