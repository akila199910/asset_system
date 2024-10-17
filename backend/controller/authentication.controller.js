import userModel from "../models/user.model.js";
import { verifyPassword } from "../utility/password.utility.js";

class AuthenticationController {
  async login(email, password) {
    // const validPassword = await verifyPassword(password, hashedPassword);

    const user = await userModel.findOne({ email: email }).exec();
    if (!user) {
      throw new Error("User not found.");
    }
    // const validPassword = await bcrypt.compare(password, user.password);
    const validPassword = await verifyPassword(password);

    if (!validPassword) {
      throw new Error("Invalid password.");
    }
    return user;
  }
}

const authenticationController = new AuthenticationController();
export default authenticationController;
