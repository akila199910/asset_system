import businessModel from "../models/business.model.js";
import userModel from "../models/user.model.js";
import userprofileModel from "../models/userprofile.model.js";
import { validateBusinessCreate } from "../validators/business/business.create.validate.js";

class BusinessController {
  async createBusiness(new_business) {
    let session = null;

    try {
      
      await validateBusinessCreate(new_business);
      session = await userModel.startSession();
      session.startTransaction();

      // Create the user
      const user = new userModel({
        firstName: new_business.firstName,
        lastName: new_business.lastName,
        contact: new_business.contact,
        email: new_business.email,
        role: new_business.role,
        status: new_business.owner_status,
      });
      await user.save({ session });

      // Create the user profile
      const userProfile = new userprofileModel({
        userId: user._id,
        profilePic: new_business.profilePic || "userprofile.png",
      });
      await userProfile.save({ session });

      // Create the business
      const createdBusiness = new businessModel({
        businessName: new_business.businessName,
        businessEmail: new_business.businessEmail,
        address: new_business.address,
        city: new_business.city,
        status: new_business.status,
        ownerId: user._id,
      });
      await createdBusiness.save({ session });

      // Commit the transaction if everything went well
      await session.commitTransaction();
      return createdBusiness;
    } catch (error) {
      // If session exists, abort the transaction
      if (session) {
        await session.abortTransaction();
      }

      const errorResponse = {
        message: error.message || "An error occurred",
        errors: error.errors || {},
      };

      throw errorResponse;
    } finally {
      if (session) {
        await session.endSession();
      }
    }
  }
}

const businessController = new BusinessController();
export default businessController;
