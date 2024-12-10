import departmentModel from "../models/department.model.js";
import { departmentCreateValidation } from "../validators/department/departmentcreate.validation.js";

class DepartmentController {
  async getAllDepartment(req, res) {
    const business_id = req.session.business_id;
    try {
      const department = await departmentModel.find({
        business_id: business_id,
      });
      res.status(200).json({ department: department, status: true });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while fetching department",
        error: error.message,
      });
    }
  }

  async createDepartment(req, res) {
    const { name, status } = req.body;
    const business_id = req.session.business_id;
    const new_registered_department = { name, status, business_id };

    try {
      const isValid = await departmentCreateValidation(
        res,
        new_registered_department
      );

      if (!isValid) return;

      const department = new departmentModel({
        name: new_registered_department.name,
        status: new_registered_department.status,
        business_id: business_id,
      });
      department.save();

      res.status(201).json({
        message: "Department created successfully.",
        department: department,
        status: true,
      });
    } catch (error) {
      const status = error.status || 500;
      res.status(status).json({
        message: error.message || "Internal Server Error",
        errors: error.errors || {},
        status: false,
      });
    }
  }
  // async getBusinessById(req, res) {
  //   try {
  //     const business = await businessModel.findById(req.params.id);
  //     const owner = await userModel.findById(business.ownerId);
  //     const businessWithOwner = {
  //       ...business.toObject(),
  //       owner: owner.toObject(),
  //     };

  //     res.status(200).json({ data: businessWithOwner, status: true });
  //   } catch (error) {
  //     res.status(400).json({ error: error.message, status: false });
  //   }
  // }

  // async updateBusiness(req, res) {
  //   const update_business = req.body;
  //   let session;

  //   try {
  //     const isValid = await validateBusinessUpdate(res, update_business);
  //     if (!isValid) return;
  //     session = await userModel.startSession();
  //     session.startTransaction();

  //     const user = await userModel.findByIdAndUpdate(
  //       update_business.ownerId,
  //       {
  //         firstName: update_business.firstName,
  //         lastName: update_business.lastName,
  //         email: update_business.email,
  //         contact: update_business.contact,
  //         status: update_business.owner_status,
  //       },
  //       { new: true, session }
  //     );
  //     if (!user)
  //       throw new Error(`User with ID ${update_business.ownerId} not found`);

  //     // Update the user profile
  //     const userProfile = await userprofileModel.findOneAndUpdate(
  //       { userId: update_business.ownerId },
  //       { profilePic: update_business.profilePic },
  //       { new: true, session }
  //     );
  //     if (!userProfile)
  //       throw new Error(
  //         `User profile for userId ${update_business.ownerId} not found`
  //       );

  //     // Update the business
  //     const business = await businessModel.findByIdAndUpdate(
  //       update_business._id,
  //       {
  //         businessName: update_business.businessName,
  //         businessEmail: update_business.businessEmail,
  //         address: update_business.address,
  //         city: update_business.city,
  //         status: update_business.business_status,
  //       },
  //       { new: true, session }
  //     );
  //     if (!business)
  //       throw new Error(`Business with ID ${update_business._id} not found`);

  //     // Commit the transaction
  //     await session.commitTransaction();

  //     // Send success response
  //     res.status(200).json({
  //       message: "Business updated successfully",
  //       user,
  //       userProfile,
  //       business,
  //       status: true,
  //     });
  //   } catch (error) {
  //     // Abort the transaction on error
  //     if (session) await session.abortTransaction();

  //     // Log the error
  //     console.error("Error updating business:", error);

  //     // Send error response
  //     res.status(400).json({ error: error.message });
  //   } finally {
  //     // Ensure the session is always ended
  //     if (session) session.endSession();
  //   }
  // }
  // async select_business(req, res) {
  //   const { business_id } = req.body;
  //   req.session.business_id = business_id;
  //   await req.session.save();
  //   console.log(req.session);
  //   res.status(200).json({ message: "Business selected", business_id });
  // }
  // async deleteBusiness(req, res) {
  //   try {
  //     const business = await businessModel.findByIdAndDelete(req.params.id);
  //     const owner = await userModel.findByIdAndDelete(business.ownerId);
  //     res.status(200).json({ business: business, user: owner, status: true });
  //   } catch (error) {
  //     res.status(400).json({ error: error.message });
  //   }
  // }
}

const departmentController = new DepartmentController();
export default departmentController;
