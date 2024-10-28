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

export const checkUpdateUserEmail = async (update_user_email, user_id) => {
  const isEmailExist = await userModel.findOne({
    email: update_user_email,
    _id: { $ne: user_id },
  });
  console.log("Result of email check:", isEmailExist); // Log the result of the query

  return !!isEmailExist;
};

export const validateUpdateUserEmail = async (user_id, update_user_email) => {
  const isEmailExist = await checkUpdateUserEmail(update_user_email, user_id);
  if (isEmailExist) {
    let errorDetails = {
      message: "Validation Error: User email address conflict detected.",
      errors: {},
    };
    errorDetails.errors.email = "User already exists with this email address.";
    throw errorDetails;
  }
};
