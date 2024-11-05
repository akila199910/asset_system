import businessModel from "../models/business.model.js";
import userModel from "../models/user.model.js";
import userprofileModel from "../models/userprofile.model.js";
import { generatePassword, hashPassword } from "../utility/password.utility.js";
import { validateBusinessCreate } from "../validators/business/business.create.validate.js";
import { validateBusinessUpdate } from "../validators/business/business.update.validate.js";

class BusinessController {
  async getAllBusiness(req, res) {
    try {
      const business = await businessModel.find();
      res.status(200).json({ businesses: business, status: true });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while fetching businesses",
        error: error.message,
      });
    }
  }

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

      const password = generatePassword();
      const hashedPassword = hashPassword(password);
      const user = new userModel({
        firstName: new_registered_business.firstName,
        lastName: new_registered_business.lastName,
        contact: new_registered_business.contact,
        email: new_registered_business.email,
        role: new_registered_business.role || "business_user",
        status: new_registered_business.owner_status,
        password: hashedPassword,
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

      const status = error.status || 500;
      res.status(status).json({
        message: error.message || "Internal Server Error",
        errors: error.errors || {},
        status: false,
      });
    } finally {
      if (session) {
        await session.endSession();
      }
    }
  }
  async getBusinessById(req, res) {
    try {
      const business = await businessModel.findById(req.params.id);
      const owner = await userModel.findById(business.ownerId);

      // if (business) {
      //   const owner = await userModel.findById(business.ownerId);
      // }
      res.status(200).json({ business: business, user: owner, status: true });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateBusiness(req, res) {
    const update_business = req.body;
    let session;

    try {
      const isValid = await validateBusinessUpdate(res, update_business);
      if (!isValid) return;

      session = await userModel.startSession();
      session.startTransaction();

      const user = await userModel.findByIdAndUpdate(
        update_business.ownerId,
        {
          firstName: update_business.firstName,
          lastName: update_business.lastName,
          email: update_business.email,
          contact: update_business.contact,
          status: update_business.owner_status,
        },
        { new: true, session }
      );
      if (!user) throw new Error("User not found");

      const userProfile = await userprofileModel.findOneAndUpdate(
        { userId: update_business.ownerId },
        { profilePic: update_business.profilePic },
        { new: true, session }
      );
      if (!userProfile) throw new Error("User profile not found");

      const business = await businessModel.findByIdAndUpdate(
        update_business.businessId,
        {
          businessName: update_business.businessName,
          businessEmail: update_business.businessEmail,
          address: update_business.address,
          city: update_business.city,
          status: update_business.business_status,
        },
        { new: true, session }
      );
      if (!business) throw new Error("Business not found");

      await session.commitTransaction();
      res.status(200).json({
        message: "Business updated successfully",
        user,
        userProfile,
        business,
      });
    } catch (error) {
      if (session) await session.abortTransaction();
      session.endSession();

      res.status(400).json({ error: error.message });
    } finally {
      if (session) session.endSession();
    }
  }
}

const businessController = new BusinessController();
export default businessController;
