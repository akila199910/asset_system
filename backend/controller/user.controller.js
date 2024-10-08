import userModel from "../models/user.model.js";

class UserController {
  async createUser(newUser) {
    try {
      const user = new userModel(newUser); // Create a new instance of the user model
      return await user.save(); // Save the new user to the database
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
}

const userController = new UserController();

export default userController;
