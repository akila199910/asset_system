import userModel from "../models/user.model.js";
import { validateUserCreate } from "../validators/users/users.create.validate.js";
import mongoose from "mongoose";
import { validateUserUpdate } from "../validators/users/users.update.validation.js";
import { generatePassword, hashPassword } from "../utility/password.utility.js";
import userprofileModel from "../models/userprofile.model.js";

class UserController {
  async createUser(newUser, res) {
    const session = await mongoose.startSession();
    session.startTransaction();
    let transactionCommitted = false;

    try {
      await validateUserCreate(newUser);

      const password = generatePassword();
      const hashedPassword = hashPassword(password);

      const user = new userModel({
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        contact: newUser.contact,
        email: newUser.email,
        password: hashedPassword,
        role: newUser.role,
        status: newUser.status,
      });
      await user.save({ session });

      const userProfile = new userProfileModel({
        userId: user._id,
        profilePic: newUser.profilePic || "userprofile.png",
      });
      await userProfile.save({ session });

      await session.commitTransaction();
      transactionCommitted = true;

      return res
        .status(201)
        .json({ user, userProfile, message: "User created successfully" });
    } catch (error) {
      if (!transactionCommitted) {
        await session.abortTransaction();
      }

      const errorResponse = {
        message: error.message || "An error occurred",
        errors: error.errors || {},
      };
      const status = error.status || 500;

      return res.status(status).json(errorResponse);
    } finally {
      session.endSession();
    }
  }

  async getUserById(req, res) {
    try {
      const user = await userModel.findById(req.params.id).populate("profile");
      if (!user) {
        throw new Error("User not found");
      }
      res.status(200).json({ user: user, status: true });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateUser(req, res) {
    const update_user = req.body;
    let session;
    try {
      const isValid = await validateUserUpdate(res, update_user);
      if (!isValid) return;

      session = await userModel.startSession();
      session.startTransaction();

      const user = await userModel.findByIdAndUpdate(
        update_user._id,
        {
          firstName: update_user.firstName,
          lastName: update_user.lastName,
          email: update_user.email,
          contact: update_user.contact,
          status: update_user.status,
        },
        { new: true, session }
      );
      if (!user) throw new Error("User not found");

      const userProfile = await userprofileModel.findOneAndUpdate(
        { userId: update_user._id },
        { profilePic: update_user.profilePic },
        { new: true, session }
      );
      if (!userProfile) throw new Error("User profile not found");

      await session.commitTransaction();
      res.status(200).json({
        message: "User updated successfully",
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
    try {
      const users = await userModel.find().populate("profile");
      res.status(200).json({ users: users, status: true });
    } catch (error) {
      res.status(500).json({
        message: "An error occurred while fetching businesses",
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
          const userProfile = await userProfileModel.findOne({
            userId: user._id,
          });
          return {
            ...user.toObject(), // Convert the user to an object
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

const userController = new UserController();

export default userController;
