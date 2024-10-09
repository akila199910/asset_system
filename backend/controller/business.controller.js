import businessModel from "../models/business.model.js";
import userModel from "../models/user.model.js";
import userprofileModel from "../models/userprofile.model.js";

class BusinessController {
  async createBusiness(new_business) {
    const session = await userModel.startSession();
    session.startTransaction();

    try {
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
      session.endSession();

      return createdBusiness;
    } catch (error) {
      // Rollback the transaction in case of error
      await session.abortTransaction();
      session.endSession();

      console.error("Error creating business:", error);
      throw new Error("Unable to create business: " + error.message);
    }
  }
}

const businessController = new BusinessController();
export default businessController;
