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
      const all_user_profiles = await userProfileModel.find().populate("userId");

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
      return user;
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error("Unable to update user.");
    }
  }
}

const userController = new UserController();

export default userController;
