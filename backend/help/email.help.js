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
    errorDetails.errors.email = "User already exists with this email address.";
    throw errorDetails;
  }
};

export const checkUpdateUserEmail = async (update_user, user_id) => {
  const isEmailExist = await userModel.findOne({
    email: update_user,
    _id: { $ne: user_id },
  });
  return !!isEmailExist;
};

export const validateUpdateUserEmail = async (update_user, user_id) => {
  const isEmailExist = await checkUpdateUserEmail(update_user, user_id);
  if (isEmailExist) {
    let errorDetails = {
      message: "Validation Error: User email address conflict detected.",
      errors: {},
    };
    errorDetails.errors.email = "User already exists with this email address.";
    throw errorDetails;
  }
};