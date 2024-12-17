import userModel from "../models/user.model.js";
import userProfileModel from "../models/userprofile.model.js";
import generateTokenAndSetCookie from "../utility/genarateAndcookie.js";
import { hashPassword, verifyPassword } from "../utility/password.utility.js";
import { validateUserCreate } from "../validators/users/users.create.validate.js";

class AuthenticationController {
  async login(req, res) {
    const { email, password } = req.body;
    try {
      // Fetch user with profile populated
      const user = await userModel.findOne({ email }).populate("profile");

      if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
      }

      // Verify password
      const isMatch = await verifyPassword(password, user.password);
      if (!isMatch) {
        const error = new Error("Invalid password");
        error.statusCode = 401;
        throw error;
      }

      const profilePic = user.profile ? user.profile.profilePic : null;
      generateTokenAndSetCookie(user, res);

      res.status(200).json({
        message: "User login successfully.",
        user,
        profilePic,
        status: true,
      });
    } catch (error) {
      const statusCode = error.statusCode || 500;
      res.status(statusCode).json({
        message: error.message || "Internal server error",
        statusCode,
        status: false,
      });
    }
  }

  async signup(req, res) {
    const { firstName, lastName, contact, email, role, status, password } = req.body;
    let session = null;

    try {
      // Validate input data
      const isValid = await validateUserCreate(res, req.body);
      if (!isValid) return;

      // Start session for transactional save
      session = await userModel.startSession();
      session.startTransaction();

      // Create user
      const newUser = new userModel({
        firstName,
        lastName,
        contact,
        email,
        role,
        status,
        password: await hashPassword(password),
      });
      await newUser.save({ session });

      // Create user profile
      const userProfile = new userProfileModel({
        userId: newUser._id,
        profilePic: "userprofile.png",
      });
      await userProfile.save({ session });

      await session.commitTransaction();

      res.status(201).json({
        message: "User created successfully.",
        user: newUser,
        userProfile,
      });
    } catch (error) {
      if (session) await session.abortTransaction();

      const statusCode = error.statusCode || 500;
      res.status(statusCode).json({
        message: error.message || "Internal Server Error",
      });
    } finally {
      if (session) await session.endSession();
    }
  }
}

const authenticationController = new AuthenticationController();
export default authenticationController;
