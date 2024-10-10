import userModel from "../models/user.model.js";
import userProfileModel from "../models/userprofile.model.js";

class UserController {
  async createUser(newUser) {
    try {
      const user = new userModel(newUser); // Create a new instance of the user model
      await user.save();

      const userProfile = new userProfileModel({
        userId: user._id,
        profilePic: newUser.profilePic ? newUser.profilePic : "userprofile.png",
      });
      await userProfile.save();

      return { user, userProfile };
    } catch (error) {
      // Check if it's a Mongoose validation error
      if (error.errors) {
        const messages = Object.values(error.errors).map((val) => val.message); // Extract error messages
        throw new Error(messages.join(", "));
      } else {
        // Handle other types of errors (e.g., unique constraint, connection issues)
        throw new Error(
          error.message || "An error occurred while creating the user"
        );
      }
    }
  }

  async getAllUsers() {
    try {
      // Fetch all user profiles and populate user details
      const all_user_profiles = await userProfileModel
        .find()
        .populate("userId");

      return all_user_profiles; // This will return profiles with user details populated
    } catch (error) {
      console.error("Error fetching users and profiles:", error);
      throw new Error("Unable to fetch users and profiles.");
    }
  }

  async updateUser(id, updatedUser) {
    try {
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
      console.error("Error updating user:", error);
      throw new Error("Unable to update user.");
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
