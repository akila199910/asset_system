import userModel from "../models/user.model.js";

export const checkCrateUserEmail = async (new_email) => {
  const isEmailExist = await userModel.findOne({ email: new_email });
  return !!isEmailExist;
};

export const validateCreateUserEmail = async (new_email) => {
  const isEmailExist = await checkCrateUserEmail(new_email);
  if (isEmailExist) {
    let errorDetails = {
      message: "Validation Error: User email address conflict detected.",
      errors: {},
    };
    errorDetails.errors.email =
      "User already exists with this email address.";
    throw errorDetails;
  }
  
};
