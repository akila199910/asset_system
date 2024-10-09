import express from "express";
import jsonRequestBodyValidator from "../middleware/validators/requestbody.json.validater.js";
import businessSchema from "../schema/business.schema.js";
import businessController from "../controller/business.controller.js";


class BusinessRoute {
    constructor() {
        this.router = express.Router(); // Use express.Router(), not new Route()
        this.businessRoutes();
    }   

    businessRoutes() {
        this.router.post("/", jsonRequestBodyValidator(businessSchema), this.createBusiness.bind(this));
        // this.router.get("/", this.getAllBusinesses.bind(this));
        // this.router.get("/:id", this.getBusinessById.bind(this));
        // this.router.post("/", jsonRequestBodyValidator(), this.createBusiness.bind(this));
        // this.router.put("/:id", jsonRequestBodyValidator(), this.updateBusiness.bind(this));
        // this.router.delete("/:id", this.deleteBusiness.bind(this));
    }

    async createBusiness(req, res) {
        const new_business = req.body;
        try {
            const result = await businessController.createBusiness(new_business);
            res.status(201).json(result);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
}

const businessRoutes = new BusinessRoute();
export default businessRoutes.router; // Export the router directly