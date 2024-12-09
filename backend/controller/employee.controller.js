import userModel from "../models/user.model.js";
import userProfileModel from "../models/userprofile.model.js";
import { validateUserCreate } from "../validators/users/users.create.validate.js";
import { validateUserUpdate } from "../validators/users/users.update.validation.js";
import { generatePassword, hashPassword } from "../utility/password.utility.js";

class EmployeeController {
  async createUser(req, res) {
    const new_employee = req.body;
    const business_id = req.session.business_id;
    let session = null;

    try {
      const isValid = await validateUserCreate(res, new_employee);

      if (!isValid) return;

      session = await userModel.startSession();
      session.startTransaction();
      const password = generatePassword();
      const hashedPassword = hashPassword(password);

      const employee = new userModel({
        firstName: new_employee.firstName,
        lastName: new_employee.lastName,
        contact: new_employee.contact,
        email: new_employee.email,
        role: new_employee.role || "guest",
        status: new_employee.status,
        password: hashedPassword,
        business_id: business_id,
      });
      await employee.save({ session });

      const userProfile = new userProfileModel({
        userId: employee._id,
        profilePic: new_employee.profilePic || "userprofile.png",
      });
      await userProfile.save({ session });

      await session.commitTransaction();
      res.status(201).json({
        message: "Employee created successfully.",
        employee: employee,
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

  async getUserById(req, res) {
    try {
      const employee = await userModel
        .findById(req.params.id)
        .populate("profile");
      if (!employee) {
        throw new Error("Employee not found");
      }
      res.status(200).json({ employee: employee, status: true });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateUser(req, res) {
    const update_employee = req.body;
    let session;
    try {
      const isValid = await validateUserUpdate(res, update_employee);
      if (!isValid) return;

      session = await userModel.startSession();
      session.startTransaction();

      const employee = await userModel.findByIdAndUpdate(
        update_employee._id,
        {
          firstName: update_employee.firstName,
          lastName: update_employee.lastName,
          email: update_employee.email,
          contact: update_employee.contact,
          status: update_employee.status,
        },
        { new: true, session }
      );
      if (!employee) throw new Error("Employee not found");

      const userProfile = await userProfileModel.findOneAndUpdate(
        { userId: employee._id },
        { profilePic: update_employee.profilePic },
        { new: true, session }
      );
      if (!userProfile) throw new Error("Employee profile not found");

      await session.commitTransaction();
      res.status(200).json({
        message: "Employee updated successfully",
        status: true,
      });
    } catch (error) {
      if (session) await session.abortTransaction();

      res.status(400).json({ error: error.message });
    } finally {
      if (session && session.inTransaction()) await session.endSession();
    }
  }

  async deleteUser(id) {
    try {
      // First, delete the user by id
      const user = await userModel.findByIdAndDelete(id);

      if (!user) {
        throw new Error("User not found.");
      }

      // Then, delete the associated user profile using the user ID
      const userProfile = await userProfileModel.findOneAndDelete({
        userId: id,
      });

      return { user, userProfile }; // Return both user and profile for reference
    } catch (error) {
      console.error("Error deleting user and profile:", error);
      throw new Error("Unable to delete user and profile.");
    }
  }

  async getAllUsers(req, res) {
    const business_id = req.session.business_id;
    console.log(business_id);
    try {
      const employees = await userModel
        .find({ business_id: business_id })
        .populate("profile");

      res.status(200).json({ employees: employees, status: true });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while fetching employees",
        error: error.message,
      });
    }
  }
  async getUsersByRole(role) {
    try {
      const users = await userModel.find({ role });

      // If there are users found, fetch the corresponding user profiles
      const usersWithProfiles = await Promise.all(
        users.map(async (user) => {
          const userProfile = await userprofileModel.findOne({
            userId: user._id,
          });
          return {
            ...user.toObject(),
            profile: userProfile || {}, // Attach the profile or an empty object if no profile found
          };
        })
      );

      return usersWithProfiles; // Return the array of users with profiles
    } catch (error) {
      console.error("Error fetching users by role:", error);
      throw new Error("Unable to fetch users by role.");
    }
  }

  async getUserProfile(req, res) {
    try {
      const user = await userModel
        .findById(req.user.userId)
        .populate("profile");

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json({ user: user, status: true });
    } catch (error) {
      res.status(500).json({ error: "Unable to fetch user." });
    }
  }
}

const employeeController = new EmployeeController();

export default employeeController;
