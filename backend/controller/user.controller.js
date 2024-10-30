import userModel from "../models/user.model.js";
import userProfileModel from "../models/userprofile.model.js";
import { validateUserCreate } from "../validators/users/users.create.validate.js";
import mongoose from "mongoose";
import { validateUserUpdate } from "../validators/users/users.update.validation.js";
import { generatePassword, hashPassword } from "../utility/password.utility.js";

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

  async getUserById(id) {
    try {
      const user = await userModel.findById(id);
      if (!user) {
        throw new Error("User not found");
      }
      // const password = user.;

      const userProfile = await userProfileModel.findOne({ userId: user._id });

      return { user, userProfile };
    } catch (error) {
      throw new Error("Unable to fetch user.");
    }
  }

  async updateUser(id, updatedUser) {
    try {
      await validateUserUpdate(id, updatedUser);

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
          return { user };
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
