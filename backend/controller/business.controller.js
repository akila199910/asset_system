import businessModel from "../models/business.model.js";
import userModel from "../models/user.model.js";
import userprofileModel from "../models/userprofile.model.js";
import { validateBusinessCreate } from "../validators/business/business.create.validate.js";

class BusinessController {
  async createBusiness(req, res) {
    const new_registered_business = req.body;
    let session = null;

    try {
      const isValid = await validateBusinessCreate(
        res,
        new_registered_business
      );

      if (!isValid) return;

      session = await userModel.startSession();
      session.startTransaction();

      const user = new userModel({
        firstName: new_registered_business.firstName,
        lastName: new_registered_business.lastName,
        contact: new_registered_business.contact,
        email: new_registered_business.email,
        role: new_registered_business.role,
        status: new_registered_business.owner_status,
      });
      await user.save({ session });

      const userProfile = new userprofileModel({
        userId: user._id,
        profilePic: new_registered_business.profilePic || "userprofile.png",
      });
      await userProfile.save({ session });

      const created_business = new businessModel({
        businessName: new_registered_business.businessName,
        businessEmail: new_registered_business.businessEmail,
        address: new_registered_business.address,
        city: new_registered_business.city,
        status: new_registered_business.status,
        ownerId: user._id,
      });
      await created_business.save({ session });

      await session.commitTransaction();
      res.status(201).json({
        message: "Business created successfully.",
        business: created_business,
        owner: user,
        profile: userProfile,
        status: true,
      });
    } catch (error) {
      if (session) {
        await session.abortTransaction();
      }

      const status = error.statuscode || 500;
      res.status(status).json({
        message: error.message || "Internal Server Error",
      });
    } finally {
      if (session) {
        await session.endSession();
      }
    }
  }
}

const businessController = new BusinessController();
export default businessController;
