import businessModel from "../models/business.model.js";

class DashboardController {
  async moveToDashboard(req, res) {
    const { businessId } = req.body;

    try {
      const business = await businessModel.findById(businessId);

      if (!business) {
        return res
          .status(404)
          .json({ status: false, message: "Business not found" });
      }
      req.session.businessId = businessId;
    //   console.log(req.session);

      res.json({
        status: true,
        message: "Business added to session",
        business,
      });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  }
}
const dashboardController = new DashboardController();
export default dashboardController;
