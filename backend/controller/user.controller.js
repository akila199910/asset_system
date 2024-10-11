import userModel from "../models/user.model.js";
import userProfileModel from "../models/userprofile.model.js";
import { validateUserCreate } from "../validators/users/users.create.validate.js";
import mongoose from "mongoose";
import { validateUserUpdate } from "../validators/users/users.update.validation.js";

class UserController {

  async createUser(newUser) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      await validateUserCreate(newUser);

      const user = new userModel(newUser);
      await user.save({ session });

      const userProfile = new userProfileModel({
        userId: user._id,
        profilePic: newUser.profilePic || "userprofile.png",
      });
      await userProfile.save({ session });

      await session.commitTransaction();

      return { user, userProfile };
    } catch (error) {
      await session.abortTransaction();

      const errorResponse = {
        message: error.message || "An error occurred",
        errors: error.errors || {},
      };

      throw errorResponse;
    } finally {
      session.endSession();
    }
  }

  async getUserById(id) {
    try {
      const user = await userModel.findById(id);
      if (!user) {
        throw new Error("User not found");
      }

      const userProfile = await userProfileModel.findOne({ userId: user._id });

      return { user, userProfile };
    } catch (error) {
      console.error("Error fetching user:", error);
      throw new Error("Unable to fetch user.");
    }
  }

  async updateUser(id, updatedUser) {
    try {
      await validateUserUpdate(updatedUser);

      const user = await userModel.findByIdAndUpdate(id, updatedUser, {
        new: true,
      });
      if (user) {
        if (updatedUser.profilePic) {
          const userProfile = await userProfileModel.findOneAndUpdate(
            { userId: user._id },
            { profilePic: updatedUser.profilePic },
            { new: true }
          );

          return { user, userProfile };
        } else {
          return user;
        }
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      const errorResponse = {
        message: error.message || "An error occurred",
        errors: error.errors || {},
      };

      throw errorResponse;
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

  async getAllUsers() {
    try {
      const all_users = await userModel.find().populate("profile");

      return all_users;
    } catch (error) {
      throw new Error("Unable to fetch users and profiles.");
    }
  }
  async getUsersByRole(role) {
    try {
      // Find users with the specified role
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
}

const userController = new UserController();

export default userController;
