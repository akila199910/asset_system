import userModel from "../models/user.model.js";
import { hashPassword, verifyPassword } from "../utility/password.utility.js";
import { validateUserCreate } from "../validators/users/users.create.validate.js";

class AuthenticationController {
  async login(req, res) {
    const { email, password } = req.body;
    try {
      const user = await userModel.findOne({ email });

      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }

      const isMatch = await verifyPassword(password, user.password);

      if (!isMatch) {
        const error = new Error("Invalid password");
        error.statusCode = 401;
        throw error;
      }

      res.status(200).json({
        message: "User login successfully.",
        user: user,
      });
    } catch (error) {
      const statusCode = error.statusCode || 500;
      res.status(statusCode).json({
        message: error.message || "Internal server error",
        statusCode: statusCode,
      });
    }
  }

  async signup(req, res) {
    const new_registered_user = req.body;

    try {
      const isValid = await validateUserCreate(res, new_registered_user);
      if (!isValid) return; 

      const new_created_user = new userModel({
        firstName: new_registered_user.firstName,
        lastName: new_registered_user.lastName,
        contact: new_registered_user.contact,
        email: new_registered_user.email,
        role: new_registered_user.role,
        status: new_registered_user.status,
      });
      const hashedPassword = await hashPassword(new_registered_user.password);
      new_created_user.password = hashedPassword;
      await new_created_user.save();
      res.status(201).json({
        message: "User created successfully.",
        user: new_created_user,
      });
    } catch (error) {
      const status = error.statuscode || 500;
      res.status(status).json({
        message: error.message || "Internal Server Error",
      });
    }
  }
}

const authenticationController = new AuthenticationController();
export default authenticationController;
