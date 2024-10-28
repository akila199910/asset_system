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
    // this.router.get("/", businessController.getAllBusiness.bind(this));
    this.router.post("/",jsonRequestBodyValidator(businessSchema),(req,res)=> businessController.createBusiness(req,res));
  }
}

const businessRoutes = new BusinessRoute();
export default businessRoutes.router;
